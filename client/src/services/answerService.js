import { getToken } from '../helper/auth';

class AnswerService {
  static async createNewAnswer(title, category, content, tags) {
    const token = getToken();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title, category, content, tags }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/questions`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async delete(answerId) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/questions/${answerId}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async LikeAnswer(answerId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch(`${answerId}`, requestOptions);
    const data = await res.json();
    return data;
  }

  static async DislikeAnswer(answerId) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch(`${answerId}`, requestOptions);
    const data = await res.json();
    return data;
  }
}

export default AnswerService;
