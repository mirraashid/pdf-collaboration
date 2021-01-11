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

export default class ViewPostPopup extends React.Component {

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
        <div className="viewPostModal">
          <div className="modalContainer">
            <div className="modalHeader">
              <div className="modalSubHeader">
                <img className="avatar" src='https://www.w3schools.com/howto/img_avatar.png' alt='' />
                <div className="nameInfo">
                  <div className="name">{this.props.post.user && this.props.post.user.name  || 'user'}</div>
                  <div>@حسابي</div>
                </div>
              </div>
              <div className="timeInfo">
              {this.props.post.datetime}
              </div>
            </div>
            <div className="modalMain">
              {this.props.post.description}
            </div>
          </div>
        </div>
      </ReactModal>
    )
  }
}