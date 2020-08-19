import React, { Component } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import MarkdownIt from 'markdown-it';
import PropTypes from 'prop-types';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class MarkdownEditer extends Component {
  // eslint-disable-next-line no-unused-vars
  handleEditorChange = ({ html, text }) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.handleChange('content', text);
  };

  handleImageUpload = (file, callback) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const image = reader.result;
      fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/image-upload-single`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image }),
      })
        .then((res) => res.json())
        .then((data) => {
          callback(data.url);
        });
    };
    reader.readAsDataURL(file);
  };

  render() {
    const { errors, data } = this.props;
    return (
      <>
        <MdEditor
          value={data}
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={this.handleEditorChange}
          onImageUpload={this.handleImageUpload}
        />
        {errors && errors.content && (
          <span style={{ color: 'red' }}> {errors.content} </span>
        )}
      </>
    );
  }
}

MarkdownEditer.propTypes = {
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.string.isRequired,
};

export default MarkdownEditer;
