import React, { Component } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import PropTypes from 'prop-types';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class MarkdownEditer extends Component {
  // Finish!
  constructor() {
    super();
    this.state = {
      content: '',
    };
  }

  // eslint-disable-next-line no-unused-vars
  handleEditorChange = ({ html, text }) => {
    this.setState({ content: text });
    // eslint-disable-next-line react/destructuring-assignment
    this.props.handleChange('content', text);
  };

  render() {
    const { content } = this.state;
    return (
      <MdEditor
        value={content}
        style={{ height: '500px' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={this.handleEditorChange}
      />
    );
  }
}

MarkdownEditer.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default MarkdownEditer;
