import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import bg from "./assets/img/family.jpeg";
import logo from "./assets/img/bigtreelogo.png";

const styles = theme => ({
  root: {
    position: "relative",
    marginTop: 65,
    "& h2": {
      paddingTop: 0
    }
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: -75,
    left: 0,
    right: 0,
    opacity: 0.25,
    zIndex: -1,
    background: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "right bottom"
  },
  rootGrid: {
    flexGrow: 1,
    width: "100%",
    // height: 600,
    marginTop: 0,
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  },
  content: {
    marginTop: 30,
    marginBottom: 30,
    [theme.breakpoints.up("1250")]: {
      marginLeft: 30
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: 20
    }
  },
  contentText: {
    [theme.breakpoints.up("md")]: {
      paddingRight: 20
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: 620,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  link: {
    maxHeight: 50,
    marginTop: 20,
    marginRight: 10
  },
  imgContainer: {
    marginTop: 50,
    textAlign: "right",
    alignSelf: "flex-end",
    paddingRight: "0 !important",
    paddingBottom: "0 !important"
  },
  img: {
    display: "block",
    maxWidth: 430,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  }
});

const Intro = props => (
  <div className={props.classes.root}>
    <div className={props.classes.background}></div>
    <div className="wrapper">
      <Grid container spacing={24} className={props.classes.rootGrid}>
        <Grid item xs={12} md={7}>
          <div className={props.classes.content}>
            <h2>Family Tree</h2>
            <h4 className={props.classes.contentText}>
              Family Tree is a platform designed to connect family members
              together to review their family heirlooms and artifacts. Family
              Tree is user-friendly and aims to cater to each family's needs.
              Family Tree members are able to post, edit and delete details of
              each family artifact in their possession.
            </h4>
          </div>
        </Grid>

        <Grid item xs={12} md={5} className={props.classes.imgContainer}>
          <img
            src={logo}
            alt="A hand holding a phone featured HourTech app"
            className={props.classes.img}
          />
            <div>
              <br></br>
              <br></br>
              <br></br>
						</div>
        </Grid>
      </Grid>
    </div>
  </div>
);

export default withStyles(styles)(Intro);
