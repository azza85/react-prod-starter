import React, { PropTypes } from 'react'
import { User } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { staleUser } from 'helpers/utils'
import * as usersActionCreators from 'redux/modules/users'

const UserContainer = React.createClass({
  propTypes: {
    name: PropTypes.string.isRequired,
    noUser: PropTypes.bool.isRequired,
    isFetching: PropTypes.bool.isRequired,
    error: PropTypes.string.isRequired,
    lastUpdated: PropTypes.number.isRequired,
    routeParams: PropTypes.shape({uid: PropTypes.string.isRequired}),
    fetchAndHandleUser: PropTypes.func.isRequired,
  },
  componentDidMount () {
    const uid = this.props.routeParams.uid
    if (this.props.noUser === true || staleUser(this.props.lastUpdated)) {
      this.props.fetchAndHandleUser(uid)
    }
  },
  render () {
    return (
      <User
        noUser={this.props.noUser}
        isFetching={this.props.isFetching}
        name={this.props.name}
        error={this.props.error} />
    )
  },
})

function mapStateToProps ({users}, props) {
  const user = users[props.routeParams.uid]
  const noUser = typeof user === 'undefined'
  const name = noUser ? '' : user.info.name
  return {
    noUser,
    name,
    isFetching: users.isFetching || true,
    error: users.error || 'error',
    lastUpdated: 0,
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    ...usersActionCreators,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserContainer)