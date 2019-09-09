import {BrowserRouter as Router, Route} from "react-router-dom"
import Navbar from './components/navbar.component'
import ArtifactAlbum from './components/artifacts-album.component'
import ArtifactView from './components/artifacts-view.component.js'
import ArtifactTimeline from './components/artifacts-timeline.component'
import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

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
                <Navbar />
                <br />
                <Route path="/artifact" component={ArtifactAlbum} /> 
                <Route path="/artifactview" component={ArtifactView} /> 
                <Route path="/artifactTimeline" component={ArtifactTimeline} /> 
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
