import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import questionAction from '../../actions/question';
import Question from '../../components/Question';
import Pagination from '../../components/Pagination';
import Loading from '../../components/Loading';

const QuestionPage = (props) => {
  const { match } = props;
  const cateId = match.params;
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
  useEffect(() => {
    dispatch(questionAction.questionListByCate(1, cateId));
  }, [cateId, dispatch]);
  const { questionlist, getting } = useSelector((state) => state.questionList);
  let questionitem;
  let pageItems;
  // PAGINATION
  const paginate = (pageNumber) => {
    dispatch(questionAction.questionListByCate(pageNumber, cateId));
  };
  if (questionlist.questions) {
    questionitem = questionlist.questions.map((e) => {
      return <div key={e}>{questionComponent(e)}</div>;
    });
    pageItems = paginationComponent(perPage, questionlist, paginate);
  }
  // EVENT BUTTON
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
QuestionPage.propTypes = {
  match: PropTypes.string,
};
QuestionPage.defaultProps = {
  match: '',
};
export default QuestionPage;
