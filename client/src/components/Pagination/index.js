import React from 'react';
import PropTypes from 'prop-types';

const Pagination = (props) => {
  const { postsPerPage, totalPosts, paginate } = props;
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumber.push(i);
  }
  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumber.map((number) => (
            <li key={number} className="page-item">
              <button
                type="button"
                onClick={() => paginate(number)}
                className="page-link"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  postsPerPage: PropTypes.number,
  totalPosts: PropTypes.number,
  paginate: PropTypes.func,
};
Pagination.defaultProps = {
  postsPerPage: 0,
  totalPosts: 0,
  paginate: null,
};

export default Pagination;
