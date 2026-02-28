import { client } from './client';

export const promptsApi = {
    list: (params = {}) => {
        const query = new URLSearchParams(params).toString();
        return client.get(`/prompts?${query}`);
    },
    get: (id) => client.get(`/prompts/${id}`),
    create: (data) => client.post('/prompts', data),
    update: (id, data) => client.put(`/prompts/${id}`, data),
    patch: (id, data) => client.patch(`/prompts/${id}`, data),
    delete: (id) => client.delete(`/prompts/${id}`),
    getVersions: (id) => client.get(`/prompts/${id}/versions`),
};
