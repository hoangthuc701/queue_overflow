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

    console.log(
      `Userservice: ${process.env.REACT_APP_SERVER_DOMAIN}/users/${id}`
    );
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/users/${id}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }
}

export default UserService;
