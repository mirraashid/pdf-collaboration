export default class PDFJs {
    constructor() {
      this.iframe = null;
    }

    init = (source, initial, element, openNewPostPopup, openViewPostPopup) => {
      this.iframe = document.createElement('iframe');
  
      this.iframe.src = `/customized-pdfjs/web/viewer.html?file=${source}`;
      this.iframe.width = '100%';
      this.iframe.height = '100%';
      this.iframe.style = "border-width: 0;";
  
      element.appendChild(this.iframe);

      window.onmessage = function(e){
        var data = e.data;
        if(typeof data === 'object')
        {
          switch(data.type)
          {
            case 'newPostRequest':
              //open popup
              openNewPostPopup(data);
              break;
            // case 'ready':
            //   this.iframe.contentWindow.postMessage({
            //     type: 'setPost',
            //     posts: initial
            //   }, '*');
            //   break;
            case 'viewPost':
              openViewPostPopup(data.post);
              break;
            default:
              break;
          }
        }
      }.bind(this);
    }
    newPost = (comment, data) => {
      if(this.iframe != null)
      {
        this.iframe.contentWindow.postMessage({
          type: 'newPost',
          page: data.page,
          x: data.x, y: data.y,
          post: comment
        }, '*');
      }
    }
    hideAllPosts = () => {
      this.iframe.contentWindow.postMessage({
        type: 'setPost',
        posts: []
      }, '*');
    }
    showAllPosts = (postArray) => {
      
      setTimeout(() => {
        this.iframe.contentWindow.postMessage({
          type: 'setPost',
          posts: postArray
        }, '*');
      }, 1500);
      
    }
  }