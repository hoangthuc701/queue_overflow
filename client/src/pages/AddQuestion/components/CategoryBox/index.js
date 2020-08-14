import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import CategoryService from '../../../../services/categoryService';

class CategoryBox extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    // CategoryService.getCategory().then((data) => {
    //   this.setState({ list: data });
    // });
  }

  handleChange = (key, value) => {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.handleChange([key], value);
  };

  render() {
    const { list } = this.state;
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
          {list.map((category) => {
            // eslint-disable-next-line no-underscore-dangle
            return <option key={category._id}>{category.name}</option>;
          })}
        </select>
      </div>
    );
  }
}
CategoryBox.propTypes = {
  handleChange: PropTypes.func.isRequired,
};
export default CategoryBox;
