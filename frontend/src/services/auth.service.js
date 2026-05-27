import api from '../api/axiosConfig';

export const loginAdmin   = (data) => api.post('/auth/admin/login', data);
export const loginUsuario = (data) => api.post('/auth/login', data);
export const registro     = (data) => api.post('/auth/registro', data);
