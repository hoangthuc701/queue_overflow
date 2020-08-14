import { getToken, getUser } from '../helper/auth';

class UserService {
  static async signIn(email, password) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/signin`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async signup(email, password, displayName) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, display_name: displayName }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/signup`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async getInfo(id) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/users/${id}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  // eslint-disable-next-line no-use-before-define
  static async updateInfo(displayName, description, password) {
    const token = getToken();
    const user = getUser();

    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        display_name: displayName,
        description,
        password,
      }),
    };
    const res = await fetch(
      // eslint-disable-next-line no-underscore-dangle
      `${process.env.REACT_APP_SERVER_DOMAIN}/users/${user._id}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }
}

export default UserService;
