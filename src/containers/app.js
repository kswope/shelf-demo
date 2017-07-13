
import React from 'react';
import { connect } from 'react-redux'
import ShelfMenu from '../components/shelf_menu'
import { Row, Col } from 'react-bootstrap';

import SnapshotButton from '../components/snapshot_button'
import CartButton from '../components/cart_button'
// import CheckoutButton from '../components/checkout_button'

import CartModal from '../components/cart_modal'
import SnapshotModal from '../components/snapshot_modal'

import BluePrint from '../components/blueprint'

import { setSnapshotVisibility } from '../actions/snapshot'
import { setCartVisibility } from '../actions/cart'

import {
  setStackCount,
  setStackWidth,
  setShelfCount,
  setShelfHeight,
} from '../actions/shelves'


class App extends React.Component {


  buttonMenuColContent(){

    return (

      <div>

        <SnapshotButton setSnapshotVisibility = { this.props.setSnapshotVisibility } />

        <SnapshotModal setSnapshotVisibility = { this.props.setSnapshotVisibility } 
                       visible = { this.props.snapshot_visible } />

        <CartButton setCartVisibility = { this.props.setCartVisibility }
                    shelves = { this.props.shelves } />

        <CartModal setCartVisibility = { this.props.setCartVisibility } 
                   shelves = { this.props.shelves } 
                   visible = { this.props.cart_visible } />

        { /* <CheckoutButton /> */ }

        <ShelfMenu setStackCount = { this.props.setStackCount }
                   setStackWidth = { this.props.setStackWidth }
                   setShelfCount = { this.props.setShelfCount } 
                   setShelfHeight = { this.props.setShelfHeight }
                   shelves = { this.props.shelves } />

      </div>

    )

  }



  render() {

    console.log("rendering app.js")

    return (

      <div>

        <Row>
          <Col xs={12} >
            <BluePrint shelves = { this.props.shelves } />
          </Col>
        </Row>

        <Row>
          <Col xs={6} xsOffset={3} >
            { this.buttonMenuColContent.bind(this)() }
          </Col>
        </Row>

      </div>

    )
  }
}


function mapStateToProps( state ) {
  return {
    snapshot_visible: state.getIn( [ 'snapshot', 'visible' ] ),
    cart_visible: state.getIn( [ 'cart', 'visible' ] ),
    shelves: state.get('shelves'),
  }
}


let mapDispatchToProps = {
  setSnapshotVisibility,
  setCartVisibility,
  setStackCount,
  setStackWidth,
  setShelfCount,
  setShelfHeight,
}


export default connect( mapStateToProps, mapDispatchToProps )( App )



