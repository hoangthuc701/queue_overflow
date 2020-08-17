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

  static async resetPassword(password, token) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, token }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/reset_password`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async forgotPassword(email) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/forgot_password`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  // eslint-disable-next-line no-unused-vars
  static async verifyAccount(token) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/forgot_password`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }
}

export default UserService;
