import React, { Component } from 'react'
import { connect } from 'react-redux'

import styles from './Signup.less'
import { request } from '../../../util/request'
import config from '../../../shell/config'

export default class Signup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'TEST ERROR MESSAGE, PLZ STYLE'
    }
  }
  render() {
    return (
      <section className={styles.Signup}>
        <form name="signup" className={styles.SignupForm}>
          <img src="/zesty-z-logo.svg" />
          <h2>Create an Account</h2>
          <label>
            <p>Email Address</p>
            <Input
              className={styles.input}
              type="text"
              placeholder="hello@zesty.io"
              name="email"
            />
          </label>
          <label>
            <p>First Name</p>
            <Input
              className={styles.input}
              type="text"
              placeholder="Zesty"
              name="firstName"
            />
          </label>
          <label>
            <p>Last Name</p>
            <Input
              className={styles.input}
              type="text"
              placeholder="Dotio"
              name="lastName"
            />
          </label>
          <label>
            <p>Password</p>
            <Input className={styles.input} type="password" name="pass" />
          </label>
          <Button onClick={this.handleSignup}>Create An Account</Button>
          <p className={styles.error}>{this.state.message}</p>

          <Url href="/login">Already have an account?</Url>
        </form>
      </section>
    )
  }
  handleSignup = evt => {
    evt.preventDefault()

    console.log('signup', evt)

    request(`http://{${config.API_ACCOUNTS}/user`, {
      method: 'POST',
      body: {
        email: document.forms.signup.email.value,
        firstName: document.forms.signup.firstName.value,
        lastName: document.forms.signup.lastName.value,
        password: document.forms.signup.pass.value
      }
    }).then(json => {
      if (json.code === 201) {
        // TODO Show 2FA screen
        // TODO poll auth api for 2FA one touch
        this.props.dispatch({
          type: 'FETCH_AUTH_SUCCESS',
          auth: false
        })
      } else {
        // TODO Display error message
        this.setState({
          message: json.message
        })
        this.props.dispatch({
          type: 'FETCH_AUTH_SUCCESS',
          auth: false
        })
      }
    })
  }
}
