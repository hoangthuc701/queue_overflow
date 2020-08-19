import { getToken } from '../helper/auth';

class ImageService {
  static async uploadAvatar(imageFile) {
    const formData = new FormData();
    formData.append('avatar', imageFile);
    const token = getToken();
    const requestOptions = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/upload`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }
}
export default ImageService;
