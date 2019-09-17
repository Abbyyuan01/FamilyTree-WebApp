// const drawerWidth = 240;

// const styles = theme => ({
//   root: {
//     flexGrow: 1
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     })
//   },
//   appBarShift: {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   menuButton: {
//     marginLeft: 12,
//     marginRight: 36
//   },
//   hide: {
//     display: "none"
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: "nowrap"
//   },
//   drawerOpen: {
//     width: drawerWidth,
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.enteringScreen
//     })
//   },
//   drawerClose: {
//     transition: theme.transitions.create("width", {
//       easing: theme.transitions.easing.sharp,
//       duration: theme.transitions.duration.leavingScreen
//     }),
//     overflowX: "hidden",
//     width: theme.spacing.unit * 7 + 1,
//     [theme.breakpoints.up("sm")]: {
//       width: theme.spacing.unit * 9 + 1
//     }
//   },
//   toolbar: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "flex-end",
//     padding: "0 8px",
//     ...theme.mixins.toolbar
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing.unit * 3
//   }
// });

// class Navbar extends Component {
//     state = {
//       open: false
//     };

//     handleDrawerOpen = () => {
//       this.setState({ open: true });
//     };

//     handleDrawerClose = () => {
//       this.setState({ open: false });
//     };

//     render() {
//       const { classes, theme } = this.props;

//       return (
//         <div className={classes.root}>
//           <CssBaseline />
//           <AppBar position="static" className={classNames(classes.appBar)}>
//             <Toolbar disableGutters={true}>
//               <IconButton
//                 color="inherit"
//                 aria-label="Open drawer"
//                 onClick={
//                   this.state.open ? this.handleDrawerClose : this.handleDrawerOpen
//                 }
//                 className={classNames(classes.menuButton)}
//               >
//                 <MenuIcon />
//               </IconButton>
//               <Typography variant="h6" color="inherit" noWrap>
//                 Family Tree
//               </Typography>
//             </Toolbar>
//           </AppBar>
//           <Drawer
//             variant="permanent"
//             className={classNames(classes.drawer, {
//               [classes.drawerOpen]: this.state.open,
//               [classes.drawerClose]: !this.state.open
//             })}
//             classes={{
//               paper: classNames({
//                 [classes.drawerOpen]: this.state.open,
//                 [classes.drawerClose]: !this.state.open
//               })
//             }}
//             open={this.state.open}
//           >
//             <div className={classes.toolbar}>
//               <IconButton onClick={this.handleDrawerClose}>
//                 {theme.direction === "rtl" ? (
//                   <ChevronRightIcon />
//                 ) : (
//                   <ChevronLeftIcon />
//                 )}
//               </IconButton>
//             </div>
//             <Divider />
//             <List>
//               {["Home"].map((text, index) => (
//                 <ListItem button key={text} >
//                   <ListItemIcon>
//                     <HomeIcon />  
//                   </ListItemIcon>
//                   <ListItemText primary={text} />
//                 </ListItem>
//               ))},
//               {
//               ["UploadArtifact"].map((text, index) => (
//                 // add clickEvent
//                 <ListItem button key={text} >
//                   <ListItemIcon>
//                     <UploadIcon />
//                   </ListItemIcon>
//                   <ListItemText primary={text} />
//                 </ListItem>
//               ))
//               }
//             </List>
//             <Divider />
//             {/* <List>
//               {["All mail", "Trash", "Spam"].map((text, index) => (
//                 <ListItem button key={text}>
//                   <ListItemIcon>
//                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                   </ListItemIcon>
//                   <ListItemText primary={text} />
//                 </ListItem>
//               ))}
//             </List> */}
//           </Drawer>
//         </div>
//       );
//     }
// }

// Navbar.propTypes = {
//   classes: PropTypes.object.isRequired,
//   theme: PropTypes.object.isRequired
// };

// export default withStyles(styles, { withTheme: true })(Navbar);


