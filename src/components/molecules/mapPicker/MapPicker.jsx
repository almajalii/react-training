import { MapPin, Locate } from 'lucide-react';
import { gfx } from '../../../styles/themeColors';
import { useMapPicker } from './useMapPicker';

export default function MapPicker({ lat, lng, onChange }) {
  const { containerRef, locating, handleLocate } = useMapPicker({ lat, lng, onChange });

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label className={gfx.label}>
          <MapPin className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />
          Location on map
          <span className="text-faint font-normal ml-1">(optional)</span>
        </label>
        <button
          type="button"
          onClick={handleLocate}
          disabled={locating}
          className="flex items-center gap-1.5 text-[12px] font-medium text-brand
            hover:text-brand-strong transition-colors disabled:opacity-50"
        >
          <Locate className="w-3.5 h-3.5" />
          {locating ? 'Locating…' : 'Use my location'}
        </button>
      </div>

      {/* containerRef is what Leaflet renders the map into */}
      <div
        ref={containerRef}
        className="w-full rounded-xl overflow-hidden border border-line"
        style={{ height: 200 }}
      />

      {lat && lng && (
        <p className="mt-1.5 text-[12px] text-muted font-mono">
          {lat.toFixed(6)}, {lng.toFixed(6)}
        </p>
      )}

      <p className="mt-1 text-[12px] text-faint">Tap the map or drag the pin to set the exact location.</p>
    </div>
  );
}
