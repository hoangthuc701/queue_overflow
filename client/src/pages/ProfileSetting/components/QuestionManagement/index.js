import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const QuestionManagement = () => {
  return (
    <div className="tab-pane" role="tabpanel" id="menu2">
      <table className="table table-borderless table-hover">
        <thead>
          <tr>
            <th scope="col">
              <h2>Title</h2>
            </th>
            <th scope="col">
              <h2>Category</h2>
            </th>
            <th scope="col">
              <h2>Edit</h2>
            </th>
          </tr>
        </thead>
        <tbody>
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
          <tr>
            <td>
              <a href="#" className="question_info">
                <h3 className="question">
                  views Panda "to_date_time" not accepting series
                </h3>
              </a>
              <h4>2020-07-28 12:50:30</h4>
            </td>
            <td>
              <h4>
                <a href="#" className="badge badge-warning">
                  C++
                </a>
              </h4>
            </td>
            <td>
              <a href="#" className="mr-2">
                <img src="https://i.ibb.co/RNWjm8H/pencil.png" />
              </a>
              <a href="#" className>
                <img src="https://i.ibb.co/hgYsCP1/delete.png" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#" className="question_info">
                <h3 className="question">
                  Setup a cron on a bash scrips but its not running
                </h3>
              </a>
              <h4>2020-07-28 12:50:30</h4>
            </td>
            <td>
              <h4>
                <a href="#" className="badge badge-warning">
                  NODEJS
                </a>
              </h4>
            </td>
            <td>
              <a href="#" className="mr-2">
                <img src="https://i.ibb.co/RNWjm8H/pencil.png" />
              </a>
              <a href="#" className>
                <img src="https://i.ibb.co/hgYsCP1/delete.png" />
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#" className="question_info">
                <h3 className="question">
                  Connect android device to python project via socket
                </h3>
              </a>
              <h4>2020-07-28 12:50:30</h4>
            </td>
            <td>
              <h4>
                <a href="#" className="badge badge-warning">
                  C#
                </a>
              </h4>
            </td>
            <td>
              <a href="#" className="mr-2">
                <img src="https://i.ibb.co/RNWjm8H/pencil.png" />
              </a>
              <a href="#" className>
                <img src="https://i.ibb.co/hgYsCP1/delete.png" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">«</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              5
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">»</span>
              <span className="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default QuestionManagement;
