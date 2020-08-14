import React, { Component } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import 'react-markdown-editor-lite/lib/index.css';
import CommentValidator from '../../../validators/comment';
import answerAction from '../../../actions/answer';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class AnswerEditer extends Component {
  // Finish!
  constructor() {
    super();
    this.state = {
      content: '',
      errors: {},
    };
  }

  // eslint-disable-next-line no-unused-vars
  handleEditorChange = ({ html, text }) => {
    this.setState({ content: text });
    // eslint-disable-next-line react/destructuring-assignment
  };

  handleSubmit = async () => {
    const { content } = this.state;
    const errors = CommentValidator(content);
    this.setState({ errors });
    if (Object.keys(errors).length > 0) return;
    const { AnswerActionCreators, questionId } = this.props;
    const result = await AnswerActionCreators.createNewAnswer(
      questionId,
      content
    );
    if (result) this.setState({ content: '' });
  };

  render() {
    const { content, errors } = this.state;
    return (
      <>
        <MdEditor
          value={content}
          style={{ height: '200px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
        />
        {errors && errors.content && (
          <span style={{ color: 'red' }}> {errors.content} </span>
        )}
        <button
          type="button"
          className="btn btn-primary float-right mt-3"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </>
    );
  }
}
AnswerEditer.propTypes = {
  AnswerActionCreators: PropTypes.objectOf().isRequired,
  questionId: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => ({
  // eslint-disable-next-line no-underscore-dangle
  questionId: state.question._id,
});
const mapDispatchToProps = (dispatch) => ({
  AnswerActionCreators: bindActionCreators(answerAction, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnswerEditer);
