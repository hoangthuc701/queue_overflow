import { getToken } from '../helper/auth';

class AnswerService {
  static async createNew(questionId, content) {
    const token = getToken();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/answers/${questionId}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async delete(answerId) {
    const token = getToken();
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/answers/${answerId}`,
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

  static async MarkAsBestAnswer(questionId, answerId) {
    const token = getToken();
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/questions/${questionId}/best_answer/${answerId}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }
}

export default AnswerService;
