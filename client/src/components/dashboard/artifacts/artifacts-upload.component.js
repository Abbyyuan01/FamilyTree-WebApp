/*
  **component for upload artifacts
  **including select image and upload description form
 */
import React, { Component } from 'react';
import axios from 'axios';
import 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import Image from 'material-ui-image';
import { connect } from "react-redux";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = theme => ({
  container: {
    margin: 8,
    marginTop: 24,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400,
  },
  imagePreview: {
    margin: 10,
    width: 30,
    height: 30,
  },
});


class ArtifactUpload extends Component {
  constructor( props ) {
    super( props );
    this.state = {
     selectedFile: null,
     bloburl:null,
     name : '',
    //  Please enter name of artifact here
     description : null,
     tag : '',
    //  Please enter tag here
     category : null,
     artifactTime : new Date(),
     user: null,
     visibility : null
    }
   }


  fileSelectedHandler = event => {
    this.setState({
      bloburl: URL.createObjectURL(event.target.files[0]),
      selectedFile: event.target.files[0]
    })
    // console.log(this.props.auth.user.id)
  };

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    })
    console.log(this.state.name)
    // setValues({...values,[name]: event.target.value});
  };

  handleTimeChange = event => {
    this.setState ({
      artifactTime: event.target.value
    });
  };

  handleTagChange = event => {
    this.setState ({
      tag: event.target.value
    });
  }

  handleDesChange = event => {
    this.setState ({
      description: event.target.value
    });
  }

  fileUploadHandler = () => {
    const newInput = new FormData();

    // If file selected
    if ( this.state.selectedFile ) {
      newInput.append( 'image', this.state.selectedFile);
      newInput.append( 'name', this.state.name);
      newInput.append( 'description', this.state.description);
      newInput.append( 'tag', this.state.tag);
      newInput.append( 'artifactTime', this.state.artifactTime);
      newInput.append('user', this.props.auth.user.id)

      axios.post('/uploadArtifacts/', newInput, {
        headers: {
          'accept': 'application/json',
          'Content-Type':  `multipart/form-data; boundary=${newInput._boundary}`,
        }
        })
        .then(res => {
          console.log(res);
          console.log("newInput")
          console.log(this.context)
          console.log(this.state)
        }).catch(err=>{
          console.log(err)
        });

    }else{
      console.log('Please upload file')
    }

  };

  render() {
    const { classes, theme } = this.props;
    const { user } = this.props.auth;

    return (
      <div className="artifact">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="artifactName"
            label="Artifact Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleNameChange}
            margin="normal"
          />
          <input type="file" onChange={this.fileSelectedHandler}/>
          <Image src={this.state.bloburl} alt="unable to display" className={classNames(classes.imagePreview)}/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="ArtifactDate"
              label="Artifact Date"
              value={this.state.artifactTime}
              onChange={this.handleTimeChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <TextField
            id="artifactTag"
            label="Tag"
            className={classes.textField}
            value={this.state.tag}
            onChange={this.handleTagChange}
            margin="normal"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            value={this.state.description}
            onChange={this.handleDesChange}
            className={classes.textField}
            margin="normal"
            helperText="Please enter description above"
            variant="outlined"
          />
        </form>
        <button onClick={this.fileUploadHandler}>Submit</button>
      </div>

    );
  }
}

ArtifactUpload.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps)(withStyles(useStyles, { withTheme: true })(ArtifactUpload));

// export default withStyles(useStyles, { withTheme: true })(ArtifactUpload);