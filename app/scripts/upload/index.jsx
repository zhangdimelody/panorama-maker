import React from 'react'
import ReactDOM from 'react-dom'

let upload = class Upload extends React.Component {
  // mixins: [FormData]

  constructor(props, context) {
    super(props, context);
    
    this.state = {
      data_uri: null,
      processing: false,
    }

    // bindAll(this, 'handleFile', 'handleSubmit')
  }
 
  ajax(option) {
    let data, dataType, key, method, request;
    if (!option.url) {
      throw new Error('Need for url');
    }
    // dataType = option.dataType || 'text';
    method = option.method || 'GET';
    data = '';
    // if (!!option.data && typeof option.data !== 'string') {
    //   for (key in option.data) {
    //     data += key + "=" + option.data[key] + "&";
    //   }
    //   data = data.slice(0, data.length - 1);
    // } else {
    //   data = option.data;
    // }
    request = new XMLHttpRequest();
    request.open(method, option.url, true);
    if (method.toUpperCase() === 'POST') {
      request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
    }
    request.onload = function() {
      let result;
      if (typeof option.success === "function") {
        option.success(JSON.parse(request.responseText));
      }
    };
    request.send(option.data);
  }

  submit() {

    let formdata = new window.FormData(document.forms.namedItem("uploadForm"));
    let xhr = new XMLHttpRequest();

    xhr.open('POST','/uploadimage',true);
    xhr.send(formdata);
    xhr.onload = function(e){
      let resp = JSON.parse(e.currentTarget.responseText)
      this.props.changeMaterial(resp.msg.url)
    }.bind(this)

  }

  
  render() {
    
    return (
      <form name="uploadForm" id="uploadForm" ref="uploadForm" action="javascript:void(0)" method="post" enctype="multipart/form-data" onSubmit={this.submit.bind(this)} style={{ position: "absolute", top: "40px" }} >
        <input ref="pic" type="file" name="files" />
        <input type="submit" value="提交" />
      </form>
      )
  }
}

module.exports = upload;

// ReactDOM.render(<Upload/>, document.getElementById('upload'))
