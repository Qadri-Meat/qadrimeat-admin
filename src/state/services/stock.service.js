import api from './api';

class StockService {
  getAll(query) {
    return api.get(`/stocks${query}`);
  }

  get(id) {
    return api.get(`/stocks/${id}`);
  }

  create(data) {
    return api.post('/stocks', data);
  }

  update(id, data) {
    return api.patch(`/stocks/${id}`, data);
  }

  delete(id) {
    return api.delete(`/stocks/${id}`);
  }
}

export default new StockService();
