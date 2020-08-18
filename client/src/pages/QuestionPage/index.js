import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import questionAction from '../../actions/question';
import Question from '../../components/Question';
import Pagination from '../../components/pagination';
import Loading from '../../components/Loading';

const QuestionPage = () => {
  const Newest = 'newest';
  const Oldest = 'oldest';
  const Category = 'category';
  const dispatch = useDispatch();
  const questionComponent = (title) => <Question title={title} />;
  const paginationComponent = (perPage, questionlist, paginate) => {
    return (
      <div className="d-flex justify-content-center">
        <Pagination
          postsPerPage={perPage}
          totalPosts={questionlist.totalCount}
          paginate={paginate}
        />
      </div>
    );
  };
  const perPage = 10;
  const [flagCate, setflagCate] = useState(Newest);
  useEffect(() => {
    dispatch(questionAction.questionList());
  }, []);
  const { questionlist, getting } = useSelector((state) => state.questionList);
  let questionitem;
  let pageItems;
  // PAGINATION
  const paginate = (pageNumber) => {
    dispatch(questionAction.questionList(pageNumber, flagCate));
  };
  if (questionlist.questions) {
    questionitem = questionlist.questions.map((e) => {
      return <div key={e}>{questionComponent(e)}</div>;
    });
    pageItems = paginationComponent(perPage, questionlist, paginate);
  }
  // EVENT BUTTON
  function onClickFilter(filby) {
    setflagCate(filby);
    if (filby.localeCompare(Newest)) {
      dispatch(questionAction.questionList());
    } else if (filby.localeCompare(Oldest)) {
      dispatch(questionAction.questionList(1, Oldest));
    } else if (filby.localeCompare(Category)) {
      dispatch(questionAction.questionList(1, Category));
    }
  }
  if (getting) {
    questionitem = <Loading />;
    pageItems = <div />;
  }

  return (
    <div
      className="container-fluid"
      style={{ marginBottom: '7em', marginTop: '2.5em' }}
    >
      <div className="row">
        <div className="col-sm-2"> </div>
        <div className="col-sm-8">
          <div>
            <h1>All Questions</h1>
            <span>View by: </span>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-secondary"
                style={{
                  backgroundColor: '#e0e0e0',
                  color: '#424242',
                  borderColor: '#bdbdbd',
                }}
                onClick={() => onClickFilter(Newest)}
              >
                Newset
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{
                  backgroundColor: '#e0e0e0',
                  color: '#424242',
                  borderColor: '#bdbdbd',
                }}
                onClick={() => onClickFilter(Oldest)}
              >
                Oldest
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{
                  backgroundColor: '#e0e0e0',
                  color: '#424242',
                  borderColor: '#bdbdbd',
                }}
                onClick={() => onClickFilter(Category)}
              >
                Category
              </button>
            </div>
            <Link
              to="/question/add"
              type="button"
              className="btn btn-primary float-right"
              style={{ backgroundColor: '#5bc0de', borderColor: 'black' }}
            >
              <b>Add new question</b>
            </Link>
          </div>
        </div>
        <div className="col-sm-2"> </div>
      </div>
      {questionitem}
      {pageItems}
    </div>
  );
};

export default QuestionPage;
