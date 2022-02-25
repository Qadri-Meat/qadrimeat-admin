import api from './api';

class ProductService {
  getAll(page, limit) {
    return api.get(`/products?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`/products/${id}`);
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
    return api.post('/products', formData, config);
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
    return api.patch(`/products/${id}`, formData, config);
  }

  delete(id) {
    return api.delete(`/products/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new ProductService();
