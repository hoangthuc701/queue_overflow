import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Markdown from '../MarkDown';
import { isAuthor } from '../../../helper/auth';
import formatDate from '../../../helper/formatDate';

import questionAction from '../../../actions/question';

class Question extends Component {
  renderManager = () => {
    return (
      <>
        <span>
          <span style={{ fontSize: '150%', marginLeft: '2em' }}>Delete</span>
          <span
            className="fas fa-eraser"
            style={{
              fontSize: '150%',
              marginLeft: '0.5em',
              marginTop: '0.5em',
              color: 'black',
            }}
          />
        </span>
      </>
    );
  };

  handleLike = (questionId) => {
    const { QuestionActionCreators } = this.props;
    QuestionActionCreators.LikeQuestion(questionId);
  };

  handleDislike = (questionId) => {
    const { QuestionActionCreators } = this.props;
    QuestionActionCreators.DislikeQuestion(questionId);
  };

  renderAuthor = () => {
    const { author } = this.props;
    return (
      // eslint-disable-next-line no-underscore-dangle
      <Link to={`/profile/${author.author_id}`} className="float-right">
        <img
          src={author.avatar}
          className="rounded-circle"
          alt={author.name}
          width={50}
          height={50}
        />
        <b style={{ color: 'black', fontSize: '120%', marginLeft: '10px' }}>
          {author.name}
        </b>
      </Link>
    );
  };

  renderLikeButton = () => {
    const { vote, questionId } = this.props;
    return (
      <span
        role="presentation"
        onClick={this.handleLike.bind(this, questionId)}
        className={`fas fa-chevron-up ${vote === 'like' ? 'active-like' : ' '}`}
        style={{
          fontSize: '200%',
          marginLeft: '0.5em',
        }}
      >
        {' '}
      </span>
    );
  };

  renderDisLikeButton = () => {
    const { vote, questionId } = this.props;
    return (
      <span
        role="presentation"
        onClick={this.handleLike.bind(this, questionId)}
        className={`fas fa-chevron-down ${
          vote === 'dislike' ? 'active-dislike' : ' '
        }`}
        style={{
          fontSize: '200%',
          marginLeft: '0.2em',
        }}
      />
    );
  };

  render() {
    const {
      content,
      author,
      // eslint-disable-next-line camelcase
      created_time,
      totalDislike,
      totalLike,
    } = this.props;
    const score = totalLike - totalDislike;
    const authorId = author.author_id;
    return (
      <div className="row">
        <div className="col-sm-2"> </div>
        <div className="col-sm-8">
          <div className="row">
            <div className="col-sm-6 align-self-end"> </div>
            <div className="col-sm-6 align-self-end"> </div>
          </div>
          <hr style={{ marginTop: '-0.25em' }} />
          <div className="row">
            <div className="col-sm-6"> Created {formatDate(created_time)} </div>
            <div className="col-sm-6 text-right">
              <span style={{ marginRight: '1em' }}>Edited 28/07/2020</span>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <p className="card-text">
                <Markdown content={content} />
              </p>
              {this.renderAuthor()}
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <span style={{ fontSize: '200%' }}>{score}</span>
              {this.renderLikeButton()}
              {this.renderDisLikeButton()}
            </div>
            <div className="col-sm-6 text-right">
              {isAuthor(authorId) && this.renderManager()}
            </div>
          </div>
        </div>
        <div className="col-sm-2"> </div>
      </div>
    );
  }
}

Question.propTypes = {
  content: PropTypes.string.isRequired,
  author: PropTypes.objectOf(PropTypes.string).isRequired,
  vote: PropTypes.string.isRequired,
  totalLike: PropTypes.number.isRequired,
  questionId: PropTypes.string.isRequired,
  totalDislike: PropTypes.number.isRequired,
  created_time: PropTypes.string.isRequired,
  QuestionActionCreators: PropTypes.objectOf().isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  QuestionActionCreators: bindActionCreators(questionAction, dispatch),
});

export default connect(null, mapDispatchToProps)(withRouter(Question));
