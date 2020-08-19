import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import questionAction from '../../actions/question';
import Question from '../../components/Question';
import Loading from '../../components/Loading';

const QuestionPage = (props) => {
  const { match } = props;
  const { keyword } = match.params;
  const dispatch = useDispatch();
  const questionComponent = (title) => <Question title={title} />;

  useEffect(() => {
    dispatch(questionAction.questionSearch(keyword));
  }, [keyword]);
  const { questionlist, getting } = useSelector((state) => state.questionList);
  let questionitem;
  let pageItems;

  if (questionlist.questions) {
    questionitem = questionlist.questions.map((e) => {
      return <div key={e}>{questionComponent(e)}</div>;
    });
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
      <div className="row">
        <div className="col-sm-2"> </div>
        <div className="col-sm-8">
          {' '}
          <h3> Search result for key word `{keyword}` </h3>{' '}
          <h3>{questionlist.questions.length === 0 ? 'No result' : ''}</h3>
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
