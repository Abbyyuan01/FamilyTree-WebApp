import {BrowserRouter as Router, Route} from "react-router-dom"
import Navbar from './components/navbar/navbar.component'
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Login from './components/authentication/login.component'


const styles = theme => ({
  root: {
    display: 'flex',
  }
});

class Main extends Component {
  render (){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
          <Router>
            <div className="container">       
                <Route path="/navbar" component={Navbar} />
            </div>
        </Router>
      </div>
    );
  }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };
  
export default withStyles(styles, { withTheme: true })(Main);
