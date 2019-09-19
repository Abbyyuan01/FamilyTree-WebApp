import React, { Component } from 'react'
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Lightbox from "react-image-lightbox";
import {Waypoint} from "react-waypoint";
import Slide from "@material-ui/core/Slide";
import "react-image-lightbox/style.css";


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: "#f3f3f3",
  },
  gridList: {
    width: 500,
    height: 600,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  button: {
    padding: '30px',
    margin: theme.spacing(1)
  }

})

class ArtifactView extends Component {
    constructor(props){
        super(props);
        this.state = {
          artifacts: [],
          entered: false,
          photoIndex: 0,
          imageOpen: false,
          snackOpen: true,
          width: window.innerWidth,
          height: window.innerHeight,
          
        } 
       
        // this.handleClick = this.handleClick.bind(this);
    }

    //load before everything
    componentDidMount() {
        axios.get('http://localhost:5000/artifacts/')
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

          this.updateWindowDimensions();
          window.addEventListener("resize", this.updateWindowDimensions);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.updateWindowDimensions);
    }

    updateWindowDimensions = () => {
      var width = window.innerWidth;
      var height = window.innerHeight;
      // find out which adjusted dimension is smaller so there can be a square that fits in the screen
      this.setState({ width: width, height: height });
    };

  
    imageToggle = num => {
      console.log("clicked");
      this.setState({ photoIndex: num, imageOpen: !this.state.imageOpen });
    };

    // handleClick(){
    //   this.props.history.push("/dashboard/upload");
    // }

    render (){
        const classes = this.props;

        return (
            <div className={classes.root}>
              <Container maxWidth="lg">
                  <div className={classes.root}>
                      {/* <Button variant="contained" 
                              color="primary" 
                              className={classes.button}
                              onClick={this.handleClick}
                            >
                        Upload Artifacts
                      </Button> */}
                  </div>
                  <div className={classes.root}>
                  <Waypoint
                    onEnter={() => {
                      this.setState({ entered: true });
                    }}
                  />
                  <Slide direction={"left"} in={this.state.entered}>
                  <GridList cellHeight={300} className={classes.gridList} cols={4} spacing={30}>
                      {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                      <ListSubheader component="div">December</ListSubheader>
                      </GridListTile> */}
                      {this.state.artifacts.map((artifact,index) => (
                      <GridListTile key={artifact._id + index}>
                          <img src={artifact.url} alt={artifact.name} onClick={() => {
                                this.imageToggle(index);
                              }}/>{" "}
                          <GridListTileBar
                          title={artifact.name}
                          subtitle={<span>by: {artifact.userID}</span>}
                          actionIcon={
                              <IconButton aria-label={`info about ${artifact.name}`} className={classes.icon}
                              >
                              <InfoIcon />
                              </IconButton>
                          }
                          />
                      </GridListTile>
                      ))}
                  </GridList>
                  </Slide>{" "}
                  </div>
              </Container>
              {this.state.imageOpen ? (
              <Lightbox
                mainSrc={this.state.artifacts[this.state.photoIndex].url}
                nextSrc={
                  this.state.artifacts[(this.state.photoIndex + 1) % this.state.artifacts.length].url
                }
                prevSrc={
                  this.state.artifacts[
                    (this.state.photoIndex + this.state.artifacts.length - 1) % this.state.artifacts.length
                  ].url
                }
                onCloseRequest={() => this.setState({ imageOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex:
                      (this.state.photoIndex + this.state.artifacts.length - 1) %
                      this.state.artifacts.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (this.state.photoIndex + 1) % this.state.artifacts.length
                  })
                }
                imageTitle={this.state.artifacts[this.state.photoIndex].name}
                imageCaption={this.state.artifacts[this.state.photoIndex].description}
              />
            ) : null}
            </div>
        )
    }
}



ArtifactView.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(ArtifactView);