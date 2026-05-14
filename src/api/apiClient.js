const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://gofix-api-ceaaewf7hua0ghez.uaenorth-01.azurewebsites.net/api';

// ─── Token helpers ─────────────────────────────────────────────────────────────
export const getToken = () => localStorage.getItem('authToken');

export const setToken = (token) => {
  if (token) localStorage.setItem('authToken', token);
  else localStorage.removeItem('authToken');
};

// ─── Request helpers ───────────────────────────────────────────────────────────
const getHeaders = (auth = true, contentType = 'application/json') => {
  const headers = {};
  if (contentType) headers['Content-Type'] = contentType;
  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

const handleResponse = async (responsePromise) => {
  const response = await responsePromise;

  if (response.status === 401) setToken(null); // auto-clear on 401

  if (!response.ok) {
    let err;
    try { err = await response.json(); } catch { err = {}; }
    const msg =
      err.message || err.error ||
      (Array.isArray(err.errors) ? err.errors[0] : null) ||
      `HTTP ${response.status}`;
    throw new Error(msg);
  }

  try { return await response.json(); } catch { return null; }
};

// Unwrap the standard { data: ... } envelope
const unwrap = (promise) => promise.then((r) => r?.data ?? r);

// ─── API Client ────────────────────────────────────────────────────────────────
export const apiClient = {

  // ── 1. AUTH  (/auth) ─────────────────────────────────────────────────────────
  auth: {
    register: (firstName, lastName, email, phone, password, confirmPassword, role = 'customer') =>
      handleResponse(fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ firstName, lastName, email, phone, password, confirmPassword, role }),
      })),

    login: async (email, password) => {
      const res = await handleResponse(fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ email, password }),
      }));
      // Accept both {data: {token, user}} and flat {token, user} shapes.
      const payload = res?.data ?? res ?? {};
      if (payload.token) setToken(payload.token);
      // Always return a normalized envelope so callers can read response.data.user reliably.
      return { ...res, data: payload };
    },

    // Requires Bearer token (token received right after login, before verification)
    verifyEmail: (code) =>
      handleResponse(fetch(`${API_BASE_URL}/auth/verify-email`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ code }),
      })),

    sendVerification: () =>
      handleResponse(fetch(`${API_BASE_URL}/auth/send-verification`, {
        method: 'POST',
        headers: getHeaders(true),
      })),

    forgotPassword: (email) =>
      handleResponse(fetch(`${API_BASE_URL}/auth/forgot-password`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ email }),
      })),

    resetPassword: (token, newPassword) =>
      handleResponse(fetch(`${API_BASE_URL}/auth/reset-password`, {
        method: 'POST',
        headers: getHeaders(false),
        body: JSON.stringify({ token, newPassword }),
      })),

    logout: () => setToken(null),
  },

  // ── 2. SETTINGS & PROFILE  (/settings) ───────────────────────────────────────
  profile: {
    get: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/settings/profile`, {
        headers: getHeaders(true),
      }))),

    updateName: (name) =>
      handleResponse(fetch(`${API_BASE_URL}/settings/profile/name`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ name }),
      })),

    updateEmail: (email) =>
      handleResponse(fetch(`${API_BASE_URL}/settings/profile/email`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ email }),
      })),

    updatePhone: (phone) =>
      handleResponse(fetch(`${API_BASE_URL}/settings/profile/phone`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ phone }),
      })),

    updateDob: (dateOfBirth) =>
      handleResponse(fetch(`${API_BASE_URL}/settings/profile/dob`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ dateOfBirth }),
      })),

    updateGender: (gender) =>
      handleResponse(fetch(`${API_BASE_URL}/settings/profile/gender`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ gender }),
      })),

    submitFeedback: (rating, comment, category = 'general') =>
      handleResponse(fetch(`${API_BASE_URL}/settings/feedback`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ rating, comment, category }),
      })),

    deleteAccount: () =>
      handleResponse(fetch(`${API_BASE_URL}/settings/account`, {
        method: 'DELETE',
        headers: getHeaders(true),
      })),
  },

  // ── 3. ADDRESSES  (/settings/addresses) ──────────────────────────────────────
  addresses: {
    list: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/settings/addresses`, {
        headers: getHeaders(true),
      }))),

    create: (address) =>
      handleResponse(fetch(`${API_BASE_URL}/settings/addresses`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(address),
      })),

    update: (id, address) =>
      handleResponse(fetch(`${API_BASE_URL}/settings/addresses/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(address),
      })),

    delete: (id) =>
      handleResponse(fetch(`${API_BASE_URL}/settings/addresses/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true),
      })),
  },

  // ── 4. PROFESSIONALS  (/professionals) ───────────────────────────────────────
  professionals: {
    list: (params = {}) => {
      const q = new URLSearchParams(params).toString();
      return unwrap(handleResponse(fetch(`${API_BASE_URL}/professionals${q ? `?${q}` : ''}`, {
        headers: getHeaders(false),
      })));
    },

    get: (id) =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/professionals/${id}`, {
        headers: getHeaders(false),
      }))),

    filter: ({ categoryId, minRating, maxDistance, minExp, lat, lon } = {}) => {
      const q = new URLSearchParams();
      if (categoryId  != null) q.set('categoryId',   categoryId);
      if (minRating   != null) q.set('minRating',    minRating);
      if (maxDistance != null) q.set('maxDistance',  maxDistance);
      if (minExp      != null) q.set('minExp',       minExp);
      if (lat         != null) q.set('lat',          lat);
      if (lon         != null) q.set('lon',          lon);
      return unwrap(handleResponse(fetch(`${API_BASE_URL}/professionals/filter?${q}`, {
        headers: getHeaders(false),
      })));
    },

    getServiceAreas: (id) =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/professionals/${id}/service-areas`, {
        headers: getHeaders(false),
      }))),

    getFavorites: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/professionals/favorites`, {
        headers: getHeaders(true),
      }))),

    addFavorite: (id) =>
      handleResponse(fetch(`${API_BASE_URL}/professionals/${id}/favorite`, {
        method: 'POST',
        headers: getHeaders(true),
      })),

    removeFavorite: (id) =>
      handleResponse(fetch(`${API_BASE_URL}/professionals/${id}/favorite`, {
        method: 'DELETE',
        headers: getHeaders(true),
      })),
  },

  // ── 5. CATEGORIES & SERVICES ─────────────────────────────────────────────────
  categories: {
    list: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/categories`, {
        headers: getHeaders(false),
      }))),

    getServices: (categoryId) =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/professionals/services?categoryId=${categoryId}`, {
        headers: getHeaders(false),
      }))),

    getServiceAreas: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/professionals/service-areas`, {
        headers: getHeaders(false),
      }))),

    getCities: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/professionals/cities`, {
        headers: getHeaders(false),
      }))),
  },

  // ── 6. BECOME A PRO  (/professionals/profile) ────────────────────────────────
  proApplication: {
    createProfile: (body) =>
      handleResponse(fetch(`${API_BASE_URL}/professionals/profile`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(body),
      })),

    setServices: (services) =>
      handleResponse(fetch(`${API_BASE_URL}/professionals/profile/services`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ services }),
      })),

    setServiceAreas: (serviceAreaIds) =>
      handleResponse(fetch(`${API_BASE_URL}/professionals/profile/service-areas`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ serviceAreaIds }),
      })),

    setWorkingHours: (schedules) =>
      handleResponse(fetch(`${API_BASE_URL}/professionals/profile/working-hours`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify({ schedules }),
      })),

    // multipart — pass a File object
    uploadPicture: (file) => {
      const form = new FormData();
      form.append('file', file);
      return handleResponse(fetch(`${API_BASE_URL}/professionals/profile/picture`, {
        method: 'POST',
        headers: getHeaders(true, null), // no Content-Type; browser sets multipart boundary
        body: form,
      }));
    },

    // documentType: "identity" | "certification" | "good_conduct"
    uploadDocument: (file, documentType, { name, issuedBy, issuedYear } = {}) => {
      const form = new FormData();
      form.append('file', file);
      form.append('documentType', documentType);
      if (name)       form.append('name',       name);
      if (issuedBy)   form.append('issuedBy',   issuedBy);
      if (issuedYear) form.append('issuedYear', issuedYear);
      return handleResponse(fetch(`${API_BASE_URL}/professionals/profile/documents`, {
        method: 'POST',
        headers: getHeaders(true, null),
        body: form,
      }));
    },

    submit: () =>
      handleResponse(fetch(`${API_BASE_URL}/professionals/profile/submit`, {
        method: 'POST',
        headers: getHeaders(true),
      })),

    getStatus: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/professionals/profile/status`, {
        headers: getHeaders(true),
      }))),
  },

  // ── 7. SEARCH ────────────────────────────────────────────────────────────────
  search: {
    query: (q, limit = 10) =>
      unwrap(handleResponse(fetch(
        `${API_BASE_URL}/search?q=${encodeURIComponent(q)}&limit=${limit}`,
        { headers: getHeaders(false) }
      ))),

    byArea: (area, categoryId) => {
      const params = new URLSearchParams();
      if (area)       params.set('area',       area);
      if (categoryId) params.set('categoryId', categoryId);
      return unwrap(handleResponse(fetch(`${API_BASE_URL}/professionals?${params}`, {
        headers: getHeaders(false),
      })));
    },

    getHistory: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/search/history`, {
        headers: getHeaders(true),
      }))),

    record: (query) =>
      handleResponse(fetch(`${API_BASE_URL}/search/history`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ query }),
      })),

    deleteHistoryItem: (id) =>
      handleResponse(fetch(`${API_BASE_URL}/search/history/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true),
      })),

    clearHistory: () =>
      handleResponse(fetch(`${API_BASE_URL}/search/history`, {
        method: 'DELETE',
        headers: getHeaders(true),
      })),
  },

  // ── 8. BOOKINGS ──────────────────────────────────────────────────────────────
  bookings: {
    getUpcoming: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/bookings?filter=upcoming`, {
        headers: getHeaders(true),
      }))),

    getPast: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/bookings?filter=past`, {
        headers: getHeaders(true),
      }))),

    get: (id) =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/bookings/${id}`, {
        headers: getHeaders(true),
      }))),

    create: (booking) =>
      handleResponse(fetch(`${API_BASE_URL}/bookings`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(booking),
      })),

    update: (id, updates) =>
      handleResponse(fetch(`${API_BASE_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(updates),
      })),

    // PATCH — matches the spec
    cancel: (id) =>
      handleResponse(fetch(`${API_BASE_URL}/bookings/${id}/cancel`, {
        method: 'PATCH',
        headers: getHeaders(true),
      })),

    report: (id, description) =>
      handleResponse(fetch(`${API_BASE_URL}/bookings/${id}/report`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ description }),
      })),
  },

  // ── 9. REVIEWS ───────────────────────────────────────────────────────────────
  reviews: {
    // GET /reviews?professionalId={id}
    getByProfessional: (professionalId) =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/reviews?professionalId=${professionalId}`, {
        headers: getHeaders(false),
      }))),

    create: (review) =>
      handleResponse(fetch(`${API_BASE_URL}/reviews`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify(review),
      })),

    update: (id, review) =>
      handleResponse(fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(review),
      })),

    delete: (id) =>
      handleResponse(fetch(`${API_BASE_URL}/reviews/${id}`, {
        method: 'DELETE',
        headers: getHeaders(true),
      })),
  },

  // ── 10. NOTIFICATIONS ────────────────────────────────────────────────────────
  notifications: {
    list: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/notifications`, {
        headers: getHeaders(true),
      }))),

    markRead: (id) =>
      handleResponse(fetch(`${API_BASE_URL}/notifications/${id}/read`, {
        method: 'PATCH',
        headers: getHeaders(true),
      })),

    markAllRead: () =>
      handleResponse(fetch(`${API_BASE_URL}/notifications/read-all`, {
        method: 'PATCH',
        headers: getHeaders(true),
      })),

    getPreferences: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/settings/notifications`, {
        headers: getHeaders(true),
      }))),

    updatePreferences: (prefs) =>
      handleResponse(fetch(`${API_BASE_URL}/settings/notifications`, {
        method: 'PUT',
        headers: getHeaders(true),
        body: JSON.stringify(prefs),
      })),
  },

  // ── 11. CHAT ─────────────────────────────────────────────────────────────────
  chats: {
    list: () =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/chats`, {
        headers: getHeaders(true),
      }))),

    getMessages: (chatId) =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
        headers: getHeaders(true),
      }))),

    // type: "text" | "image"
    sendMessage: (chatId, text, type = 'text', attachmentPath = null) =>
      handleResponse(fetch(`${API_BASE_URL}/chats/${chatId}/messages`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ text, type, attachmentPath }),
      })),

    delete: (chatId) =>
      handleResponse(fetch(`${API_BASE_URL}/chats/${chatId}`, {
        method: 'DELETE',
        headers: getHeaders(true),
      })),

    getOrCreate: (professionalId, professionalName) =>
      unwrap(handleResponse(fetch(`${API_BASE_URL}/chats/getOrCreate`, {
        method: 'POST',
        headers: getHeaders(true),
        body: JSON.stringify({ professionalId, professionalName }),
      }))),
  },
};