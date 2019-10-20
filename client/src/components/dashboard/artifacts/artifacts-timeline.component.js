import React, { Component } from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import 'react-vertical-timeline-component/style.min.css';
import LikeIcon from "@material-ui/icons/FavoriteBorder"
import axios from 'axios';
import Container from '@material-ui/core/Container';

const styles = theme => ({
    root: {
        display:"flex",
        background: theme.palette.primary.lightest,
    }
    
})
class ArtifactTimeLine extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            artifacts: []
        };
      }
    
     //load before everything
     componentDidMount() {
        axios.get('/artifacts/')
          .then(response => {
              if (response.data.length > 0) {
                  this.setState({
                      artifacts: response.data
                  })
              }
          })
          .catch((error) => {
            console.log(error);
          })

    }
  
    render() { 
        const { classes, theme } = this.props;

        var sorted_artifact = this.state.artifacts.sort((a,b) => {
            return new Date(a.artifactTime) - new Date(b.artifactTime)
        }).reverse();
        
        return ( 
        <div className={classes.root}>
        <Container component="main" maxWidth="lg">
        {sorted_artifact.map((artifact) => (
            <VerticalTimeline key={artifact._id}>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"  
                date={new Date(artifact.artifactTime).toLocaleDateString()}
                iconStyle={{ background: "#13bcd4", color: '#fff' }}
                icon={<LikeIcon />}
            >
                <h3 className="vertical-timeline-element-title">{artifact.name}</h3>
                <h4 className="vertical-timeline-element-subtitle">{artifact.user.username}</h4>
                <img src={artifact.url}/>
                <p>
                    {artifact.description}
                </p>
            </VerticalTimelineElement>
            </VerticalTimeline>
        ))}
        </Container>
        </div>
         );
    }
}

ArtifactTimeLine.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };  
 
export default withStyles(styles)(ArtifactTimeLine);