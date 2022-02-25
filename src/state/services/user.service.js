import api from './api';

class UserService {
  getAll(page, limit) {
    return api.get(`/users?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`/users/${id}`);
  }

  create(data) {
    return api.post('/users', data);
  }

  update(id, data) {
    return api.patch(`/users/${id}`, data);
  }

  delete(id) {
    return api.delete(`/users/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new UserService();
