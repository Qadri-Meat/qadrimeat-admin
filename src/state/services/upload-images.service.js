import api from './api';

class UploadService {
  upload(images, onUploadProgress) {
    let formData = new FormData();
    images.forEach((image) => {
      formData.append('image', image);
    });

    return api.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  }
}

export default new UploadService();
