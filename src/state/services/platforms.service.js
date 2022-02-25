import api from './api';

class PlatformService {
  getAll(page, limit) {
    return api.get(`/platforms?page=${page}&limit=${limit}`);
  }

  get(id) {
    return api.get(`/platforms/${id}`);
  }

  create(data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    formData.append('category', data.category);
    formData.append('title', data.title);
    formData.append('headline', data.headline);
    formData.append('webBaseURL', data.webBaseURL);
    formData.append('iOSBaseURL', data.iOSBaseURL);
    formData.append('androidBaseURL', data.androidBaseURL);
    formData.append('packageName', data.packageName);
    formData.append('isUrl', data.isUrl);
    formData.append('isContact', data.isContact);
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }

    return api.post('/platforms/', formData, config);
  }

  update(id, data) {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('headline', data.headline);
    formData.append('webBaseURL', data.webBaseURL);
    formData.append('iOSBaseURL', data.iOSBaseURL);
    formData.append('androidBaseURL', data.androidBaseURL);
    formData.append('packageName', data.packageName);
    formData.append('isUrl', data.isUrl);
    formData.append('isContact', data.isContact);
    if (data.image[0]) {
      formData.append('image', data.image[0]);
    }

    return api.patch(`/platforms/${id}`, formData, config);
  }

  delete(id) {
    return api.delete(`/platforms/${id}`);
  }
}

export default new PlatformService();
