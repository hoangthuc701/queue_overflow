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

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps) {
  //     this.setState({
  //       category: nextProps.category.category_id,
  //     });
  //   }
  //   console.log(nextProps.category);
  // }

  handleChange = (key, value) => {
    // eslint-disable-next-line react/destructuring-assignment
    // this.setState({
    //   category:value,
    // });
    //console.log(this.state.category);
    this.props.handleChange([key], value);
    console.log(value);
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
          value={this.props.category}
          onChange={(e) => this.handleChange(e.target.name, e.target.value)}
        >
          {list.map((e) => {
            return (
              // eslint-disable-next-line no-underscore-dangle
              <option key={e._id} value={e._id}>
                {e.name}
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
