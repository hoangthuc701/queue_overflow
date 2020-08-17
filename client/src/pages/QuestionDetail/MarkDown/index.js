import React from 'react';
import PropTypes from 'prop-types';

const ReactMarkdown = require('react-markdown');

const Markdown = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const input = props.content;
  return (
    <>
      <ReactMarkdown source={input} className="result" />
    </>
  );
};

Markdown.propTypes = {
  content: PropTypes.string.isRequired,
};
export default Markdown;
