import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import SocialMenu from "./elements/SocialMenu";
import logo from './elements/assets/treelogo.png' 

const styles = theme => ({
  root: {
    background: "#000",
    color: theme.palette.primary.main,
    marginTop: "3rem",
    fontFamily: "Raleway",
    fontWeight: 600
  },
  rootFlex: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "baseline",
    [theme.breakpoints.down("sm")]: {
      // textAlign: 'center',
      // paddingTop: 1,
      // paddingBottom: 1,
    }
  },
  flexChildren: {
    flexGrow: 1
  },
  logo: {
    width: 40
  },
  mobileDisplay: {
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
});

const Footer = props => (
  <footer className={props.classes.root}>
    <div className={"wrapper " + props.classes.rootFlex}>
      <p className={props.classes.flexChildren}>
        <IconButton href="/" className={props.classes.logo}>
          <img src={logo} alt="FamilTree Logo" />
        </IconButton>
        FamilyTree
      </p>
      <p
        className={
          props.classes.flexChildren + " " + props.classes.mobileDisplay
        }
        style={{ marginTop: 30, marginBottom: 30 }}
      >
        Team GhostZen &copy;2019
      </p>
      <SocialMenu />
    </div>
  </footer>
);

export default withStyles(styles)(Footer);
