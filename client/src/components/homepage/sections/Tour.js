import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    position: "relative",
    paddingTop: 100,
    marginBottom: 30,
  },
  background: {
    position: "absolute",
    top: 600,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
    [theme.breakpoints.up("md")]: {
      backgroundColor: theme.palette.primary.lightest
    }
  },
  tabsRoot: {
    color: theme.palette.common.white
  },
  tabsIndicator: {
    backgroundColor: "initial"
  },
  tabRootLeft: {
    fontSize: 14,
    fontWeight: 600,
    background: theme.palette.primary.main,
    border: "2px solid #13bcd4",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    minWidth: 150,
    width: "30vw",
    maxWidth: 250
  },
  tabRootRight: {
    fontSize: 14,
    fontWeight: 600,
    background: theme.palette.primary.main,
    border: "2px solid #13bcd4",
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    minWidth: 150,
    width: "30vw",
    maxWidth: 250
  },  
  tabSelected: {
    backgroundColor: theme.palette.secondary.main
  }
});

class Tour extends Component {
  state = {
    value: "client"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} id="tour">
        <div className={classes.background}></div>
        <section className="wrapper">
          <h2 className="center" >
            Take a tour
          </h2>
        <br></br>
		    <div classname="iframe-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/lsKZhq4mv1k"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
		  </div>
        </section>
      </div>
    );
  }
}

Tour.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Tour);
