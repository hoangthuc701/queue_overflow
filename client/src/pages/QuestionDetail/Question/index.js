import React, { Component } from 'react';
import { Link, withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import Loading from '../../../components/Loading';

import Markdown from '../MarkDown';
import { isAuthor } from '../../../helper/auth';
import formatDate from '../../../helper/formatDate';

import questionAction from '../../../actions/question';
import modalAction from '../../../actions/modal';

import './index.css';

class Question extends Component {
  constructor() {
    super();
    this.state = {
      value: true,
      loading: true,
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    // eslint-disable-next-line react/prop-types
    const { questionId } = match.params;
    const { QuestionActionCreators } = this.props;
    const value = await QuestionActionCreators.getQuestionDetail(questionId);
    this.setState({ value });
    this.setState({ loading: false });
  }

  handleDelete = () => {
    const { ModelActionCreators } = this.props;
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    // eslint-disable-next-line react/prop-types
    const { questionId } = match.params;
    ModelActionCreators.showModal(
      'Confirm Delete',
      'Do you want to delete this question?',
      'question',
      questionId
    );
  };

  renderManager = () => {
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    // eslint-disable-next-line react/prop-types
    const { questionId } = match.params;
    return (
      <>
        <Link to={`/question/edit/${questionId}`}>
          <button type="button" className="btn btn-outline-success">
            Edit{' '}
          </button>
        </Link>
        <button
          type="button"
          className="btn btn-outline-danger ml-2"
          onClick={this.handleDelete}
        >
          Delete
        </button>
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

  renderTags = () => {
    const { tags } = this.props;
    return tags.map((tag) => {
      return (
        <Link
          className="badge badge-secondary"
          key={tag.tag_id}
          style={{
            backgroundColor: '#03a9f4',
            borderColor: '#03a9f4',
            marginLeft: '2px',
          }}
          to={`/tag/${tag.tag_id}`}
        >
          {tag.name}
        </Link>
      );
    });
  };

  renderCategory = () => {
    const { category } = this.props;
    return (
      <div className="text-right">
        <h5>
          <Link
            to={`/category/${category.category_id}`}
            className="badge badge-danger"
            style={{
              backgroundColor: `${category.color}`,
              borderColor: `${category.color}`,
            }}
          >
            {category.name}
          </Link>
        </h5>
      </div>
    );
  };

  renderAuthor = () => {
    const { author } = this.props;
    return (
      // eslint-disable-next-line no-underscore-dangle
      <Link to={`/profile/${author.author_id}`} className="float-right">
        <img
          src={`/upload/${author.author_id}`}
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
        onClick={this.handleDislike.bind(this, questionId)}
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
      title,
      content,
      author,
      // eslint-disable-next-line camelcase
      created_time,
      totalDislike,
      totalLike,
      deleted,
    } = this.props;
    const { value, loading } = this.state;
    if (loading) return <Loading />;
    if (!value || deleted) return <Redirect to="/" />;
    const score = totalLike - totalDislike;
    const authorId = author.author_id;
    return (
      <div className="row">
        <div className="col-sm-2"> </div>
        <div className="col-sm-8 question">
          <div className="row">
            <div className="col-sm-10 align-self-end">
              <h1>{title}</h1>
            </div>
            <div className="col-sm-2 align-self-end">
              {this.renderCategory()}
            </div>
          </div>
          <hr style={{ marginTop: '-0.25em' }} />
          <span>Created {formatDate(created_time)}</span>
          <span style={{ marginLeft: '1em' }}>{this.renderTags()}</span>
          <div className="row">
            <div className="col-sm-6"> </div>
            <div className="col-sm-6 text-right"> </div>
          </div>
          <div className="card card-question">
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
            <div className="col-sm-6 text-right mt-1">
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
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  author: PropTypes.objectOf(PropTypes.string).isRequired,
  tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  category: PropTypes.objectOf(PropTypes.string).isRequired,
  vote: PropTypes.string.isRequired,
  totalLike: PropTypes.number.isRequired,
  questionId: PropTypes.string.isRequired,
  totalDislike: PropTypes.number.isRequired,
  created_time: PropTypes.string.isRequired,
  QuestionActionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
  ModelActionCreators: PropTypes.objectOf(PropTypes.func).isRequired,
  deleted: PropTypes.bool.isRequired,
};
const mapStateToProps = (state) => ({
  title: state.question.title,
  content: state.question.content,
  author: state.question.author,
  tags: state.question.tags,
  category: state.question.category,
  vote: state.question.vote,
  created_time: state.question.created_time,
  totalLike: state.question.rating_detail.totalLike,
  totalDislike: state.question.rating_detail.totalDislike,
  // eslint-disable-next-line no-underscore-dangle
  questionId: state.question._id,
  deleted: state.question.deleted,
});
const mapDispatchToProps = (dispatch) => ({
  QuestionActionCreators: bindActionCreators(questionAction, dispatch),
  ModelActionCreators: bindActionCreators(modalAction, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, withRouter)(Question);
