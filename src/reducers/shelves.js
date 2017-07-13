
import Immutable from 'immutable'
import ShelfUtil from '../lib/shelf_util'

import {
  SET_STACK_WIDTH,
  SET_STACK_COUNT,
  SET_SHELF_HEIGHT,
  SET_SHELF_COUNT
} from '../actions/shelves'


// initial state is also default shelf configuration
var initialState = Immutable.fromJS( [
  {
    width: 30,
    heights: [ 16, 12, 8 ]
  },
] )


export default function reducer( state = initialState, action ) {

  switch ( action.type ) {

    case SET_STACK_WIDTH:

      return state.updateIn( [ action.stack, 'width' ], () => action.width )

    case SET_SHELF_HEIGHT:

      return state.updateIn( [ action.stack, 'heights', action.shelf ], () => action.height )

    case SET_SHELF_COUNT:

      return ShelfUtil.setShelfCount( state, action.stack, action.count )

    case SET_STACK_COUNT:

      return ShelfUtil.setStackCount( state, action.count )

    default:

      return state

  }

}
