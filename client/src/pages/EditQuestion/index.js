import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { withRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import MarkDownEditer from './components/MarkdownEditer';
import CategoryBox from './components/CategoryBox';
import TagInput from './components/TagInput';
import CreateNewValidator from '../../validators/question';
import QuestionService from '../../services/questionService';
import questionAction from '../../actions/question';
import modalAction from '../../actions/modal';

class EditQuestion extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      errors: {},
      title: '',
      category: '',
    };
  }

  async componentDidMount() {
    // eslint-disable-next-line react/prop-types
    const { match } = this.props;
    // eslint-disable-next-line react/prop-types
    const { questionId } = match.params;
    const { QuestionActionCreators } = this.props;
    await QuestionActionCreators.getQuestionDetail(questionId);
    const { title, content, category, tags } = this.props;
    const tagsList = tags.map((tag) => tag.name);
    const categoryId = category.category_id;
    this.setState({
      title,
      category: categoryId,
      content,
      tags: tagsList,
      questionId,
    });
  }

  handleChange = (key, value) => {
    this.setState({
      [key]: value,
    });
  };

  handleNewTag = (newtag) => {
    const { tags } = this.state;
    const Tags = [...tags, newtag];
    // remove duplicate
    const newTags = [...new Set(Tags)];
    this.setState({
      tags: newTags,
    });
  };

  handleRemoveTag = (removeTag) => {
    const { tags } = this.state;
    const newTags = tags.filter((tag) => tag !== removeTag);
    this.setState({
      tags: newTags,
    });
  };

  handleSubmit = () => {
    const { title, category, tags, content, questionId } = this.state;
    const error = CreateNewValidator(title, content, category);
    this.setState({ errors: error });
    if (Object.keys(error).length > 0) return;
    QuestionService.updateQuestion(title, category, content, tags, questionId)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        } else {
          const { history } = this.props;
          toast.success(data.message);
          // eslint-disable-next-line no-underscore-dangle
          history.push(`/question/${data.data._id}`);
        }
      })
      .catch((err) => {
        toast.warn(err);
      });
  };

  render() {
    const { errors, tags, title, content, category, questionId } = this.state;
    return (
      <div>
        <h2>Edit question</h2>
        <div className="form-group">
          <h5>Title</h5>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            value={title}
            placeholder="Enter your question's title"
            onChange={(e) => {
              this.handleChange(e.target.name, e.target.value);
            }}
          />
          {errors && errors.title && (
            <span style={{ color: 'red' }}> {errors.title} </span>
          )}
        </div>
        <CategoryBox
          handleChange={this.handleChange}
          errors={errors}
          category={category}
        />
        <div className="form-group">
          <h5>Content</h5>
          <MarkDownEditer
            handleChange={this.handleChange}
            errors={errors}
            data={content}
          />
        </div>
        <TagInput
          handleNewTag={this.handleNewTag}
          tags={tags}
          handleRemoveTag={this.handleRemoveTag}
        />
        <div className="col col-btn">
          <button
            type="submit"
            className="btn btn-primary mr-2"
            onClick={this.handleSubmit}
          >
            Save
          </button>
          <Link to={`/question/${questionId}`}>
            <button type="button" className="btn">
              Cancel
            </button>
          </Link>
        </div>
      </div>
    );
  }
}
EditQuestion.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
EditQuestion.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  category: PropTypes.objectOf(PropTypes.string).isRequired,
  questionId: PropTypes.string.isRequired,
  QuestionActionCreators: PropTypes.objectOf().isRequired,
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
});
const mapDispatchToProps = (dispatch) => ({
  QuestionActionCreators: bindActionCreators(questionAction, dispatch),
  ModelActionCreators: bindActionCreators(modalAction, dispatch),
});
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(withConnect, withRouter)(EditQuestion);
