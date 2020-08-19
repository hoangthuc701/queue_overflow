import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ModelActionCreators from '../../../../../actions/modal';

const Question = ({ id, title, time, categoryId, category }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {
    dispatch(
      ModelActionCreators.showModal(
        'Confirm Delete',
        'Do you want to delete this question?',
        'question',
        id
      )
    );
  };
  return (
    <>
      <tr className="row">
        <td className="col-7">
          <Link
            to={`/question/${id}`}
            className="question_info"
            style={{ wordBreak: 'break-all' }}
          >
            <h4 style={{ color: 'black' }}>{title}</h4>
            <div style={{ color: 'black' }}>{time}</div>
          </Link>
        </td>
        <td className="col-3 d-flex justify-content-center">
          <h4>
            <Link
              to={`/category/${categoryId}`}
              className="badge badge-warning p-2"
            >
              {category}
            </Link>
          </h4>
        </td>
        <td className="col-1">
          <Link to={`/question/edit/${id}`} className="ml-3">
            <img src="https://i.ibb.co/RNWjm8H/pencil.png" alt="edit" />
          </Link>
        </td>
        <td className="col-1">
          <button type="button" onClick={handleDelete}>
            <img src="https://i.ibb.co/hgYsCP1/delete.png" alt="delete" />
          </button>
        </td>
      </tr>
    </>
  );
};

Question.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  categoryId: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};

export default Question;
