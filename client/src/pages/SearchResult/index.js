import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './index.css';
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
          <div></div>
        </div>
        <div className="col-sm-2"> </div>
      </div>
      <div className="row">
        <div className="col-sm-2"> </div>
        <div className="col-sm-8">
          {' '}
          <h3>
            <span class="badge badge-pill badge-light">
              Search result for key word{' '}
            </span>
            <span class="badge badge-pill badge-info">{keyword}</span>
          </h3>{' '}
          <h3>
            {questionlist.questions.length === 0 ? (
              <div id="notfound">
                <div class="notfound">
                  <div class="notfound-404"></div>
                  <h1>Oops!</h1>
                  <h2>No results found</h2>
                  <p>
                    Please,Try again!
                  </p>
                </div>
              </div>
            ) : (
              ''
            )}
          </h3>
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
