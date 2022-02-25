import api from './api';

class ProductService {
  getAll(page, limit) {
    return api.get(`products?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`products/${id}`);
  }

  create(data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('sku', data.sku);
    formData.append('price', data.price);
    formData.append('discount', data.discount);
    formData.append('saleCount', data.saleCount);
    formData.append('category', data.category);
    formData.append('tag', data.tag);
    formData.append('stock', data.stock);
    formData.append('new', data.new);
    formData.append('shortDescription', data.shortDescription);
    formData.append('fullDescription', data.fullDescription);

    formData.append('shortDescriptionGerman', data.shortDescriptionGerman);
    formData.append('fullDescriptionGerman', data.fullDescriptionGerman);
    if (data.image) {
      data.image.forEach((image) => {
        formData.append('image', image);
      });
    }
    return api.post('products', formData, config);
  }

  update(id, data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('sku', data.sku);
    formData.append('price', data.price);
    formData.append('discount', data.discount);
    formData.append('saleCount', data.saleCount);
    formData.append('category', data.category);
    formData.append('tag', data.tag);
    formData.append('stock', data.stock);
    formData.append('new', data.new);
    formData.append('shortDescription', data.shortDescription);
    formData.append('fullDescription', data.fullDescription);

    formData.append('shortDescriptionGerman', data.shortDescriptionGerman);
    formData.append('fullDescriptionGerman', data.fullDescriptionGerman);
    if (data.image) {
      data.image.forEach((image) => {
        formData.append('image', image);
      });
    }

    return api.patch(`products/${id}`, formData, config);
  }

  delete(id) {
    return api.delete(`products/${id}`);
  }

  // deleteAll() {
  //   return http.delete(`/tutorials`);
  // }

  // findByTitle(title) {
  //   return http.get(`/tutorials?title=${title}`);
  // }
}

export default new ProductService();
