import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import questionAction from '../../actions/question';
import Question from '../../components/Question';

const QuestionPage = () => {
  const test = {
    titles: 'tuanquen',
    name: 'huyquen',
    created: '19/08/2022',
    category: 'LẬP TRÌNH',
    TAG: ['reactjs', 'nodejs', 'monggo'],
    content:
      'I have written a react component with a constructor, methods, and render. When I comment out the methods and have only the render and constructor everything is fine, but when I add the methods the first always comes up as undefined unless I close off the whole class after the constructor.',
    answered: '10',
    avartar:
      'https://internship.cybozu.com/api/user/photo.do/-/user.png?id=35&size=ORIGINAL_R&hash=0a24f42c063380c3724569e5d01744b7ed96dccf&.png',
    like: '10',
  };
  const dispatch = useDispatch();
  const question = (title) => <Question title={title} />;
  async function getList() {
    await dispatch(questionAction.questionList());
  }
  getList();
  const questionlist = useSelector((state) => state.questionList.questionlist);
  console.log(questionlist);
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
      {question(test)}
    </div>
  );
};

export default QuestionPage;
