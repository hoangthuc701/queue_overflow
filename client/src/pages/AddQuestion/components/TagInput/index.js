/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Tag from './Tag';

class TagInput extends Component {
  constructor() {
    super();
    this.myRef = React.createRef();
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // process new tag
      let newTag = e.target.value;
      newTag = newTag.toUpperCase();
      const array = newTag.split(' ');
      const arrayWord = array.filter((x) => x);
      newTag = arrayWord.join(' ');
      // eslint-disable-next-line react/destructuring-assignment
      this.props.handleNewTag(newTag);
      // clear text box
      this.myRef.current.value = '';
    }
  };

  handleRemoveTag = (tag) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.handleRemoveTag(tag);
  };

  render() {
    // eslint-disable-next-line react/destructuring-assignment
    const tagList = this.props.tags;
    return (
      <div className="form-group">
        <label htmlFor="tag">
          <h5>Tag</h5>
        </label>
        <input
          ref={this.myRef}
          type="text"
          name="tag"
          className="form-control"
          id="tag"
          placeholder="Search or enter your question's tag"
          onKeyPress={this.handleKeyPress}
        />
        <div className="mt-2">
          {tagList.map((tag, index) => {
            return (
              <Tag
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                content={tag}
                handleRemoveTag={this.handleRemoveTag}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleNewTag: PropTypes.func.isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
};

export default TagInput;
