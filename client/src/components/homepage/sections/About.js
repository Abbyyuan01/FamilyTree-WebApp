import React from "react";
import Member from "./Member";
import { withStyles } from "@material-ui/core/styles";

import bg from "./assets/img/about-bg2.jpg";
import team from "./assets/img/team.png";
import maggie from "./assets/img/maggie.jpg";
import ta from "./assets/img/ta.jpg";
import diego from "./assets/img/diego.jpg";


const styles = theme => ({
  root: {
    position: "relative",
    paddingTop: 80,
  },
  rootFlex: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "center",
    marginTop: "1rem"
  },
  backgroundColor: {
    position: "absolute",
    top: 50,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.25,
    zIndex: -1,
    backgroundColor: theme.palette.primary.light
  },
  backgroundImage: {
    position: "absolute",
    top: 50,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.25,
    zIndex: -2,
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover"
  },
  image: {
    width: 500,
    borderRadius: 10
  }
});

const About = props => (
  <div className={props.classes.root} id="about">
    <div className={props.classes.backgroundColor}></div>
    <div className={props.classes.backgroundImage}></div>
    <section className="wrapper center">
    <h2 >About Us</h2>
      <p>
        <img
          src={team}
          alt="Family Tree Team"
          className={props.classes.image}
        />
      </p>

      <div className={"team-members-container " + props.classes.rootFlex}>
        <Member
          className={props.classes.flexChildren}
          memberName="Maggie (MK) Vu"
          memberImg={maggie}
          memberRole="Project Manager / Lead Web"
          memberLinkedin="http://linkedin.com/in/maggievu"
          memberGithub="https://github.com/maggievu"
        />

        <Member
          className={props.classes.flexChildren}
          memberName="Diego Rodrigues"
          memberImg={diego}
          memberRole="Lead Android / Frontend"
          memberLinkedin="http://linkedin.com/in/diegoro"
          memberGithub="https://github.com/dit0"
        />

        <Member
          className={props.classes.flexChildren}
          memberName="Noppawit Hansompob"
          memberImg={ta}
          memberRole="Lead iOS / Backend"
          memberLinkedin="http://linkedin.com/in/mmadhu1310"
          memberGithub="https://github.com/meet-madhu1310"
        />
      </div>
    </section>
  </div>
);

export default withStyles(styles)(About);
