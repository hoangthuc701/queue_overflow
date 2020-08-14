import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import modalAction from '../../actions/modal';

const Model = () => {
  const model = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const { show, content, title } = model;

  const handleHide = () => {
    dispatch(modalAction.hideModal(false));
  };
  const handleConfirm = () => {
    dispatch(modalAction.hideModal(true));
  };
  if (show) {
    return (
      <div
        className={`modal fade ${show ? 'show' : ''} `}
        id="exampleModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleModalLabel"
        style={{ display: 'block', paddingRight: '17px' }}
        aria-hidden={!show}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {' '}
                {title}{' '}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={handleHide}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">{content}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleConfirm}
              >
                Confirm
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={handleHide}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return <> </>;
};

export default Model;
