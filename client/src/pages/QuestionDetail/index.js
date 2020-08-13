import React, { Component } from 'react';

import Question from './Question';

class QuestionDetailPage extends Component {
  renderQuestion = () => <Question />;

  render() {
    return (
      <>
        <div>
          <div className="row">
            <div className="col-sm-2"> </div>
            <div className="col-sm-8">
              <h2>Your answer:</h2>

              <button type="button" className="btn btn-primary float-right">
                Submit
              </button>
            </div>
            <div className="col-sm-2"> </div>
          </div>
        </div>
      </>
    );
  }
}

export default QuestionDetailPage;
