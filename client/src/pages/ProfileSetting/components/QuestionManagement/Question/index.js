import React from 'react';
import PropTypes from 'prop-types';

const Question = ({ title, time, category }) => {
  return (
    <>
      <tr>
        <td>
          <a href className="question_info" style={{ wordWrap: 'break-word' }}>
            <h3 className="question">{title}</h3>
          </a>
          <h4>{time}</h4>
        </td>
        <td>
          <h4>
            <a href className="badge badge-warning">
              {category}
            </a>
          </h4>
        </td>
        <td>
          <a href className="mr-2">
            <img src="https://i.ibb.co/RNWjm8H/pencil.png" alt="" />
          </a>
          <a href>
            <img src="https://i.ibb.co/hgYsCP1/delete.png" alt="" />
          </a>
        </td>
      </tr>
    </>
  );
};

Question.propTypes = {
  title: PropTypes.string,
  time: PropTypes.string,
  category: PropTypes.string,
};

Question.defaultProps = {
  title: '',
  time: '',
  category: '',
};

export default Question;
