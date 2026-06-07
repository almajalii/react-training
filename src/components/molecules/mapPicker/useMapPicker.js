import { useEffect, useRef, useState } from 'react';

// Default map center if the address has no saved coordinates yet
const DEFAULT_CENTER = { lat: 31.9539, lng: 35.9106 }; // Amman, JO

export function useMapPicker({ lat, lng, onChange }) {
  // containerRef attaches to the <div> in the JSX — Leaflet needs a real DOM element
  // to render the map into. We use a ref instead of an id so it works with React's
  // virtual DOM and doesn't break if the component mounts more than once.
  const containerRef = useRef(null);

  // mapRef holds the Leaflet map instance after it's created.
  // We store it in a ref (not state) because:
  //   1. We need to access it across multiple effects
  //   2. Updating it should NOT trigger a re-render
  const mapRef = useRef(null);

  // markerRef holds the Leaflet marker (the pin on the map).
  // Same reason as mapRef — needs to persist across renders without causing re-renders.
  const markerRef = useRef(null);

  // locating = true while we're waiting for the browser's GPS to respond.
  // Used by the component to show "Locating…" on the button and disable it.
  const [locating, setLocating] = useState(false);

  // leafletReady = true once the Leaflet library has finished loading from the CDN.
  // We can't initialize the map until this is true because window.L won't exist yet.
  const [leafletReady, setLeafletReady] = useState(false);

  // ── EFFECT 1: load Leaflet from CDN ─────────────────────────────────────────
  // Leaflet is NOT installed via npm — it's loaded dynamically by injecting
  // a <script> tag into the page at runtime. This runs once on mount.
  useEffect(() => {
    // If Leaflet already loaded (e.g. user closed and reopened the modal),
    // skip the whole loading process and just mark it as ready immediately.
    if (window.L) {
      setLeafletReady(true);
      return;
    }

    // Inject Leaflet's CSS — needed for the map tiles and controls to look correct
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    // Inject Leaflet's JS — this is the actual library (window.L)
    // script.onload fires when the browser has finished downloading and parsing it.
    // Only THEN do we set leafletReady = true, which triggers Effect 2.
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => setLeafletReady(true);
    document.head.appendChild(script);
  }, []); // empty array = run once on mount, never again

  // ── EFFECT 2: initialize the map ────────────────────────────────────────────
  // Runs when leafletReady flips to true (i.e. right after Effect 1 finishes).
  // This is where the actual Leaflet map gets created.
  useEffect(() => {
    // Guard 1: Leaflet JS hasn't loaded yet — can't use window.L
    if (!leafletReady) return;

    // Guard 2: the <div> ref isn't attached to the DOM yet
    if (!containerRef.current) return;

    // Guard 3: map was already initialized — don't create a second one.
    // This would happen if this effect somehow ran twice.
    if (mapRef.current) return;

    // Decide where to center the map:
    // - If we're editing an existing address that has coords → use those
    // - Otherwise → default to Amman city center
    const center = lat && lng ? [lat, lng] : [DEFAULT_CENTER.lat, DEFAULT_CENTER.lng];

    // Create the Leaflet map inside the containerRef <div>
    // setView(center, 15) — 15 is the zoom level (street level)
    const map = window.L.map(containerRef.current, { zoomControl: true }).setView(center, 15);

    // Load the actual map images (tiles) from OpenStreetMap.
    // {s} = subdomain for load balancing, {z}/{x}/{y} = zoom/tile coordinates
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Custom orange teardrop pin icon built with plain CSS
    // The rotate(-45deg) + border-radius trick makes a square look like a pin
    const icon = window.L.divIcon({
      className: '', // empty string prevents Leaflet adding its own default styles
      html: `<div style="
        width:32px; height:32px; background:#ED8936; border:3px solid #fff;
        border-radius:50% 50% 50% 0; transform:rotate(-45deg);
        box-shadow:0 2px 8px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [32, 32], // total size of the icon element
      iconAnchor: [16, 32], // which point of the icon sits on the exact coordinates
      // [16,32] = bottom center of the pin points to the location
    });

    // Drop the marker onto the map at the center point
    // draggable: true = user can drag the pin to a different location
    const marker = window.L.marker(center, { icon, draggable: true }).addTo(map);

    // When user DRAGS the pin and lets go:
    // get the new position and call onChange → updates Formik's lat/lng fields
    marker.on('dragend', (e) => {
      const { lat: newLat, lng: newLng } = e.target.getLatLng();
      onChange?.(newLat, newLng); // ?. = safe if onChange wasn't passed as a prop
    });

    // When user CLICKS anywhere on the map:
    // move the pin to that spot and call onChange → updates Formik's lat/lng fields
    map.on('click', (e) => {
      const { lat: newLat, lng: newLng } = e.latlng;
      marker.setLatLng([newLat, newLng]); // physically move the pin on the map
      onChange?.(newLat, newLng);
    });

    // Store both instances in refs so Effect 3 and handleLocate can access them later
    mapRef.current = map;
    markerRef.current = marker;
  }, [leafletReady]); // only re-runs if leafletReady changes (i.e. once, after CDN loads)

  // ── EFFECT 3: keep the pin in sync with external coord changes ──────────────
  // This handles the case where lat/lng change from OUTSIDE the map —
  // specifically when the user clicks "Use my location" and GPS returns coords.
  // Without this effect, the Formik values would update but the pin wouldn't move.
  useEffect(() => {
    // Guards: don't run if map/marker aren't initialized yet, or coords are missing
    if (!mapRef.current || !markerRef.current || !lat || !lng) return;

    markerRef.current.setLatLng([lat, lng]); // move the pin
    mapRef.current.setView([lat, lng], mapRef.current.getZoom()); // pan map to pin
    // keeping current zoom level
  }, [lat, lng]); // re-runs whenever lat or lng props change

  // ── GPS BUTTON HANDLER ───────────────────────────────────────────────────────
  // Called when user clicks "Use my location".
  // Asks the browser for the device's GPS coordinates.
  const handleLocate = () => {
    // Guard 1: browser doesn't support geolocation API
    // Guard 2: onChange wasn't passed — no point locating if we can't report coords
    if (!navigator.geolocation || !onChange) return;

    setLocating(true); // show "Locating…" on the button

    navigator.geolocation.getCurrentPosition(
      // Success callback — browser found the location
      (pos) => {
        onChange?.(pos.coords.latitude, pos.coords.longitude);
        // onChange updates Formik → lat/lng props change → Effect 3 fires → pin moves
        setLocating(false); // restore button to "Use my location"
      },
      // Error callback — user denied permission or GPS timed out
      () => setLocating(false), // just stop the spinner, no crash
      { timeout: 8000 }, // give up after 8 seconds if no GPS signal
    );
  };

  // Expose only what the component needs to render:
  // - containerRef → attached to the map <div>
  // - locating     → drives button text and disabled state
  // - handleLocate → called when GPS button is clicked
  return { containerRef, locating, handleLocate };
}
