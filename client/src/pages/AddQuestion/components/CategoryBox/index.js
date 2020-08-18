import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CategoryService from '../../../../services/categoryService';

class CategoryBox extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    CategoryService.getCategory().then((data) => {
      if (data.data) {
        this.setState({ list: data.data });
      }
    });
  }

  handleChange = (key, value) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.handleChange([key], value);
  };

  render() {
    const { list } = this.state;
    const { errors } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="category">
          {' '}
          <h5> Category </h5>{' '}
        </label>
        <select
          className="form-control"
          name="category"
          id="category"
          onBlur={(e) => this.handleChange(e.target.name, e.target.value)}
        >
          <option value=""> </option>

          {list.map((category) => {
            return (
              // eslint-disable-next-line no-underscore-dangle
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
        {errors && errors.category && (
          <span style={{ color: 'red' }}> {errors.category} </span>
        )}
      </div>
    );
  }
}
CategoryBox.propTypes = {
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default CategoryBox;
