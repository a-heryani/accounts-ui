import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./style.less";
import { inviteData, sendInvite } from '../../../store/invite'
class UserAccess extends Component {
  componentWillUnmount() {
    this.props.dispatch({ type: "CLEAR_USERS" });
  }
  handleInvite = evt => {
    if(this.props.invite && this.props.invite.inviteEmail){
      this.props.dispatch(sendInvite({
        inviteeEmail: this.props.invite.inviteEmail,
        InstanceZUID: this.props.site.ZUID,
        RoleZUID: this.props.invite.inviteRole
      }))
    }else{
      console.log('invite info incomplete')// placeholder for user notice
    }
  }
  handleChange = evt => {
    if(evt.target.value.match(evt.target.pattern)){
      this.props.dispatch(inviteData({ [evt.target.name]: evt.target.value }))
    }
  }
  render() {
    return (
      <div className={styles.userAccess}>
        <div className={styles.userTable}>
          <header>
            <h3>First Name</h3>
            <h3>Last Name</h3>
            <h3>Email</h3>
            <h3>Staff</h3>
          </header>
          <main>
            {Array.isArray(this.props.sitesUsers)
              ? this.props.sitesUsers.map((user, i) => {
                  return (
                    <article key={i}>
                      <span>{user.firstName} </span>
                      <span>{user.lastName} </span>
                      <span>{user.email} </span>
                      <span>{user.staff}</span>
                    </article>
                  );
                })
              : null}
          </main>
        </div>
        <div className={styles.invite}>
          {/* <Select selection={{ value: 'editor' }}>
            <Option value="editor">Editor</Option>
            <Option value="developer">Developer</Option>
            <Option value="admin">Admin</Option>
          </Select> */}
          <Input
                type="email"
                placeholder="Email"
                name="inviteEmail"
                required
                onChange={this.handleChange}
              />
          <select name='inviteRole' onChange={this.handleChange}>
            <option value="editor">Editor</option>
            <option value="developer">Developer</option>
            <option value="admin">Admin</option>
          </select>
          <Button onClick={this.handleInvite}>Send Invite</Button>
        </div>
      </div>
    );
  }
}

export default connect(state => state)(UserAccess);