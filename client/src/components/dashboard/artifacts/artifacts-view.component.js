/**
 * artifactview component: view all artifacts and view one artifact 
 * and information of that artifact
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import { fade, withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import Lightbox from "react-image-lightbox";
import LikeIcon from "@material-ui/icons/FavoriteBorder"
import LikedIcon from "@material-ui/icons/Favorite"
import ShareIcon from "@material-ui/icons/Share";
import Popover from '@material-ui/core/Popover';
import {Waypoint} from "react-waypoint";
import Slide from "@material-ui/core/Slide";
import "react-image-lightbox/style.css";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/DeleteRounded';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: theme.spacing(5),
    flexGrow: 1
  },
  gridList: {
    width: 'flex',
    height:'flex',
    // backgroundColor: "#f3f3f3",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  // button: {
  //   padding: '30px',
  //   margin: theme.spacing(1)
  // }
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
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
       
        this.handleLike = this.handleLike.bind(this);
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

    handleLike(){
      console.log("like");
    }

    handleEdit () {

    };

    handleDelete(id) {
      axios.delete('/artifacts/'+id)
        .then(response => { console.log(response.data)});
      this.setState({
        artifacts: this.state.artifacts.filter(el => el._id !== id)
      })
    }

    render (){
        const {classes, theme} = this.props;

        const singleArtifactButtons  =  [
          <IconButton aria-label="like" className={classes.margin}  onClick={this.handleLike}>
            <LikeIcon color="secondary"/>
          </IconButton>,
          <IconButton aria-label="share" className={classes.margin}  onClick={this.handleShare}>
            <ShareIcon color="primary"/>
          </IconButton>    
        ];

        return (
            <div className={classes.root}>
              <Container component="main" maxWidth="lg">
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
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
                          subtitle={<span>by: {artifact.user.username}</span>}
                          actionIcon={[
                            <IconButton aria-label={'edit'} className={classes.icon} onClick={this.handleEdit}>
                              <EditIcon />
                            </IconButton>,
                            <IconButton aria-label={'delete'} className={classes.icon} onClick={()=>{this.handleDelete(artifact._id)}}>
                              <DeleteIcon />
                            </IconButton>
                          ]
                          }
                          />
                      </GridListTile>
                      ))}
                  </GridList>
                  </Slide>{" "}
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
                imageTitle={`
                  ${this.state.artifacts[this.state.photoIndex].name} - 
                  By ${this.state.artifacts[this.state.photoIndex].user.username}
                  `
                }
                imageCaption={
                  <div>
                     <Typography variant="body1" gutterBottom>
                     {this.state.artifacts[this.state.photoIndex].description}
                     </Typography>
                     <Typography variant="subtitle2" gutterBottom>
                     {this.state.artifacts[this.state.photoIndex].artifactTime}
                     </Typography>
                  </div> 
                                            
                  }
                  toolbarButtons={singleArtifactButtons}
                
              />
            ) : null}
          </div>
        )
    }
}


ArtifactView.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
  };
  
export default withStyles(styles)(ArtifactView);