import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Tab, Tabs } from "@material-ui/core";
import PricingFamMember from "./PricingFamMember";
import PricingAdmin from "./PricingAdmin";

const styles = theme => ({
  root: {
    position: "relative",
    paddingTop: 80,
    marginBottom: 100,
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
  },
  rootGrid: {
    textAlign: "center",
    marginTop: "2rem"
  }
});

class Pricing extends Component {
  state = {
    value: "FamMember"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} id="pricing">
        <div className="wrapper">
          <h2 className="center" >
            Pricing
          </h2>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
            centered
          >
            <Tab
              classes={{
                root: classes.tabRootLeft,
                selected: classes.tabSelected
              }}
              label="For Family Members"
              value="FamMember"
            />
            <Tab
              classes={{
                root: classes.tabRootRight,
                selected: classes.tabSelected
              }}
              label="For Admins"
              value="Admin"
            />
          </Tabs>

          {this.state.value === "FamMember" ? (
            <PricingFamMember />
          ) : (
            <PricingAdmin />
          )}
        </div>
      </div>
    );
  }
}

Pricing.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pricing);
