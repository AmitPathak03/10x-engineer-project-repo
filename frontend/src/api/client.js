const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiError extends Error {
    constructor(message, status, data) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

async function request(endpoint, options = {}) {
    const { method = 'GET', body, headers = {}, ...customConfigs } = options;

    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        ...customConfigs,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
        const data = response.status !== 204 ? await response.json() : null;

        if (response.ok) {
            return data;
        } else {
            throw new ApiError(data?.detail || response.statusText, response.status, data);
        }
    } catch (err) {
        if (err instanceof ApiError) {
            throw err;
        }
        throw new ApiError(err.message || 'Network error', 0);
    }
}

export const client = {
    get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
    post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
    put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body }),
    patch: (endpoint, body, options) => request(endpoint, { ...options, method: 'PATCH', body }),
    delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
};
