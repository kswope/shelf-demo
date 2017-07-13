


//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
export const SET_STACK_COUNT = 'SET_STACK_COUNT'

export function setStackCount( count ) {
  return {
    type: SET_STACK_COUNT,
    count
  }
}



//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
export const SET_STACK_WIDTH = 'SET_STACK_WIDTH'

export function setStackWidth( stack, width ) {
  return {
    type: SET_STACK_WIDTH,
    stack,
    width
  }
}



//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
export const SET_SHELF_HEIGHT = 'SET_SHELF_HEIGHT'

export function setShelfHeight( stack, shelf, height ) {
  return {
    type: SET_SHELF_HEIGHT,
    stack,
    shelf,
    height
  }
}



//-----------------------------------------------------------------------------
//-----------------------------------------------------------------------------
export const SET_SHELF_COUNT = 'SET_SHELF_COUNT'

export function setShelfCount( stack, count ) {
  return {
    type: SET_SHELF_COUNT,
    stack,
    count
  }
}



