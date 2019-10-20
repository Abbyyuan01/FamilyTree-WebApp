import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Button, Typography  } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import logo from '../../homepage/elements/assets/treelogo.png' 
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import { connect } from "react-redux";
import AccountCircle from '@material-ui/icons/AccountCircle';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  root: {
    width: '100%',
	"& a": {
		color: theme.palette.common.white,
		textDecoration: 'none',
	},
	top: 0,
    zIndex: 1,
  },
  appBar: {
    // boxShadow: 'none',
    // color: theme.palette.common.white,
    // paddingLeft: 0,
    // paddingRight: 0,
  },
  grow: {
    flexGrow: 1,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
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
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
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

class DashNavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      navAnchorEl: null,   
    }

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

  handleMenu = event => {
    this.setState({ navAnchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ navAnchorEl: null });
  };

  handleLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  render() {
    const { anchorEl, mobileMoreAnchorEl,navAnchorEl} = this.state
    const { classes } = this.props
    const isMenuOpen = Boolean(anchorEl)
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
    const open = Boolean(navAnchorEl);
    const { user } = this.props.auth;

    // const renderMobileMenu = (
    //   <Menu
    //     anchorEl={mobileMoreAnchorEl}
    //     anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    //     transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    //     open={isMobileMenuOpen}
    //     onClose={this.handleMenuClose}
    //   >
    //     <MenuItem onClick={this.handleMobileMenuClose} component='button'>
    //         <Link to="/dashboard/">View Atifact</Link>
    //     </MenuItem>
    //     <MenuItem onClick={this.handleMobileMenuClose} component='button'>
    //         <Link to="/dashboard/myArtifact">My Artifact</Link>  
    //     </MenuItem>
    //     <MenuItem onClick={this.handleMobileMenuClose}  component='button'>
    //         <Link to="/dashboard/upload"> Upload Artifacts</Link>
    //     </MenuItem>
    //     <MenuItem onClick={this.handleMobileMenuClose}  component='button'>
    //         <Link to="/dashboard/timeline">Timeline</Link>
    //     </MenuItem>
    //     <IconButton
    //                 aria-owns={open ? 'menu-appbar' : null}
    //                 aria-haspopup="true"
    //                 onClick={this.handleMenu}
    //                 color="inherit"
    //               >
    //                 <AccountCircle />
    //               </IconButton>
    //               <Menu
    //                 id="menu-appbar"
    //                 navAnchorEl={navAnchorEl}
    //                 anchorOrigin={{
    //                   vertical: 'top',
    //                   horizontal: 'right',
    //                 }}
    //                 transformOrigin={{
    //                   vertical: 'top',
    //                   horizontal: 'right',
    //                 }}
    //                 open={open}
    //                 onClose={this.handleClose}
    //               >
    //                 <Typography variant="h6" gutterBottom align="center">
    //                   {user.username}
    //                 </Typography>
    //                 <Divider/>
    //                 <MenuItem onClick={this.handleClose}>My account</MenuItem>
    //                 <MenuItem onClick={this.handleLogoutClick}>Log out</MenuItem>
    //               </Menu>
    //   </Menu>
    // )
    
    return (
      <div className={classes.root}>
        {/* <CssBaseline /> */}
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
            
			 <Button color="inherit">
				<Typography variant="h6" color="inherit" noWrap>
                    <Link to="/dashboard/">View Atifact</Link>
				</Typography>
              </Button>
              <Button color="inherit">
				 <Typography variant="h6" color="inherit" noWrap>
                    <Link to="/dashboard/myArtifact">My Artifact</Link>  
				 </Typography>
              </Button>
              <Button color="inherit">
					<Typography variant="h6" color="inherit" noWrap>
                        <Link to="/dashboard/upload"> Upload Artifacts</Link>
					</Typography>
              </Button>
              <Button color="inherit">
					<Typography variant="h6" color="inherit" noWrap>
                        <Link to="/dashboard/timeline">Timeline</Link>
					</Typography>
              </Button>
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
                    navAnchorEl={navAnchorEl}
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
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MenuIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {/* {renderMobileMenu} */}  
        <main className={classes.content}>
                {this.props.children}            
        </main>
      </div>
   
    )
  }
}

DashNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps,{ logoutUser })(withStyles(styles)(DashNavBar))
