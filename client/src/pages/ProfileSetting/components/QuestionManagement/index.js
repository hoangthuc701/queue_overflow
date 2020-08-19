import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from './Question';
import questionActions from '../../../../actions/question';
import Pagination from '../../../../components/Pagination';
import Loading from '../../../../components/Loading';

const QuestionManagement = () => {
  const [questionsDisplay, setQuestionsDisplay] = useState([]);
  const userInfoGetting = useSelector((state) => state.user_info.getting);
  const userInfoGetted = useSelector((state) => state.user_info.getted);
  const dispatch = useDispatch();
  const questionList = useSelector((state) => state.questionList.questionlist);
  const [pageNum, setPageNum] = useState(1);
  const paginate = (number) => setPageNum(number);

  useEffect(() => {
    if (!userInfoGetting && userInfoGetted) {
      dispatch(questionActions.getUserQuestions(pageNum));
    }
  }, [userInfoGetting, userInfoGetted, pageNum, dispatch]);

  useEffect(() => {
    if (!userInfoGetted || userInfoGetting) {
      setQuestionsDisplay(<Loading />);
    }
    const display = questionList.questions.map((question) => {
      return (
        <Question
          // eslint-disable-next-line no-underscore-dangle
          key={question._id}
          // eslint-disable-next-line no-underscore-dangle
          id={question._id}
          title={question.title}
          time={question.created_time}
          // eslint-disable-next-line no-underscore-dangle
          categoryId={question.category.category_id}
          category={question.category.name}
        />
      );
    });
    setQuestionsDisplay(display);
  }, [questionList, userInfoGetted, userInfoGetting]);

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
              <h3>Action</h3>
            </th>
          </tr>
        </thead>
        <tbody>{questionsDisplay}</tbody>
      </table>
      <Pagination
        postsPerPage={questionList.questions.length}
        totalPosts={questionList.totalCount}
        paginate={paginate}
      />
    </div>
  );
};

export default QuestionManagement;
