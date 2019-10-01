/**
 * Login component: Login and logout
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
// import { Link } from "react-router-dom";

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
      // backgroundColor: theme.palette.common.white,
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


class Login extends Component {
    constructor(props) {
      super(props);

      this.state = {
        email: "",
        password: "",
        errors: {}
      };

    }

    componentDidMount() {
      // If logged in and user navigates to Login page, should redirect them to dashboard
      if (this.props.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
    }
  
    componentWillReceiveProps(nextProps) {
      if (nextProps.auth.isAuthenticated) {
        this.props.history.push("/dashboard");
      }
  
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
  
      const userData = {
        email: this.state.email,
        password: this.state.password
      };
  
      this.props.loginUser(userData);
    };

  
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
                  Login
                  </Typography>
                  <form className={classes.form} noValidate onSubmit={this.onSubmit}>
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
                        invalid: errors.email || errors.emailnotfound
                      })}
                  />
                  <FormHelperText id="component-error-text" >
                    {errors.email}
                    {errors.emailnotfound}
                  </FormHelperText>  

                  <TextField
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
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
                        invalid: errors.password || errors.passwordincorrect
                      })}
                  />
                  <FormHelperText id="component-error-text">
                  {errors.password}
                  {errors.passwordincorrect}
                  </FormHelperText>  
                  
                  <FormControlLabel
                      control={<Checkbox value="remember" color="primary" />}
                      label="Remember me"
                  />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                  >
                      Log In
                  </Button>
                  {/* <Grid container>
                      <Grid item xs>
                      <Link href="#" variant="body2">
                          Forgot password?
                      </Link>
                      </Grid>
                      <Grid item>
                      <Link href="/register" variant="body2">
                          {"Don't have an account? Sign Up"}
                      </Link>
                      </Grid>
                  </Grid> */}
                  <Grid item xs>
                      <Link href="/" variant="body1">
                          Back to Home
                      </Link>
                  </Grid>
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

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default withStyles(styles)(connect(
  mapStateToProps,
  { loginUser }
)(Login));

