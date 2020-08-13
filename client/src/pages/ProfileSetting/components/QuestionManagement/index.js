import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../../../helper/auth';
import QuestionService from '../../../../services/questionService';
import Question from './Question';

const QuestionManagement = () => {
  const [questions, setQuestions] = useState([]);
  const [questionsDisplay, setQuestionsDisplay] = useState([]);
  const user_info_getted = useSelector((state) => state.user_info.getted);
  useEffect(() => {
    if (!user_info_getted) return;
    const fetchQuestionsByToken = async (token) => {
      const value = await QuestionService.getQuestionsByToken(token);
      console.log(value);
      if (!value.error) setQuestions(value.data);
    };
    const token = getToken();
    fetchQuestionsByToken(token);
  }, [user_info_getted]);

  useEffect(() => {
    const display = questions.map((value) => {
      return <Question />;
    });
    setQuestionsDisplay(display);
  }, [questions]);

  return (
    <div className="tab-pane" role="tabpanel" id="menu2">
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th scope="col">
              <h2>Title</h2>
            </th>
            <th scope="col">
              <h2>Category</h2>
            </th>
            <th scope="col">
              <h2>Edit</h2>
            </th>
          </tr>
        </thead>
        <tbody>{questionsDisplay}</tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              5
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">»</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default QuestionManagement;
