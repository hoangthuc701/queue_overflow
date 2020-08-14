import React from 'react';
const Question = ({}) => {
  return (
    <>
      <tr>
        <td>
          <a href="#" className="question_info">
            <h3 className="question">
              Running a job during specified time of the day
            </h3>
          </a>
          <h4>2020-07-28 12:50:30</h4>
        </td>
        <td>
          <h4>
            <a href="#" className="badge badge-warning">
              JAVA
            </a>
          </h4>
        </td>
        <td>
          <a href="#" className="mr-2">
            <img src="https://i.ibb.co/RNWjm8H/pencil.png" />
          </a>
          <a href="#">
            <img src="https://i.ibb.co/hgYsCP1/delete.png" />
          </a>
        </td>
      </tr>
    </>
  );
};

export default Question;
