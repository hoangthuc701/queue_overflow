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
    const token = getToken();
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        answer_id: answerId,
        type: '1',
      }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/ratings/answers`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async DislikeAnswer(answerId) {
    const token = getToken();
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        answer_id: answerId,
        type: '0',
      }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/ratings/answers`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }
}

export default AnswerService;
