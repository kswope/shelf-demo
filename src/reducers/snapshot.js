
import Immutable from 'immutable'

import {
  SET_SNAPSHOT_VISIBILITY
} from '../actions/snapshot'


var initialState = Immutable.fromJS( {
  visible: false,
}, )


export default function reducer( state = initialState, action ) {

  switch ( action.type ) {

    case SET_SNAPSHOT_VISIBILITY:

      return state.updateIn( [ 'visible' ], () => action.visible )

    default:

      return state

  }

}
