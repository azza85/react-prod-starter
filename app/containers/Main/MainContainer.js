import React from 'react'
import { Nav } from 'components'

const MainContainer = React.createClass({
  render () {
    return (
      <div>
        <Nav isAuthed={true} />
        <div>
          {this.props.children}
        </div>
      </div>
    )
  },
})

export default MainContainer
