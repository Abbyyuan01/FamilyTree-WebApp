import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
	flexChildren: {
		flexBasis: 350,
		margin: '1rem 3rem',
		flexShrink: 1,
		[theme.breakpoints.down('768')]: {
				flexBasis: 350,
				margin: '1rem 0',
		},
	},
	image: {
		maxHeight: 150,
		borderRadius: 15,
	},
	connect: {
		marginLeft: 5,
		marginRight: 5,
		color: theme.palette.secondary.main,
		fontSize: 30,
		'&:hover': {
			color: theme.palette.primary.main,
		}
	}
})

const Member = (props) => (
    <div className={props.classes.flexChildren}>
        <img src={props.memberImg} alt={props.memberName + "'s photo" }className={props.classes.image} />
        <h3>{props.memberName}</h3>
        <p style={{ fontWeight: 600 }}>{props.memberRole}</p>
        <p>{props.memberDesc}</p>
        <p>
            <a href={props.memberLinkedin} target="_blank" rel="noopener noreferrer" className={props.classes.connect}><span className="fab fa-linkedin"></span></a>
            {props.memberGithub ? <a href={props.memberGithub} target="_blank" rel="noopener noreferrer" className={props.classes.connect}><span className="fab fa-github"></span></a> : null}
        </p>
    </div>
)

export default (withStyles)(styles)(Member)