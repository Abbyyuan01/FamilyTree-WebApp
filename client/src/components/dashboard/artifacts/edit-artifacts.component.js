/*
  **component for upload artifacts
  **including select image and upload description form
 */
import React, { Component } from 'react';
import axios from 'axios';
import 'date-fns';
import PropTypes from 'prop-types';
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


const styles = theme => ({
  root: {
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  container: {
    margin: theme.spacing(2),
    marginTop: 24,
    borderRadius: '16',
  },
  textField: {
    margin: theme.spacing(2),
    width: 400,
  },
  descriptionField :{
    margin: theme.spacing(2),
    width: 500,
  },
  formControl: {
    margin: theme.spacing(2),
    minWidth: 400,
    maxWidth: 400,
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


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

class EditArtifact extends Component {
  constructor( props ) {
    super( props )
    this.state = {
     artifact: null,
     filteredArtifacts: [],
     selectedFile: null,
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


      //load before everything
      componentDidMount() {
        axios.get('/artifacts/'+this.props.editArtifactId)
          .then(response => {
                  this.setState({
                      name: response.data.name,
                      artifactTime: new Date(response.data.artifactTime),
                      category:response.data.category,
                      visibility:response.data.visibility,
                      description:response.data.description
                  })
          })
          .catch((error) => {
            console.log(error);
          })

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


  handleNameChange = event => {
    this.setState({
      name: event.target.value
    })
    console.log(this.props.editArtifactId)
    console.log(this.props)
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
  }

  handleCategoryIChange = event => {
    this.setState ({
      category: event.target.value,
      ...this.state.categoryValue.Instruments = event.target.checked
    });
  }

  handleCategoryOChange = event => {
    this.setState ({
      category: event.target.value,
      ...this.state.categoryValue.Others = event.target.checked
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


  handleAditArtifact= e => {
    e.preventDefault();

    const editedArtifact = {
      name: this.state.name,
      description: this.state.description,
      artifactTime: this.state.artifactTime,
      category:this.state.category,
      visibility:this.state.visibility,
    }

    console.log(editedArtifact);

    axios.post('/updateArtifacts/' + this.props.editArtifactId, editedArtifact)
      .then(res => {
        alert("Update Artifact Information Successfully!");
        console.log(res.data)
      })
      .catch(error => console.log(error));
  }


  render() {
    const { classes, theme } = this.props;
    const { user } = this.props.auth;

    return (
      <div className={classes.root}>
        <form className={classes.container} autoComplete="on">
          <Grid container alignItems="center" spacing={0}>
            <Grid item xs={12} >
              <TextField
                id="artifactName"
                label="Artifact Name"
                className={classes.textField}
                defaultValue={this.state.name}
                value={this.state.name}
                onChange={this.handleNameChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} justify="center" >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="ArtifactDate"
                  className={classes.textField}
                  value={this.state.artifactTime}
                  defaultValue={new Date(this.state.artifactTime)}
                  onChange={this.handleTimeChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} >
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="select-multiple-chip">Visibility</InputLabel>
                <Select
                  multiple
                  value={this.state.visibility}
                  selected={this.state.visibility}
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
            </Grid>
            <Grid item xs={12} >
              <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Please choose a category</FormLabel>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox 
                    checked={this.state.categoryValue.Pet} 
                    onChange={this.handleCategoryPChange} 
                    value="Pets"
                    />}
                  label="Pets"
                />
                <FormControlLabel
                  control={<Checkbox checked={this.state.categoryValue.Instruments} onChange={this.handleCategoryIChange} value="Instruments"
                  />}
                  label="Instruments"
                />
                <FormControlLabel
                  control={<Checkbox checked={this.state.categoryValue.Others} onChange={this.handleCategoryOChange} value="Others"
                  defaultValue={this.state.category}/>}
                  label="Others"
                />
              </FormGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                rowsMax="6"
                value={this.state.description}
                defaultValue={this.state.description}
                onChange={this.handleDesChange}
                className={classes.descriptionField}
                margin="normal"
                helperText="Please enter description above"
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button variant="contained" size="large" color="secondary" onClick={this.handleAditArtifact}>Update</Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}


EditArtifact.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps)(withStyles(styles)(EditArtifact));


