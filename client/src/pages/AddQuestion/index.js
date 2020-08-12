/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from 'react';

import MarkDownEditer from './components/MarkdownEditer';

import './index.css';

import CategoryBox from './components/CategoryBox';
import TagInput from './components/TagInput';
import QuestionService from '../../services/questionService';

class AddQuestionPage extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
    };
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
    const { title, category, tags, content } = this.state;
    QuestionService.createNewQuestion(
      title,
      category,
      content,
      tags
    ).then(() => {});
  };

  render() {
    const { tags } = this.state;
    return (
      <>
        <h2>Create new question</h2>
        <div className="form-group">
          <label htmlFor="title">
            <h5>Title</h5>
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            id="title"
            placeholder="Enter your question's title"
            onChange={(e) => {
              this.handleChange(e.target.name, e.target.value);
            }}
          />
        </div>
        <CategoryBox handleChange={this.handleChange} />
        <div className="form-group">
          <label htmlFor="content">
            <h5>Content</h5>
          </label>
          <MarkDownEditer handleChange={this.handleChange} />
        </div>
        <TagInput
          handleNewTag={this.handleNewTag}
          tags={tags}
          handleRemoveTag={this.handleRemoveTag}
        />
        <div className="col col-btn">
          <button type="submit" className="btn btn-primary mr-2">
            Post
          </button>
          <button type="button" className="btn">
            Cancel
          </button>
        </div>
      </>
    );
  }
}

export default AddQuestionPage;
