import React, { Component } from 'react';
import axios from 'axios';

class ArtifactUpload extends Component {

  state = {
    selectedFile : null
  }
  fileSelectedHandler = event => {
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const newInput = new FormData();


    newInput.append('image',this.state.selectedFile, this.state.selectedFile.name);
    axios.post('http://localhost:5000/uploadArtifacts/', newInput)
      .then(res => {
        console.log(res);
        console.log("successful!")
      }).catch(err=>{
        console.log(err)
      });

  };

  render() {
    return (
        <div className="ArtifactUpload">
          <input type="file" onChange={this.fileSelectedHandler}/>
          <button onClick={this.fileUploadHandler}>Upload</button>
        </div>
    );
  }
}

export default ArtifactUpload;