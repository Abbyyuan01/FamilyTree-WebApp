/**
 * generate account component: generate account
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
// import { Link, withRouter } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const styles = theme => ({
  root: {
      backgroundColor: theme.palette.common.white,
      alignItems: 'center',
      display: 'flex'
    },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class GenerateAccount extends Component {
    constructor() {
      super();

      this.state = {
        username: "",
        email: "",
        password: "",
        errors: {}
      };

    }

    componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          this.props.history.push("/register");
        }
      }
    
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
    }

    onChange = e => {
      this.setState({ [e.target.id]: e.target.value });
    };
  
    onSubmit = e => {
      e.preventDefault();
  
      const newUser = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      };

      this.props.registerUser(newUser, this.props.history);
    }

    render() {
      const { classes } = this.props;
      const { errors } = this.state;
      
      return ( 
          <div className={classes.root}>
              <Container component="main" maxWidth="xs" justify = "center">
              <CssBaseline />
              <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                  GenerateAccount
                  </Typography>
                  <form className={classes.form} noValidate onSubmit={this.onSubmit}>
                  <TextField
                      onChange={this.onChange}
                      value={this.state.username}
                      error={errors.username}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      className={classnames("", {
                        invalid: errors.username
                      })}     
                  />
                  <span className="red-text">{errors.name}</span>
                  <TextField
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      className={classnames("", {
                        invalid: errors.email
                      })}  
                  />
                  <span className="red-text">{errors.email}</span>

                  <TextField
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.email}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      className={classnames("", {
                        invalid: errors.password
                      })}          
                  />
                  <span className="red-text">{errors.password}</span>
              
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                  >
                      Generate Account
                  </Button>
                  </form>
              </div>
              <Box mt={8}>
                  <Copyright />
              </Box>
              </Container>
          </div>
          );
      }
}

GenerateAccount.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default withStyles(styles)(connect(
    mapStateToProps,
    { registerUser }
  )(GenerateAccount));
