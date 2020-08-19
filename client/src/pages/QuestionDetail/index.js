import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import Answer from './Answer';
import AnswerEditor from './AnswerEditor';

class QuestionDetailPage extends Component {
  renderQuestion = () => <Question />;

  renderAnswer = () => {
    // eslint-disable-next-line react/prop-types
    const { answers } = this.props;
    // eslint-disable-next-line react/prop-types
    return answers.map((answer) => {
      return (
        <Answer
          // eslint-disable-next-line no-underscore-dangle
          key={answer._id}
          // eslint-disable-next-line no-underscore-dangle
          answerId={answer._id}
          content={answer.content}
          author={answer.author}
          vote={answer.vote}
          totalLike={answer.rating_detail.totalLike}
          totalDislike={answer.rating_detail.totalDislike}
          created_time={answer.created_time}
          isBestAnswer={answer.isBestAnswer}
        />
      );
    });
  };

  renderAnswerEditor = () => <AnswerEditor />;

  render() {
    return (
      <>
        {this.renderQuestion()}
        <div>
          <div className="row">
            <div className="col-sm-2"> </div>
            <div className="col-sm-8">
              <h2 className="mt-4">Answer:</h2>
            </div>
            <div className="col-sm-2"> </div>
          </div>
        </div>
        {this.renderAnswer()}
        <div>
          <div className="row">
            <div className="col-sm-2"> </div>
            <div className="col-sm-8">
              <h2 className="mt-5">Your answer:</h2>
              {this.renderAnswerEditor()}
            </div>
            <div className="col-sm-2"> </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  answers: state.question.answers,
});

export default connect(mapStateToProps, null)(QuestionDetailPage);
