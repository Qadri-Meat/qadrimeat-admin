import api from './api';

class DealService {
  getAll(page, limit) {
    return api.get(`/deals?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`/deals/${id}`);
  }

  create(data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };
    const formData = new FormData();
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      if (key === 'image') {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    });
    return api.post('/deals', formData, config);
  }

  update(id, data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    Object.entries(data).forEach((entry) => {
      const [key, value] = entry;
      if (key === 'image') {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else {
        formData.append(key, value);
      }
    });
    return api.patch(`/deals/${id}`, formData, config);
  }

  delete(id) {
    return api.delete(`/deals/${id}`);
  }
}

export default new DealService();
