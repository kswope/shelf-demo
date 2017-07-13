
import Immutable from 'immutable'

import {
  SET_CART_VISIBILITY
} from '../actions/cart'


var initialState = Immutable.fromJS( { visible: false } )


export default function reducer( state = initialState, action ) {

  switch ( action.type ) {
    case SET_CART_VISIBILITY:
      return state.updateIn( [ 'visible' ], () => action.visible )
    default:
      return state
  }

}
