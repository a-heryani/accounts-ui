import { request } from '../../../../util/request'
import config from '../../../../shell/config'

export function sitesUsers(state = {}, action) {
  switch (action.type) {
    case 'FETCHING_USERS':
      return state
    case 'FETCH_USERS_SUCCESS':
      return action.users
    case 'FETCH_USERS_ERROR':
      return state
    case 'CLEAR_USERS':
      return null
    default:
      return state
  }
}

export const fetchSiteUsers = (userZuid, siteZuid) => {
  console.log('user: ', userZuid, 'site: ', siteZuid)
  return dispatch => {
    dispatch({
      type: 'FETCHING_USERS'
    })

    request(`http://${config.API_ACCOUNTS}/instances/${siteZuid}/users`)
      .then(users => {
        dispatch({
          type: 'FETCH_USERS_SUCCESS',
          users
        })
      })
      .catch(err => {
        console.error(err)
        dispatch({
          type: 'FETCH_USERS_ERROR',
          err
        })
      })
  }
}
