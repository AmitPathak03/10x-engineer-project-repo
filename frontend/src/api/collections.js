import { client } from './client';

export const collectionsApi = {
    list: () => client.get('/collections'),
    get: (id) => client.get(`/collections/${id}`),
    create: (data) => client.post('/collections', data),
    delete: (id) => client.delete(`/collections/${id}`),
};
