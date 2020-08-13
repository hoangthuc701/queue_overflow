import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import Answer from './Answer';

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
          content={answer.content}
          author={answer.author}
          vote={answer.vote}
          totalLike={answer.rating_detail.totalLike}
          totalDislike={answer.rating_detail.totalDislike}
          created_time={answer.created_time}
        />
      );
    });
  };

  render() {
    return (
      <>
        {this.renderQuestion()}
        {this.renderAnswer()}
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

const mapStateToProps = (state) => ({
  answers: state.question.answers,
});

export default connect(mapStateToProps, null)(QuestionDetailPage);
