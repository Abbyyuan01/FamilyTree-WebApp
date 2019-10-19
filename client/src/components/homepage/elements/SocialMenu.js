import React from 'react'
import { withStyles } from '@material-ui/core/styles'

const styles = theme => ({
  root: {
		flexGrow: 0,
		flexBasis: 50,
		[theme.breakpoints.down('sm')]: {
			// flexBasis: '100%',
		},
  },
  rootFlex: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: theme.palette.primary.main,
  }
})

const pages = ['facebook', 'instagram', 'twitter']
const navLinks = pages.map((page, i) => (
    <li
      style={{ marginLeft: 15, marginRight: 15 }}
      key={i}
    >
      <a href={'https://' + page + '.com'} target='_blank' rel='noopener noreferrer'>
        <span className={'fab fa-' + page}></span>
      </a>
    </li>
  )
)

const SocialMenu = (props) => (
  <nav className={props.classes.root}>
    <ul className={props.classes.rootFlex}>{navLinks}</ul>
  </nav>
)

export default withStyles(styles)(SocialMenu)