import React from 'react';
import NewPostPopup from './NewPost';
import ViewPostPopup from './ViewPost';
import firebase from 'firebase'
import 'firebase/auth'
import "firebase/database"

import {convertFirebasePDOtoArray} from '../../helpers/helper';

export default class PDFViewer extends React.Component {
  constructor(props) {
    super(props);
    this.viewerRef = React.createRef();
    this.backend = new props.backend();

    this.state = {
      isNewPostPopup: false,
      postData: {},
      isViewPostPopup: false,
      viewData: {},
      commentData: []
    };
  }

  componentDidMount() {
    const { src, initial } = this.props;
    const element = this.viewerRef.current;

    this.backend.init(src, initial, element, this.openNewPostPopup.bind(this), this.openViewPostPopup.bind(this));
    this.initCommentsData();
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if (this.props.displayStatus !== prevProps.displayStatus || this.state.commentData !== prevState.commentData) {
      !this.props.displayStatus ? this.backend.hideAllPosts() : this.backend.showAllPosts(this.state.commentData)
    }
  }

  /**
   * Init Comments data from firbase
   * @author Rashid
   */

  initCommentsData = () => {
    const bookUid = this.props.uId;
    return firebase.database().ref('/commentsData/' + bookUid).once('value').then((snapshot) => {
      let commentData = (snapshot.val() && convertFirebasePDOtoArray(snapshot.val())) || [];
      this.setState({commentData});
    });
  }


  /**
   * DataChange listener from firabase specific to book uId
   * @author Rashid
   */
  syncCommentData = () => {
    const bookUid = this.props.uId;

    var commentsDataDB = firebase.database().ref('commentsData/' + bookUid);
    commentsDataDB.on('value', (snapshot) => {
      const data = snapshot.val();
       if(data){
         this.setState({commentData:convertFirebasePDOtoArray(data)})
       }
    });
  }


  /**
   * Posts comment data to Firebase specific to book uId
   * @author Rashid
   */
  postCommentData = (data) => {

    const bookUid = this.props.uId;

    //construct input PDO
    const pdoObj = {
      page: data.page,
      x: data.x,
      y: data.y, 
      post: {
        description: data.comment,
        datetime: new Date().toLocaleString(),
        user: this.props.user
      }
    }

    const newDataKey = firebase.database().ref().child('commentsData/' + bookUid).push().key

    firebase.database().ref('commentsData/' + bookUid + '/' + newDataKey).set(
     pdoObj
    , (err) => {
        if (err) {
            // The write failed...
            alert('Failed to save comment. Please try again!')
          } else {
            // Data saved successfully!
            this.syncCommentData()
          }
    });
  }

  openNewPostPopup(data) {
  	this.setState({isNewPostPopup: true, postData: data});
  }

  closeNewPostPopup(comment) {
    this.setState({isNewPostPopup: false});
    if(comment !== undefined && comment !== '')
    {
      //push comment to database
      const postData = this.state.postData
      this.postCommentData({comment: comment, page: postData.page, x: postData.x, y: postData.y});
    }
  }

  openViewPostPopup(data) {
  	this.setState({isViewPostPopup: true, viewData: data});
  }

  closeViewPostPopup() {
    this.setState({isViewPostPopup: false});
  }
  

  render() {
    return (
      <div ref={this.viewerRef} id='viewer' style={{ width: '100%', height: '100%' }}>
        <NewPostPopup 
          isModalOpen={this.state.isNewPostPopup}
          closeModalHandler={this.closeNewPostPopup.bind(this)}>
        </NewPostPopup>
        <ViewPostPopup 
          isModalOpen={this.state.isViewPostPopup}
          closeModalHandler={this.closeViewPostPopup.bind(this)}
          post={this.state.viewData}>
        </ViewPostPopup>
      </div>
    )
  }
}