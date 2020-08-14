import { getToken } from '../helper/auth';

class QuestionService {
  static async createNewQuestion(title, category, content, tags) {
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

  static async updateQuestion(title, category, content, tags, quesitonId) {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, category, content, tags, quesitonId }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/questions`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async deleteQuestion(quesitionId) {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/questions/${quesitionId}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  // eslint-disable-next-line no-unused-vars
  static async getDetailQuestion(questionId) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // x: quesitionId,
    };

    const res = await fetch(
      `https://run.mocky.io/v3/31cd9c28-3bd4-4e08-bfe4-f14a8bd46d4a`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async LikeQuestion(quesitionId) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch(`${quesitionId}`, requestOptions);
    const data = await res.json();
    return data;
  }

  static async DislikeQuestion(quesitionId) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };

    const res = await fetch(`${quesitionId}`, requestOptions);
    const data = await res.json();
    return data;
  }
}

export default QuestionService;
