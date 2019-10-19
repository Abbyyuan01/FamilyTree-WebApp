import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Card, CardHeader, CardContent } from "@material-ui/core";

const styles = theme => ({
  root: {
    maxWidth: 500,
    margin: "2rem auto"
  },
  cardHeader: {
    borderBottom: "1px solid #eee",
    background: "linear-gradient(to right, #154b9c, #13bcd4)"
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
  }
});

const PricingFamMember = props => (
  <Card className={props.classes.root}>
    <CardHeader
      title="Free"
      subheader="$0/month"
      classes={{
        root: props.classes.cardHeader,
        title: props.classes.cardTitle,
        subheader: props.classes.cardSubheader
      }}
    />
    <CardContent>
      Family Tree will remain free for family members. Family members can only
      view artifacts if they are in a family group led by an admin.
    </CardContent>
  </Card>
);

PricingFamMember.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PricingFamMember);
