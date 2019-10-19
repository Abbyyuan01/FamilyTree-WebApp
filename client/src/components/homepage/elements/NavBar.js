import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Typography  } from '@material-ui/core'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { withStyles } from '@material-ui/core/styles'
import logo from './assets/treelogo.png' 
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import { connect } from "react-redux";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

// function TransitionUp(props) {
//   return <Slide {...props} direction="up" />;
// }

const styles = theme => ({
  root: {
    width: '100%',
		background: theme.palette.primary.main,
		"& a": {
			color: theme.palette.common.white,
			textDecoration: 'none',
		},
		position: 'fixed',
		top: 0,
		zIndex: 1,
  },
  appBar: {
    boxShadow: 'none',
    color: theme.palette.common.white,
    paddingLeft: 0,
    paddingRight: 0,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
		[theme.breakpoints.down('md')]: {
			marginLeft: 15,
		},
		marginRight: 0,
		width: 40,
  },
  title: {
		fontSize: 20,
		fontWeight: 600,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
			display: 'flex',
		},
		'&>a': {
      marginRight: 15,
		},
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
})

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      anchorEl1: null, 
      open1: false,
      Transition: null, 
      showLogin: true,
      showAccount: false
    }

  }

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleMenuClose = () => {
    this.setState({ anchorEl: null })
    this.handleMobileMenuClose()
  }

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget })
  }

  handleMobileMenuClose = () => {
		this.setState({ mobileMoreAnchorEl: null })
  }

  handleDashboardClick = Transition => () => {
    if (!this.props.auth.isAuthenticated) {
      this.setState({ open1: true, Transition });
    }
  };

  handleSnackbarClose = () => {
    this.setState({ open1: false });
  };

  handleMenu = event => {
    this.setState({ anchorEl1: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl1: null });
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
    const { anchorEl, mobileMoreAnchorEl,anchorEl1} = this.state
    const { classes } = this.props
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const open1 = Boolean(anchorEl1);
    const { user } = this.props.auth;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    )

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        {/* <MenuItem onClick={this.handleMobileMenuClose} href='#tour' component='button'>
          <Link to="/dashboard" onClick={this.handleDashboardClick(TransitionUp)}>Dashboard</Link>
        </MenuItem> */}
        <MenuItem onClick={this.handleMobileMenuClose} href='#tour' component='button'>
					Tour
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose} href='#pricing' component='button'>
					Pricing
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose} href='#about' component='button'>
					About
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose} href='#contact' component='button'>
					Contact
        </MenuItem>
        {/* <MenuItem onClick={this.handleMobileMenuClose} href='#contact' component='button'>
					Login
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose} href='#contact' component='button'>
					Register
        </MenuItem> */}
      </Menu>
    )
    
    return (
      <div className={classes.root}>
        <AppBar 
          position="static" 
          className={'wrapper ' + classes.appBar}
          color="primary"
        >
          <Toolbar>
						<IconButton href="https://hourtech.ca" className={classes.menuButton} color="inherit" aria-label="Open drawer">
              <img src={logo} alt="Family Tree Logo" />
            </IconButton>
            <h1 className={classes.title}>
              Family Tree
            </h1>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            { !this.state.showLogin ?
              <Button color="inherit">
								<Typography variant="h6" color="inherit" noWrap>
                  <Link to="/dashboard" >Dashboard</Link>
                {/* <Link to="/dashboard" onClick={this.handleDashboardClick(TransitionUp)}>Dashboard</Link> */}
								</Typography>
              </Button>
                : null} 
							<Button href="#tour" color="inherit">
								<Typography variant="h6" color="inherit" noWrap>
									Tour
								</Typography>
              </Button>
              <Button href="#pricing" color="inherit">
								<Typography variant="h6" color="inherit" noWrap>
									Pricing
								</Typography>
              </Button>
              <Button href="#about" color="inherit">
								<Typography variant="h6" color="inherit" noWrap>
									About
								</Typography>
              </Button>
              <Button href="#contact" color="inherit">
								<Typography variant="h6" color="inherit" noWrap>
									Contact
								</Typography>
              </Button>
              { this.state.showLogin ?
                <Button  color="inherit">
                  <Typography variant="h6" color="inherit" noWrap>
                    <Link to="/login">Login</Link> 
                  </Typography>
                </Button> : null}
              { this.state.showLogin ?
                <Button color="inherit">
                  <Typography variant="h6" color="inherit" noWrap>
                    <Link to="/register">Register</Link>
                  </Typography>
                </Button>
              : null} 
              {/* <div> */}
              { this.state.showAccount ?
                  <IconButton
                    aria-owns={open1 ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                    :null}
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl1}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open1}
                    onClose={this.handleClose}
                  >
                    <Typography variant="h6" gutterBottom align="center">
                      {user.username}
                    </Typography>
                    <Divider/>
                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                    <MenuItem onClick={this.handleLogoutClick}>Log out</MenuItem>
                  </Menu>
                {/* </div> */}
            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
          {/* <Snackbar
            open={this.state.open1}
            onClose={this.handleSnackbarClose}
            TransitionComponent={this.state.Transition}
            ContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">Please Login At First</span>}
          /> */}
        </AppBar>
        {renderMobileMenu}
      </div>
    )
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{ logoutUser })(withStyles(styles)(NavBar))

