import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from './Question';
import questionActions from '../../../../actions/question';

const QuestionManagement = () => {
  const [questionsDisplay, setQuestionsDisplay] = useState([]);
  const userInfoGetting = useSelector((state) => state.user_info.getting);
  const userInfoGetted = useSelector((state) => state.user_info.getted);
  const dispatch = useDispatch();
  const questions = useSelector(
    (state) => state.questionList.questionlist.questions
  );
  useEffect(() => {
    if (!userInfoGetting && userInfoGetted) {
      dispatch(questionActions.getUserQuestions());
    }
  }, [userInfoGetting, userInfoGetted, dispatch]);

  useEffect(() => {
    const display = questions.map((question) => {
      return (
        <Question
          // eslint-disable-next-line no-underscore-dangle
          key={question._id}
          title={question.title}
          time={question.created_time}
          category={question.category.name}
        />
      );
    });
    setQuestionsDisplay(display);
  }, [questions]);

  return (
    <div className="tab-pane" role="tabpanel" id="menu2">
      <table className="table table-borderless table-hover">
        <thead>
          <tr className="row">
            <th scope="col" className="col-7">
              <h3>Title</h3>
            </th>
            <th scope="col" className="col-3 d-flex justify-content-center">
              <h3>Category</h3>
            </th>
            <th scope="col" className="col-2 d-flex justify-content-center">
              <h3>Edit</h3>
            </th>
          </tr>
        </thead>
        <hr />
        <tbody>{questionsDisplay}</tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" aria-label="Previous" href="true">
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="true">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="true">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="true">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="true">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="true">
              5
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="true" aria-label="Next">
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
