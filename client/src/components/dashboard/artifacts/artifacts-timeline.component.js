import React, { Component } from 'react'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import LikeIcon from "@material-ui/icons/FavoriteBorder"
import axios from 'axios';
import Container from '@material-ui/core/Container';

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
        
        return ( 
        <Container component="main" maxWidth="lg">
        {this.state.artifacts.map((artifact) => (
            <VerticalTimeline key={artifact._id}>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                date={artifact.artifactTime}
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
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
         );
    }
}
 
export default ArtifactTimeLine;