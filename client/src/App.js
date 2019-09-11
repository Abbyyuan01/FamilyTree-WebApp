import React, { Component } from 'react';
import logo from './logo.svg';
import Main from './Main'
import './App.css';
import axios from 'axios';

// class App extends Component {

//   state = {
//     selectedFile : null
//   }
//   fileSelectedHandler = event => {
//     this.setState({
//       seleectedFile: event.target.files[0]
//     })
//   }

//   // fileUploadHandler = () => {
//   //   axios.post('')
//   // };

//   render() {


//     return (
//         <div className="App">
//           <input type="file" onChange={this.fileSelectedHandler}/>
//           <button onClick={this.fileUploadHandler}>Upload</button>
//         </div>
//     );
//   }



function App() {
  return (
    <div className="container">
      <Main />
    </div>
  );
}

export default App;
