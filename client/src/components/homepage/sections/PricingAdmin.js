import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Grid, Card, CardHeader, CardContent } from "@material-ui/core";

const styles = theme => ({
  root: {
    justifyContent: "center"
  },
  cardRoot: {
    [theme.breakpoints.up("md")]: {
      marginTop: "2rem"
    },
    textAlign: "center"
  },
  cardHeader: {
    borderBottom: "1px solid #eee",
    background: "linear-gradient(to bottom, #154b9c, #13bcd4)"
  },
  cardTitle: {
    fontFamily: "Raleway",
    fontSize: 25,
    fontWeight: 600,
    color: theme.palette.common.white,
    textAlign: "center"
  },
  cardSubheader: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.palette.common.white,
    textAlign: "center"
  },
  placeholder: {
    opacity: 0,
    [theme.breakpoints.down("xs")]: {
      display: "none"
    }
  }
});

const PricingAdmin = props => (
  <Grid container spacing={24} className={props.classes.root}>
    <Grid item sm={12} md={1}></Grid>
    <Grid item xs={12} sm={6} md={5}>
      <Card className={props.classes.cardRoot}>
        <CardHeader
          title="Basic"
          subheader="Free to sign up"
          classes={{
            root: props.classes.cardHeader,
            title: props.classes.cardTitle,
            subheader: props.classes.cardSubheader
          }}
        />
        <CardContent>
          <p>
            <strong>1 free month then $2.99/month</strong>
          </p>
          <p>Email support</p>
          <p>Family Members limit 30 people</p>
          <p>Cancel Anytime</p>
          <p className={props.classes.placeholder}>Placeholder</p>
        </CardContent>
      </Card>
    </Grid>
    <Grid item xs={12} sm={6} md={5}>
      <Card className={props.classes.cardRoot}>
        <CardHeader
          title="Pro"
          subheader="$9.99 to sign up"
          classes={{
            root: props.classes.cardHeader,
            title: props.classes.cardTitle,
            subheader: props.classes.cardSubheader
          }}
        />
        <CardContent>
          <p>
            <strong>$4.99/month</strong> (or $29.99/year)
          </p>
          <p>Email support</p>
          <p>Phone support</p>
          <p>Unlimited Family Members</p>
          <p>Cancel Anytime</p>
        </CardContent>
      </Card>
    </Grid>
    <Grid item sm={12} md={1}></Grid>
  </Grid>
);

PricingAdmin.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PricingAdmin);
