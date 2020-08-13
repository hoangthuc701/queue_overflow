import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import questionAction from '../../actions/question';
import Question from '../../components/Question';

const QuestionPage = () => {
  const dispatch = useDispatch();
  const questionComponent = (title) => <Question title={title} />;
  useEffect(() => {
    dispatch(questionAction.questionList());
  }, []);
  const { questionlist } = useSelector((state) => state.questionList);
  let questionitem;
  if (questionlist.questions) {
    questionitem = questionlist.questions.map((e) => {
      return <div key={e._id}>{questionComponent(e)}</div>;
    });
  } else {
    questionitem = 'LOADING....';
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
              >
                Category
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                style={{
                  backgroundColor: '#e0e0e0',
                  color: '#424242',
                  borderColor: '#bdbdbd',
                }}
              >
                Tag
              </button>
            </div>
            <button
              type="button"
              className="btn btn-primary float-right"
              style={{ backgroundColor: '#5bc0de', borderColor: 'black' }}
            >
              <b>Add new question</b>
            </button>
          </div>
        </div>
        <div className="col-sm-2"> </div>
      </div>
      {questionitem}
    </div>
  );
};

export default QuestionPage;
