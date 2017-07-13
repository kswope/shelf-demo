
// util functions for working with shelf data

import ShelfData from '../data/shelves'

var Immutable = require( 'immutable' );



// ----------------------------------------------------------------------------
// Return the total cost of passed in stacks
// ----------------------------------------------------------------------------
function getTotalPrice(shelves){

  let total = shelves.reduce( function( accum, stack, index ) {

    accum +=  stack.get( 'heights' ).reduce( function( accum, height ) {
      accum += ShelfData[ 'bamboo' ][ 'shelf' ][ 'price' ][ stack.get( 'width' ) ]
      accum += ShelfData[ 'bamboo' ][ 'feet' ][ 'price' ][ height ] * 2
      accum += ShelfData['connectorPackPrice']
      return accum
    }, 0 )

    return accum

  }, 0)

  return total

}


// ----------------------------------------------------------------------------
// Note: if count is increased we add shelfs using the current top shelf
// height, if count is decreased we just truncate the heights array
// ----------------------------------------------------------------------------
function setShelfCount( data, stack, count ) {

  var currentSize = data.getIn( [ stack, 'heights' ] ).size
  var path = [ stack, 'heights' ]

  if ( count < currentSize ) {

    return data.updateIn( path, heights => heights.setSize( count ) )

  } else if ( count > currentSize ) {

    let topHeight = data.getIn( path ).last()
    let deficit = count - currentSize

    for(let i=0; i < deficit; i++){
      data = data.updateIn( path, heights => heights.push( topHeight ) )
    }

    return data

  } else {

    return data

  }

}


// ----------------------------------------------------------------------------
// if count is increased we duplicate the last stack
// ----------------------------------------------------------------------------
function setStackCount( data, count ) {

  var currentSize = data.size

  if ( count < currentSize ) {

    return data.setSize( count )

  } else if ( count > currentSize ) {

    let deficit = count - currentSize
    for(let i=0; i < deficit; i++){
      // push clone, not copy
      data = data.push( Immutable.fromJS( data.last().toJS() ) )
    }
    return data

  } else {

    return data

  }


}



// ----------------------------------------------------------------------------
export default {
  setShelfCount,
  setStackCount,
  getTotalPrice
}
