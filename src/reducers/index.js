
import { combineReducers } from 'redux-immutable'
import shelves from './shelves'
import cart from './cart'
import snapshot from './snapshot'

export default combineReducers( {
  shelves,
  snapshot,
  cart
} )
