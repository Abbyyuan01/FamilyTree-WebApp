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
    name : 'Please enter name of artifact here',
    url : null,
    description : null,
    tag : 'Please enter tag here',
    category : null,
    artifactTime : new Date(),
    visibility : null
  }

  fileSelectedHandler = event => {
    this.setState({
      url: URL.createObjectURL(event.target.files[0])
    })
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    })
    // setValues({...values,[name]: event.target.value});
  };

  handleTimeChange = date => {
    this.setState ({
      artifactTime: date
    });
  };

  fileUploadHandler = () => {
    //const newInput = new FormData();
    //newInput.append('url',url);

    axios.post('/uploadArtifacts/', this.state)
      .then(res => {
        console.log(res);
        console.log("newInput")
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
            onChange={this.handleChange('name')}
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
            onChange={this.handleChange('tag')}
            margin="normal"
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            multiline
            rowsMax="4"
            value={this.state.description}
            onChange={this.handleChange('description')}
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
theme: PropTypes.object.isRequired
};

export default withStyles(useStyles, { withTheme: true })(ArtifactUpload);