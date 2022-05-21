import api from './api';

class InventoryService {
  getAll(query) {
    return api.get(`/inventories${query}`);
  }

  get(id) {
    return api.get(`/inventories/${id}`);
  }

  create(data) {
    return api.post('/inventories', data);
  }

  update(id, data) {
    return api.patch(`/inventories/${id}`, data);
  }

  delete(id) {
    return api.delete(`/inventories/${id}`);
  }
}

export default new InventoryService();
