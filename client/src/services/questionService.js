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
    const token = getToken();
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
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
    const token = getToken();
    const requestOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/questions/${quesitionId}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async getQuestionsByToken(token) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/user/questions`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async getDetailQuestion(questionId) {
    const token = getToken();
    let requestOptions;
    if (token) {
      requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
    }

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/questions/${questionId}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async LikeQuestion(questionId) {
    const token = getToken();
    const requestOptions = {
      method: 'PUT',
      body: JSON.stringify({
        question_id: questionId,
        type: '1',
      }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/ratings/questions`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async DislikeQuestion(questionId) {
    const token = getToken();
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        question_id: questionId,
        type: '0',
      }),
    };

    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/ratings/questions`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }

  static async getListQuestion(page, filter) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const data = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/questions?page=${page}&filter=${filter}`,
      requestOptions
    );
    return data.json();
  }
}

export default QuestionService;
