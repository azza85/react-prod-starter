
import React, { PropTypes } from 'react'
import { userContainer, header } from './styles.css'
import { errorMsg } from 'sharedStyles/styles.css'

User.propTypes = {
  noUser: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
}

export default function User (props) {
  return props.noUser === true
    ? <p className={header}>{'This user doesnt exist. 👽'}</p>
    : <div>
        {props.isFetching === true
          ? <p className={header}>{'Loading'}</p>
          : <div>
              <div className={userContainer}>
                <div>{props.name}</div>
              </div>
            </div>}
        {props.error ? <p className={errorMsg}>{props.error}</p> : null}
      </div>
}