import {BrowserRouter as Router, Route} from "react-router-dom"
import Navbar from './components/navbar/navbar.component'
import ArtifactAlbum from './components/artifacts/artifacts-album.component'
import ArtifactView from './components/artifacts/artifacts-view.component'
import ArtifactTimeline from './components/artifacts/artifacts-timeline.component'
import artifactUpload from './components/artifacts/artifacts-upload.component'
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
                <Route path="/artifactUpload" component={ArtifactTimeline} /> 
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
