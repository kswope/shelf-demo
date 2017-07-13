
import React from 'react';
import Data from '../../src/data/shelves'

function nbspPrepend( count, text ) {
  let result = text
  for ( let i = 0; i < count; i++ ) {
    result = "\u00a0" + result
  }
  return result;
}

class _Class extends React.Component {

  //---------------------------------------------------------------------------
  // stack count menu stuff
  //---------------------------------------------------------------------------
  handleStackCountChange( event ) {
    this.props.setStackCount( Number( event.target.value ) )
  }


  renderStackCountMenu(){

    const stackCountText = Data['menuStackCountText']

    const shelfIndex = this.props.shelves.size 
    return (
      <select className="form-control" value={ shelfIndex } onChange={ this.handleStackCountChange.bind(this) } >
        { stackCountText.map( ( text, i ) => <option key={ i } value={ i+1 }>{ nbspPrepend(1,text) }</option>  ) }
      </select>
    )
  } 


  //---------------------------------------------------------------------------
  // stack width menu stuff
  //---------------------------------------------------------------------------
  handleStackWidthChange( event ) {
    const [ stackIndex, width ] = event.target.value.split( /,/ )
    this.props.setStackWidth( Number( stackIndex ), Number( width ) )
  }


  renderStackWidthMenu( stackIndex ) {

    let stackWidthText
    if ( this.props.shelves.size === 1 ) {
      stackWidthText = [ Data[ 'menuStackWidthOnlyOneText' ] ]
    } else {
      stackWidthText = Data[ 'menuStackWidthText' ]
    }

    // extract widths from prices
    let availableWidths = Object.keys( Data[ 'bamboo' ][ 'shelf' ][ 'price' ] )

    let stackWidthHash = ( width ) => stackIndex + ',' + width

    function renderOption( width, i ) {
      let text = stackWidthText[ stackIndex ].replace( /X/, width )
      return <option key={ width } value={ stackWidthHash( width ) }>{ nbspPrepend(3,text) }</option>
    }

    let width = this.props.shelves.getIn( [ stackIndex, 'width' ] )

    return (
      <select className="form-control" value={ stackWidthHash( width ) } onChange={ this.handleStackWidthChange.bind(this) } >
      { availableWidths.map( ( width, i ) => renderOption( width, i ) ) }
      </select>
    )

  }


  //---------------------------------------------------------------------------
  // shelf count menu stuff
  //---------------------------------------------------------------------------
  handleShelfCountChange( event ) {
    let [ stackIndex, count ] = event.target.value.split( /,/ )
    this.props.setShelfCount( Number( stackIndex ), Number( count ) )
  }


  renderShelfCountMenu(stackIndex) {
  
    const shelfCountText = Data['menuShelfCountText']

    let count = this.props.shelves.getIn([stackIndex, 'heights']).size

    let stackCountHash = ( count ) => stackIndex + ',' + count
  
    return (
      <select className="form-control" value={ stackCountHash( count ) } onChange={ this.handleShelfCountChange.bind(this) } >
        { shelfCountText.map( ( text, i ) => 
          <option key={ i } value={ stackCountHash( i+1 ) }>{ nbspPrepend(5,text) }</option>  ) }
      </select>
    )
  
  }



  //---------------------------------------------------------------------------
  // shelf height menu stuff
  //---------------------------------------------------------------------------
  handleShelfHeightChange( event ) {
    let [ stackIndex, shelfIndex, height ] = event.target.value.split( /,/ )
    this.props.setShelfHeight( Number( stackIndex ), Number( shelfIndex ), Number( height ))
  }


  renderShelfHeightMenus( stackIndex ) {

    // extract availableHeights from prices
    let availableHeights =  Object.keys(Data[ 'bamboo' ][ 'feet' ]['price'])

    let shelfHeightText
    if ( this.props.shelves.getIn( [ stackIndex, 'heights' ] ).size === 1 ) {
      shelfHeightText = [ Data[ 'menuShelfHeightOnlyOneText' ] ]
    } else {
      shelfHeightText = Data[ 'menuShelfHeightText' ]
    }

    let currentHeights = this.props.shelves.getIn( [ stackIndex, 'heights' ] )

    let shelfHeightHash = ( shelf, size ) => [ stackIndex, shelf, size ].join( ',' )

    let selectOption = (i, a) => {
      let text = shelfHeightText[i].replace(/X/, a)
      text = nbspPrepend(7,text)
      return (<option key={a} value={shelfHeightHash(i,a)}>{text} </option>)
    }

    let heightMenu = (h,i) => { 
      return (
        <select className="form-control" value={shelfHeightHash(i,h)} onChange={ this.handleShelfHeightChange.bind(this) } >
          { availableHeights.map( (a) => selectOption(i,a) ) }
        </select>
      )
    } 

    // array together all height menus for this particular stack
    let heightMenus = currentHeights.map((h,i) => heightMenu(h,i) )

    return heightMenus

  }



  //---------------------------------------------------------------------------
  // stack group
  //---------------------------------------------------------------------------
  renderStackMenus() {
    return this.props.shelves.map( ( stack, i ) => {
      return [
        this.renderStackWidthMenu( i ),
        this.renderShelfCountMenu( i ),
        this.renderShelfHeightMenus( i )
      ]
    } )
  }



  //---------------------------------------------------------------------------
  render(){

    return (
      <form className="m-t-3">
        { this.renderStackCountMenu() }
        { this.renderStackMenus() } 
      </form>
    )
  }


}

export default _Class


