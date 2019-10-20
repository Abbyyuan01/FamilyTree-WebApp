/**
 * artifactview component: view all artifacts and view one artifact 
 * and information of that artifact
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import { fade,withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Lightbox from "react-image-lightbox";
import LikeIcon from "@material-ui/icons/FavoriteBorder"
import ShareIcon from "@material-ui/icons/Share";
import {Waypoint} from "react-waypoint";
import Slide from "@material-ui/core/Slide";
import "react-image-lightbox/style.css";
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from "react-redux";


const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: theme.spacing(5)
  },
  gridList: {
    width: 'flex',
    height:'flex',
    // backgroundColor: "#f3f3f3",
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
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
          filteredArtifacts: [],
          date: new Date().toLocaleString(),
          search: '',
          entered: false,
          photoIndex: 0,
          imageOpen: false,
          diaOpen: false,
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
                      artifacts: response.data,
                      filteredArtifacts: response.data
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

    onKeyDown = event => {
      if (event.target.value != null) {
        this.setState({search: event.target.value.substr(0,20)})
      }
    }

    render (){
        const {classes, theme} = this.props;
        const { user } = this.props.auth;

        var visibleUser;
        let visibleArtifacts = this.state.artifacts.filter((artifact)=>{
          console.log(artifact.visibility)
           for (visibleUser of artifact.visibility){
             console.log(visibleUser)
             if (user.username === visibleUser){
               return artifact
             }
           }
        })

        console.log(visibleArtifacts)

        
        let filteredArtifacts = visibleArtifacts.filter((artifact)=>{
          return artifact.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
        })

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
                    onChange={this.onKeyDown}
                  />
                </div>
              <Container component="main" maxWidth="lg">
                  <Waypoint
                    onEnter={() => {
                      this.setState({ entered: true });
                    }}
                  />
                  <Slide direction={"left"} in={this.state.entered}>
                  <GridList cellHeight={300} className={classes.gridList} cols={4} spacing={30}>
            
                      <GridListTile key="Subheader" cols={4} style={{ height: 'auto' }}>
                      {/* <ListSubheader component="div">December</ListSubheader> */}
                      </GridListTile>
                      {filteredArtifacts.map((artifact,index) => (
                        <GridListTile key={artifact._id + index}>
                            <img src={artifact.url} alt={artifact.name} onClick={() => {
                                  this.imageToggle(index);
                                }}/>
                            <GridListTileBar
                            title={artifact.name}
                            subtitle={<span>by: {artifact.user.username}</span>}

                            />      
                        </GridListTile>
                      ))}
                  </GridList>
                  </Slide>{" "}
                </Container>

              {this.state.imageOpen ? (
              <Lightbox
                mainSrc={filteredArtifacts[this.state.photoIndex].url}
                nextSrc={
                  filteredArtifacts[(this.state.photoIndex + 1) % filteredArtifacts.length].url
                }
                prevSrc={
                  filteredArtifacts[
                    (this.state.photoIndex + filteredArtifacts.length - 1) % filteredArtifacts.length
                  ].url
                }

                onCloseRequest={() => this.setState({ imageOpen: false })}
                onMovePrevRequest={() =>
                  this.setState({
                    photoIndex:
                      (this.state.photoIndex + filteredArtifacts.length - 1) %
                      filteredArtifacts.length
                  })
                }
                onMoveNextRequest={() =>
                  this.setState({
                    photoIndex: (this.state.photoIndex + 1) % filteredArtifacts.length
                  })
                }
                imageTitle={`
                  ${filteredArtifacts[this.state.photoIndex].name} - 
                  By ${filteredArtifacts[this.state.photoIndex].user.username}
                  `
                }
                imageCaption={
                  <div>
                     <Typography variant="body1" gutterBottom>
                     {filteredArtifacts[this.state.photoIndex].description}
                     </Typography>
                     <Typography variant="subtitle2" gutterBottom>
                     {new Date(filteredArtifacts[this.state.photoIndex].artifactTime).toLocaleDateString()}
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
    theme: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
  };
  
const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(mapStateToProps)(withStyles(styles)(ArtifactView));

