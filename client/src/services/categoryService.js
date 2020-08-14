class CategoryService {
  static async getCategory() {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/categories`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }
}

export default CategoryService;
