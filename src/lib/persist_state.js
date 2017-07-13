
import Immutable from 'immutable'

// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage#/tab-transcript
// NOTE: I added immutable.js


export function loadState() {
  try {
    const serializedState = localStorage.getItem( 'state' )
    if ( serializedState === null ) {
      return Immutable.fromJS( {} )
    }
    return Immutable.fromJS( JSON.parse( serializedState ) )
  } catch ( err ) {
    return Immutable.fromJS( {} )
  }
}



export function saveState( state ) {
  try {
    const serializedState = JSON.stringify( state.toJS() )
    localStorage.setItem( 'state', serializedState )
  } catch ( err ) {
    // Ignore write errors.
  }
}
