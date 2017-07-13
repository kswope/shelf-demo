
import React from 'react';
import { Button } from 'react-bootstrap';
import ShelfUtil from '../lib/shelf_util'

class _Class extends React.Component {


  buttonClick(e){
    e.target.blur() // annoying button keeps focus
    this.props.setCartVisibility( true )
  }


  // itemCount(){
  //   return this.props.shelves.reduce( ( accum, stack ) => {
  //     accum += stack.get('heights').size // shelf
  //     accum += 2 * stack.get('heights').size // feet
  //     accum += 1 // base
  //     accum += 1 // connector pack
  //     return accum
  //   }, 0 )
  // }


  render(){
    const total = ShelfUtil.getTotalPrice( this.props.shelves )
      .toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    return (
      <Button className="main_buttons m-t-1" onClick={ this.buttonClick.bind(this) }>
        <i className="fa fa-shopping-cart"></i>
        View Cart / Checkout 
        <span>{ total }</span>
      </Button>
    )
  }


}


export default _Class


