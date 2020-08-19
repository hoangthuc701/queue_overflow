import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './index.css';

const Question = (props) => {
  const { title } = props;
  const linkTitle = '/question/';
  const linkUser = `/profile/${title.author.author_id}`;
  const { color } = title.category;
  const point =
    title.rating_detail.totalLike - title.rating_detail.totalDislike;
  const headerCard = '#e1f2fb';
  const bodyCard = '#f1f9f9';
  const avatarUrl = `${process.env.REACT_APP_SERVER_DOMAIN}/upload/${title.author.author_id}`;
  const bestAnswered = title.best_answer ? (
    <p
      className="fas fa-check"
      style={{ fontSize: '300%', color: '#4cf760' }}
    />
  ) : (
    <div />
  );

  const totalAnswer = title.answers.length ? (
    <p>
      <b style={{ color: '#bdbdbd' }}>{title.answers.length} answers</b>
    </p>
  ) : (
    <p>
      <b style={{ color: '#bdbdbd' }}>No answers</b>
    </p>
  );

  const avatar = (
    <img
      src={avatarUrl}
      className="rounded-circle avatar"
      alt="Cinque Terre"
      width={200}
      height={2000}
    />
  );
  const vote = point;

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-sm-2"> </div>
          <div className="col-sm-8">
            <hr />
            <div className="row">
              <div className="col-sm-2 align-self-center text-center">
                {bestAnswered}
                {totalAnswer}
              </div>
              <div className="col-sm-10">
                <p>Created {title.created_time}</p>
                <div className="card card-questionlist">
                  <div
                    className="card-header"
                    style={{ backgroundColor: headerCard }}
                  >
                    <div className="row">
                      <div className="col-sm-8 col align-self-center">
                        <Link
                          // eslint-disable-next-line no-underscore-dangle
                          to={`${linkTitle}${title._id}`}
                          style={{ color: 'black' }}
                        >
                          <h5 className="effect-shine">{title.title}</h5>
                        </Link>
                      </div>
                      <div className="col-sm-4">
                        <div className="text-right">
                          <h5>
                            <Link
                              to={`/category/${title.category.category_id}`}
                              className="badge badge-danger"
                              style={{
                                backgroundColor: color,
                                borderColor: '#ffffff',
                                color: '#ffffff',
                              }}
                            >
                              {title.category.name}
                            </Link>
                          </h5>
                        </div>
                      </div>
                    </div>
                    <div className="text-right" style={{ marginTop: '0.5em' }}>
                      {title.tags.map((tag) => (
                        <Link
                          to={`/tag/${tag.tag_id}`}
                          className="badge badge-secondary"
                          style={{
                            backgroundColor: '#03a9f4',
                            borderColor: '#03a9f4',
                            color: '#ffffff',
                          }}
                          key={tag.tag_id}
                        >
                          {tag.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div
                    className="card-body"
                    style={{ backgroundColor: bodyCard }}
                  >
                    <p className="card-text-question">{title.content}</p>
                    <Link to={linkUser} className="float-right">
                      <div className="row">
                        <div className="col-4">
                          <figure>{avatar}</figure>
                        </div>
                        <div className="col-8 d-flex align-items-center">
                          <b style={{ color: 'black', fontSize: '75%' }}>
                            {title.author.display_name}
                          </b>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
                <div className="text-right">
                  <span style={{ fontSize: '200%' }}>{vote}</span>
                  <h5>Votes</h5>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-2"> </div>
        </div>
      </div>
    </div>
  );
};

Question.propTypes = {
  title: PropTypes.string,
};
Question.defaultProps = {
  title: {},
};

export default Question;
