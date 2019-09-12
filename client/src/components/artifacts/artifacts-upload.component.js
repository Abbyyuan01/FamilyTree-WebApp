import React, { Component } from 'react';
import axios from 'axios';

class ArtifactUpload extends Component {

  state = {
    selectedFile : null
  }
  fileSelectedHandler = event => {
    this.setState({
      seleectedFile: event.target.files[0]
    })
  }

  fileUploadHandler = () => {
    const newInput = new FormData();

    
    newInput.append('image',this.state.selectedFile, this.state.selectedFile.name);

    axios.post('http://localhost:5000/artifacts/', newInput)
      .then(res => {
        console.log(res);
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