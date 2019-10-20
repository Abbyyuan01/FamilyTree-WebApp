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
import {
  Grid,
  Button,
  Checkbox,
  Chip,
  Select,
  Input,
  TextField,
  InputLabel,
  FormLabel,
  MenuItem,
  FormGroup,
  FormControl,
  FormControlLabel,
} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { connect } from "react-redux";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = theme => ({
  root: {
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.primary.lightest,
    height:1200
  },
  container: {
    margin: theme.spacing(2),
    marginTop: 24,
    borderRadius: '16',
  },
  textField: {
    margin: theme.spacing(2),
    display: 'flex',
    maxWidth: 300,
  },
  descriptionField :{
    margin: theme.spacing(2),
    display: 'flex',
    maxWidth: 500,
  },
  img: {
    margin: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 300,
    maxWidth: 350,
  },
  chips: {
    margin: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: theme.spacing(2),
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


class ArtifactUpload extends Component {
  constructor( props ) {
    super( props );
    this.state = {
     selectedFile: null,
     bloburl:null,
     name : '',
     description : null,
     category : null,
     categoryValue: {Pet: false,Instruments: false, Others: false},
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

  handleTimeChange = date => {
    this.setState ({
      artifactTime: date
    });
  };

  handleCategoryPChange = event => {
    this.setState ({
      category: event.target.value,
      ...this.state.categoryValue.Pet = event.target.checked
    });
  };

  handleCategoryIChange = event => {
    this.setState ({
      category: event.target.value,
      ...this.state.categoryValue.Instruments = event.target.checked
    });
  };

  handleCategoryOChange = event => {
    this.setState ({
      category: event.target.value,
      ...this.state.categoryValue.Others = event.target.checked
    });
  };

  handleVisibilityChange = event => {
    this.setState({
      visibility: event.target.value
    });
    console.log(this.state.visibility);
  };

  handleDesChange = event => {
    this.setState ({
      description: event.target.value
    });
  };

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
          alert("Artifact upload successfully! Please return View Page!!!");
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
      <div className={classes.root}>
        <form className={classes.container} autoComplete="on">
          <Grid container alignItems="center" justify="center" spacing={0}>
            <Grid item xs={12} sm={4}>
              <TextField
                id="artifactName"
                label="Artifact Name"
                className={classes.textField}
                value={this.state.name}
                onChange={this.handleNameChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="ArtifactDate"
                  label="Artifact Date"
                  value={this.state.artifactTime}
                  className={classes.textField}
                  onChange={this.handleTimeChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={4}>
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
                    <MenuItem key={name} value={name}
                       style={{
                          fontWeight:
                            this.state.name.indexOf(name) === -1
                              ? theme.typography.fontWeightRegular
                              : theme.typography.fontWeightMedium,
                        }}
                      >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <input type="file" className={classes.textField} onChange={this.fileSelectedHandler}/>
              <img src={this.state.bloburl} alt="unable to display" width="50%" height="50%" className={classes.img}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Please choose a category</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={this.state.categoryValue.Pet} onChange={this.handleCategoryPChange} value="Pets"/>}
                  label="Pets"
                />
                <FormControlLabel
                  control={<Checkbox checked={this.state.categoryValue.Instruments} onChange={this.handleCategoryIChange} value="Instruments"/>}
                  label="Instruments"
                />
                <FormControlLabel
                  control={<Checkbox checked={this.state.categoryValue.Others} onChange={this.handleCategoryOChange} value="Others"/>}
                  label="Others"
                />
              </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="outlined-multiline-flexible"
                label="Description"
                multiline
                rowsMax="4"
                value={this.state.description}
                onChange={this.handleDesChange}
                className={classes.descriptionField}
                margin="normal"
                helperText="Please enter description above"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" color="secondary" onClick={this.fileUploadHandler}>Submit</Button>
            </Grid>
          </Grid>
        </form>
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
