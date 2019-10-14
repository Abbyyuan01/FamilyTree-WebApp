import React, { Component } from "react";
import "../../../css/App.css";
import { Layout, Header, Navigation, Drawer, Content } from "react-mdl";
import { Link } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionUp(props) {
  return <Slide {...props} direction="up" />;
}


class HomeNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null, 
      open: false,
      Transition: null, 
      showLogin: true,
      showAccount: false
    };

  }

  handleDashboardClick = Transition => () => {
    if (!this.props.auth.isAuthenticated) {
      this.setState({ open: true, Transition });
    }
  };

  handleSnackbarClose = () => {
    this.setState({ open: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
    this.setState({ showLogin:true, showAccount: false });
  };

  componentWillMount() {
    if (this.props.auth.isAuthenticated) {
      this.setState({ showLogin:false, showAccount:true });
    }else{
      this.setState({ showLogin:true, showAccount: false });
    }
  }

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const { user } = this.props.auth;

    return (
      <div className="demo-big-content">
        <Layout>
          <Header
            className="header-color"
            title={
              <Link style={{ textDecoration: "none", color: "white" }} to="/">
                Family Tree
              </Link>
            }
            scroll
          >
            <Navigation>
              <Link to="/dashboard" onClick={this.handleDashboardClick(TransitionUp)}>Dashboard</Link>
              <Link to="/aboutme">About Me</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/contactus">Contact Us</Link>
              { this.state.showLogin ? <Link to="/login">Login</Link> : null }
              <Link to="/register">Register</Link>
              <div>
              { this.state.showAccount ?
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                    :null}
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <Typography variant="h6" gutterBottom align="center">
                      {user.username}
                    </Typography>
                    <Divider/>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleLogoutClick}>Log out</MenuItem>
                  </Menu>
                </div>
            </Navigation>
          </Header>
          <Drawer
            title={
              <Link style={{ textDecoration: "none", color: "black" }} to="/">
                Family Tree
              </Link>
            }
          >
            <Navigation>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/aboutme">About Me</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/contactus">Contact Us</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </Navigation>
          </Drawer>{" "}
          <Content>
              <div className="page-content" />
              {this.props.children}
            </Content>
            <Snackbar
            open={this.state.open}
            onClose={this.handleSnackbarClose}
            TransitionComponent={this.state.Transition}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Please Login At First</span>}
          />
        </Layout>
      </div>
    );
  }
}

HomeNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(HomeNav);


// export default HomeNav;
