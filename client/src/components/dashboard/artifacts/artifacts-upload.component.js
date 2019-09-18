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

  state = {
    name : null,
    url : null,
    description : null,
    editTime : null,
    tag : null,
    category : null,
    artifactTime : null,
    userID : null,
    visibility : null
  }

  fileSelectedHandler = event => {
    this.setState({
      url: URL.createObjectURL(event.target.files[0])
    })
  }

  fileUploadHandler = () => {
    const newInput = new FormData();
    newInput.append('image',this.state.url);
    axios.post('http://localhost:5000/uploadArtifacts/', newInput)
      .then(res => {
        console.log(res);
        console.log("successful!")
      }).catch(err=>{
        console.log(err)
      });

  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className="artifact">
        <form className={classes.container} noValidate autoComplete="off">
          <TextField
            id="artifactName"
            label="Artifact Name"
            className={classes.textField}
            value={this.state.name}
            margin="normal"
          />
          <input type="file" onChange={this.fileSelectedHandler}/>
          <Image src={this.state.url} alt="unable to display" className={classNames(classes.imagePreview)}/>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="ArtifactDate"
              label="Artifact Date"
              value={this.state.artifactTime}
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
            margin="normal"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            value={this.state.description}
            className={classes.textField}
            margin="normal"
            helperText="Please enter description above"
            variant="outlined"
          />
        </form>
        <button onClick={this.fileUploadHandler}>Upload</button>
      </div>

    );
  }
}

ArtifactUpload.propTypes = {
classes: PropTypes.object.isRequired,
theme: PropTypes.object.isRequired
};

export default withStyles(useStyles, { withTheme: true })(ArtifactUpload);