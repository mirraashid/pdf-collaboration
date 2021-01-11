import React, {useContext, useEffect, useState} from 'react';
import PDFViewer from '../components/PDFViewer/PDFViewer';
import PDFJSBackend from '../backends/pdfjs';
import { useParams } from "react-router-dom";
import {CommentContext} from '../App';
import {useUser} from 'reactfire';

const BookViewer = () => {
  let { bookUid } = useParams();
  const commentStatus = useContext(CommentContext);
  const user = useUser().data;
  const userData = {
    uid: user && user.uid,
    name: user && user.displayName
  }
  const initialData = [];

   return (userData && <PDFViewer 
          backend={PDFJSBackend}
          src={'/' + bookUid + '.pdf'}
          initial={initialData}
          displayStatus={commentStatus}
          uId={bookUid}
          user={userData}
        />
   )
}

export default BookViewer;