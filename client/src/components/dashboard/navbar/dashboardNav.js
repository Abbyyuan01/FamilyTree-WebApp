/**
 * dashboard navbar: navigation
 */
import React, { Component } from "react";
import "../../../css/App.css";
import { Layout, Header, Navigation, Drawer, Content} from "react-mdl";
import { Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { logoutUser } from "../../../actions/authActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DashboardNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,   
    };

  }


  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

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
                <Link to="/dashboard/">AtifactView</Link>
                <Link to="/dashboard/upload"> Upload Artifacts</Link>
                <Link to="/dashboard/timeline">Timeline</Link>
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
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
                <Link to="/dashboard/">AtifactView</Link>
                <Link to="/dashboard/upload"> Upload Artifacts</Link>
                <Link to="/dashboard/timeline">Timeline</Link>
              </Navigation>
            </Drawer>
            <Content>
              <div className="page-content" />
              {this.props.children}
            </Content>
          </Layout>
      </div>
    );
  }
}

DashboardNav.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(DashboardNav);

