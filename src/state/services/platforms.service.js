import api from './api';

class PlatformService {
  getAll(page, limit) {
    return api.get(`platforms?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`platforms/${id}`);
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
        if (value[0]) {
          formData.append('image', value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });

    return api.post('platforms/', formData, config);
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
        if (value[0]) {
          formData.append('image', value[0]);
        }
      } else {
        formData.append(key, value);
      }
    });

    return api.patch(`platforms/${id}`, formData, config);
  }

  delete(id) {
    return api.delete(`platforms/${id}`);
  }
}

export default new PlatformService();
