class QuestionService {
  static async createNewQuestion(title, category, content, tags) {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
  static async getListQuestion(page, filter) {
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    };
    const res = await fetch(
      `${process.env.REACT_APP_SERVER_DOMAIN}/questions?page=${page}&filter=${filter}`,
      requestOptions
    );
    const data = await res.json();
    return data;
  }
}

export default QuestionService;
