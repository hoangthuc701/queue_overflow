import React from 'react';
import PropTypes from 'prop-types';

const Question = (props) => {
  const { title } = props;
  return (
    <div>
      <div>
        <div className="row">
          <div className="col-sm-2"> </div>
          <div className="col-sm-8">
            <hr />
            <div className="row">
              <div className="col-sm-2 align-self-center text-center">
                <p
                  className="fas fa-check"
                  style={{ fontSize: '300%', color: '#4cf760' }}
                />
                <p>
                  <b style={{ color: '#bdbdbd' }}>title.answered answers</b>
                </p>
              </div>
              <div className="col-sm-10">
                <text>Created title.created</text>
                <div className="card">
                  <div className="card-header">
                    <div className="row">
                      <div className="col-sm-6 col align-self-center">
                        <a href style={{ color: 'black' }}>
                          <h3>title.titles</h3>
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
                              title.category
                            </a>
                          </h5>
                        </div>
                        <div
                          className="text-right"
                          style={{ marginTop: '0.5em' }}
                        >
                          {/* {title.TAG.map((tag) => (
                            <a
                              href
                              className="badge badge-secondary"
                              style={{
                                backgroundColor: '#03a9f4',
                                borderColor: '#03a9f4',
                              }}
                              key={tag.toString()}
                            >
                              {tag}
                            </a>
                          ))} */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    <p className="card-text">title.content</p>
                    <a href className="float-right">
                      <img
                        src="title.avartar"
                        className="rounded-circle"
                        alt="Cinque Terre"
                        width={50}
                        height={50}
                      />
                      <b style={{ color: 'black', fontSize: '120%' }}>
                        title.name
                      </b>
                    </a>
                  </div>
                </div>
                <div className="text-right">
                  <span style={{ fontSize: '200%' }}>title.like</span>
                  <a
                    href
                    className="fas fa-chevron-up"
                    style={{
                      fontSize: '200%',
                      marginLeft: '0.5em',
                      color: 'black',
                    }}
                  >
                    {' '}
                  </a>
                  <a
                    href
                    className="fas fa-chevron-down"
                    style={{
                      fontSize: '200%',
                      marginLeft: '0.2em',
                      color: 'black',
                    }}
                  >
                    {' '}
                  </a>
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
  plainObj: PropTypes.shape({ subProp: PropTypes.string })
};
Question.defaultProps = {
  title: {},
};

export default Question;
