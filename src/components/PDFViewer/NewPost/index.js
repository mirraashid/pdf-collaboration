import React from 'react';
import ReactModal from 'react-modal';
import './style.scss';

const modalStyle = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }
};

export default class NewPostPopup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  componentDidMount() {
  }

  cancelModel() {
    this.setState({ comment: '' });
    this.props.closeModalHandler();
  }

  closeModal(comment) {
    this.setState({ comment: '' });
    this.props.closeModalHandler(comment);
  }

  render() {
    return (
      <ReactModal
        isOpen={this.props.isModalOpen}
        style={modalStyle}
        onRequestClose={this.cancelModel.bind(this)}
        ariaHideApp={false}>
        <div className="newPostModal">
          <div className="modalContainer">
            <div className="modalHeader">
              <button className="backButton" onClick={() => { this.closeModal(); }}>→</button>
              <button className="commentButton" onClick={() => { this.closeModal(this.state.comment); }}>اترك نقطة</button>
            </div>
            <div className="modalMain">
              <img className="avatar" src='https://www.w3schools.com/howto/img_avatar.png' alt='' />
              <textarea className="whatText"
                value={this.state.comment}
                onChange={(event) => {
                  this.setState({
                    comment: event.target.value
                  });
                }}
              >
              </textarea>
            </div>
          </div>
        </div>
      </ReactModal>
    )
  }
}