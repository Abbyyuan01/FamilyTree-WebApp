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
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip';
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

class ArtifactUpload extends Component {
  constructor( props ) {
    super( props );
    this.state = {
     selectedFile: null,
     bloburl:null,
     name : '',
    //  Please enter name of artifact here
     description : null,
    //  Please enter tag here
     category : ' ',
     artifactTime : new Date(),
     user: null,
     visibility : [],
     username: []
    }
   }

   componentDidMount() {
    axios.get('/users')
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            username: res.data.map(user => user.username),
          })
        }
      }).catch((err) => {
        console.log(err);
    })
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

  handleVisibilityChange = event => {
    this.setState({
      visibility: event.target.value
    });
    console.log(this.state.visibility);
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
      newInput.append( 'category', this.state.category);
      newInput.append( 'artifactTime', this.state.artifactTime);
      newInput.append('user', this.props.auth.user.id);
      newInput.append('visibility',this.state.visibility);

      axios.post('/uploadArtifacts', newInput, {
        headers: {
          'accept': 'application/json',
          'Content-Type':  `multipart/form-data; boundary=${newInput._boundary}`,
        }
        })
        .then(res => {
          console.log(res);
          console.log("newInput")
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
            id="artifactCategory"
            label="Category"
            className={classes.textField}
            value={this.state.category}
            onChange={this.handleTagChange}
            margin="normal"
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="select-multiple-chip">Visibility</InputLabel>
            <Select
              multiple
              value={this.state.visibility}
              onChange={this.handleVisibilityChange}
              input={<Input id="select-multiple-chip" />}
              renderValue={selected => (
                <div className={classes.chips}>
                  {selected.map(value => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {this.state.username.map(name => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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