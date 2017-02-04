import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { Nav } from 'components'
import { connect } from 'react-redux'
import { container, innerContainer } from './styles.css'
import * as userActionCreators from 'redux/modules/users'
import { firebaseAuth } from 'config/constants'

const MainContainer = React.createClass({
  propTypes: {
    isAuthed: PropTypes.bool.isRequired,
    authUser: PropTypes.func.isRequired,
    fetchingUserSuccess: PropTypes.func.isRequired,
    removeFetchingUser: PropTypes.func.isRequired,
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
  },
  componentDidMount () {
    firebaseAuth().onAuthStateChanged((user) => {
      if (user) {
        const userData = user.providerData[0]
        const userInfo = formatUserInfo(userData.displayName, userData.photoURL, user.uid)
        this.props.authUser(user.uid)
        this.props.fetchingUserSuccess(user.uid, userInfo, Date.now())
        if (this.props.location.pathname === '/') {
          this.context.router.replace('feed')
        }
      } else {
         this.props.removeFetchingUser()
      }
    })
  },
  render () {
    return this.props.isFetching === true
      ? null
      : <div className={container}>
          <Nav isAuthed={this.props.isAuthed} />
          <div className={innerContainer}>
            {this.props.children}
          </div>
        </div>
  },
})

export default connect(
  ({users}) => ({isAuthed: users.isAuthed, isFetching: users.isFetching}),
  (dispatch) => bindActionCreators({
    ...userActionCreators,
  }, dispatch)
)(MainContainer)