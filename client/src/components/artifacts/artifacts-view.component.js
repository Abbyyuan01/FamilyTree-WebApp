import React, { Component } from 'react'
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardActionArea from '@material-ui/core/CardActionArea';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography'; 
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import { Link } from 'react-router-dom'
import  Navbar  from '../navbar/navbar.component'

const styles = {
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
}

class ArtifactView extends Component {
    constructor(props){
        super(props);
        this.state = {artifacts: []} 
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
    }

    
    render (){
        const classes = this.props;
        return (
            <div className={classes.root}>
            <Container maxWidth="lg">
                <div className={classes.root}>
                <GridList cellHeight={300} className={classes.gridList} cols={4} spacing={30}>
                    {/* <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                    <ListSubheader component="div">December</ListSubheader>
                    </GridListTile> */}
                    {this.state.artifacts.map(artifact => (
                    <GridListTile key={artifact._id}>
                        <img src={artifact.url} alt={artifact.name} />
                        <GridListTileBar
                        title={artifact.name}
                        subtitle={<span>by: {artifact.userID}</span>}
                        actionIcon={
                            <IconButton aria-label={`info about ${artifact.name}`} className={classes.icon}>
                            <InfoIcon />
                            </IconButton>
                        }
                        />
                    </GridListTile>
                    ))}
                </GridList>
                </div>
            </Container>
            </div>
        )
    }
}


// const styles = {
//   card: {
//     maxWidth: 200,
//   },
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: "#f3f3f3",
//   },
//   gridList: {
//     width: 500,
//     height: 450,
//   },
//   icon: {
//     color: 'rgba(255, 255, 255, 0.54)',
//   },
// }

// class ArtifactView extends Component {
//   render(){
//     const classes = this.props;
//     return (
//         <div className={classes.root}>
//             <GridList cellHeight={500} className={classes.gridList}>
//                 <Card className={classes.card}>
//                 <CardActionArea>
//                     <CardMedia
//                     component="img"
//                     alt="Contemplative Reptile"
//                     height="300"
//                     // image="/static/images/cards/contemplative-reptile.jpg"
//                     image="https://croweandassociates.com/wp-content/uploads/2017/07/guidelines.jpg"
//                     title="Contemplative Reptile"
//                     />
//                     <CardContent>
//                     <Typography gutterBottom variant="h5" component="h2">
//                         Lizard
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" component="p">
//                         Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//                         across all continents except Antarctica
//                     </Typography>
//                     </CardContent>
//                 </CardActionArea>
//                 <CardActions>
//                     <Button size="small" color="primary">
//                     Share
//                     </Button>
//                     <Button size="small" color="primary">
//                     Learn More
//                     </Button>
//                 </CardActions>
//                 </Card>
//                 <Card className={classes.card}>
//                 <CardActionArea>
//                     <CardMedia
//                     component="img"
//                     alt="Contemplative Reptile"
//                     height="300"
//                     // image="/static/images/cards/contemplative-reptile.jpg"
//                     image="https://croweandassociates.com/wp-content/uploads/2017/07/guidelines.jpg"
//                     title="Contemplative Reptile"
//                     />
//                     <CardContent>
//                     <Typography gutterBottom variant="h5" component="h2">
//                         Lizard
//                     </Typography>
//                     <Typography variant="body2" color="textSecondary" component="p">
//                         Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
//                         across all continents except Antarctica
//                     </Typography>
//                     </CardContent>
//                 </CardActionArea>
//                 <CardActions>
//                     <Button size="small" color="primary">
//                     Share
//                     </Button>
//                     <Button size="small" color="primary">
//                     Learn More
//                     </Button>
//                 </CardActions>
//                 </Card>
//             </GridList>
//         </div>
//     )
//   }
// }

ArtifactView.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
export default withStyles(styles)(ArtifactView);