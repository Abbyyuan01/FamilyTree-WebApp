import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Button } from '@material-ui/core'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'

const styles = (theme) => ({
	form: {

	},
	formControl: {
		display: 'block',
	},
	label: {
		width: 100,
		display: 'inline-block',
		textAlign: 'right',
		marginRight: 10,
	},
	container: {
		maxWidth: 500,
		marginLeft: 'auto',
		marginRight: 'auto',
	},
	buttonSubmit: {
		'&:hover': {
			background: theme.palette.primary.light,
		}
	}
})

class Contact extends Component {
	state = {
		userName: '',
		userEmail: '',
		userMessage: '',
		sending: false,
		sent: false
	}

	componentDidMount() {
		ValidatorForm.addValidationRule('isRequired', value => {
			if (!value) {
				return false;
			}
			return true;
		});
		ValidatorForm.addValidationRule('min2char', value => {
			if (value.length < 2) {
				return false;
			}
			return true;
		});
		ValidatorForm.addValidationRule('min10char', value => {
			if (value.length < 10) {
				return false;
			}
			return true;
		});
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		this.setState({
			sending: true
		})

		await axios.post('/api/form', this.state)
			.then(res => {
				if (res.data.message === 'success') {
					this.setState({
						sending: false,
						sent: true
					})
				} else {
					alert("Something's not right... Would you like to try again?")
				}

			})
			.catch(err => {
				console.log('Front-end ' + err)
			})
	}

	renderForm() {
		return (
			<ValidatorForm ref='form' className='wrapper center' onSubmit={this.handleSubmit}>
				<h2 className='center' id='contact'>Contact Us</h2>
				<div className={this.props.classes.container}>
					<TextValidator
						label='Name'
						name='userName'
						type='text'
						required={true}
						value={this.state.userName}
						onChange={this.handleChange}
						autoComplete='name'
						validators={['isRequired', 'min2char']}
						errorMessages={['Please enter your name', 'Name must be a minimum of 2 characters']}
						fullWidth={true}
						margin='normal'
						variant='outlined'
						/>

					<TextValidator
						label='Email'
						name='userEmail'
						type='email'
						required={true}
						value={this.state.userEmail}
						onChange={this.handleChange}
						autoComplete='email'
						validators={['isRequired', 'isEmail']}
						errorMessages={['Please enter your email', 'Email is invalid']}
						fullWidth={true}
						margin='normal'
						variant='outlined'
						/>

					<TextValidator
						label='Tell us more'
						name='userMessage'
						type='text'
						required={true}
						multiline={true}
						rows='8'
						rowsMax='8'
						value={this.state.userMessage}
						onChange={this.handleChange}
						validators={['isRequired', 'min10char']}
						errorMessages={['Please enter your message', 'Message must be a minimum of 10 characters']}
						fullWidth={true}
						margin='normal'
						variant='outlined'
					/>
					<Button type='submit' variant='contained' color='primary' className={this.props.classes.buttonSubmit}>
						{this.state.sending ? <span><span className='fas fa-spinner fa-spin'></span> Sending</span> : 'Send message'}
					</Button>
				</div>
			</ValidatorForm>
		)
	}

	renderSuccess() {
		return (
			<div className='contact-success wrapper'>
				<h2 className='center' id='contact'>Contact Us</h2>
				<div className={'contact-success-results ' + this.props.classes.container}>
					<p>Thank you for contacting us. We'll get back to you within 5 days. Or you can <a href='mailto:familytree@gmail.com?subject=Hello%20from%20HourTech%20user'>email us directly</a>. </p>
					<p><strong>Your message</strong></p>
					<p>Name: {this.state.userName}</p>
					<p>Email: {this.state.userEmail}</p>
					<p>Message: {this.state.userMessage}</p>
				</div>
			</div>
		)
	}

	render() {
		return this.state.sent ? this.renderSuccess() : this.renderForm()
	}
}

export default withStyles(styles)(Contact)