import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Question = (props) => {
  const { title } = props;
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

  const avatar = title.author.avatar ? (
    <img
      src={title.author.avatar}
      className="rounded-circle"
      alt="Cinque Terre"
      width={50}
      height={50}
    />
  ) : (
    <img
      src="https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/86811916/original/5d2499b138522f3486159269b72ca2c7d5ea86f1/illustrate-an-amazing-flat-avatar-for-you.jpg"
      className="rounded-circle"
      alt="Cinque Terre"
      width={50}
      height={50}
    />
  );
  const point =
    title.rating_detail.totalLike - title.rating_detail.totalDislike;

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
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-sm-6 col align-self-center">
                        <a href style={{ color: 'black' }}>
                          <h3>{title.title}</h3>
                        </a>
                      </div>
                      <div className="col-sm-6">
                        <div className="text-right">
                          <h5>
                            <a
                              href
                              className="badge badge-danger"
                              style={{
                                backgroundColor: '#f44336',
                                borderColor: '#f44336',
                              }}
                            >
                              {title.category.name}
                            </a>
                          </h5>
                        </div>
                        <div
                          className="text-right"
                          style={{ marginTop: '0.5em' }}
                        >
                          {title.tags.map((tag) => (
                            <a
                              href
                              className="badge badge-secondary"
                              style={{
                                backgroundColor: '#03a9f4',
                                borderColor: '#03a9f4',
                              }}
                              key={tag.tag_id}
                            >
                              {tag.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{title.content}</p>
                    <a href className="float-right">
                      {avatar}
                      <b style={{ color: 'black', fontSize: '120%' }}>
                        {title.author.display_name}
                      </b>
                    </a>
                  </div>
                </div>
                <div className="text-right">
                  <span style={{ fontSize: '200%' }}>{point}</span>
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
