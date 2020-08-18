/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tag extends Component {
  handleRemove = (content) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.handleRemoveTag(content);
  };

  render() {
    const { content } = this.props;

    return (
      <span className="btn-group mr-2 mt-2">
        <button type="button" className="btn tag btn-info">
          <span>{content}</span>
          <button
            type="button"
            className="close"
            onClick={this.handleRemove.bind(this, content)}
          >
            ×
          </button>
        </button>
      </span>
    );
  }
}

Tag.propTypes = {
  content: PropTypes.string.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
};

export default Tag;
