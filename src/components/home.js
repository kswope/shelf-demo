
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom'

// require("jsonlylightbox/css/lightbox.css")
// require("!script!../lib/lightbox.js")
// require("../lib/lightbox.js")
import Lightbox from "../lib/lightbox.js"

class _Class extends React.Component {

  startSlideShow(){

    const slides = document.getElementsByClassName('bp-slide')

    function displayOnlyOne( theOneIndex ) {
      for ( let i = 0; i < slides.length; i++ ) {
        slides[ i ].style.display = "none"
      }
      slides[ theOneIndex ].style.display = "block"
    }

    displayOnlyOne(0)

    let intervalIndex = 1 // 0 already displayed
    let interval = 1500

    this.slideshowIntervalID = setInterval( function() {
      if ( intervalIndex === slides.length ) intervalIndex = 0 // reset
      displayOnlyOne( intervalIndex )
      intervalIndex++
    }, interval )

  }


  componentDidMount() {
    this.startSlideShow()
    new Lightbox().load( { boxId: 'lightbox_anchor' } )
  }


  componentWillUnmount() {
    clearInterval( this.slideshowIntervalID )
  }


  render(){

    return (

      <div>

        { /* header row */ }
        <Row className='row'>
          <Col xs={3}>
            <img alt="shelf" src={require('../assets/images/fullfillment_by_amazon.png')} className='amazon_badge' />
          </Col>
          <Col xs={6}>
            <h1 className='text-center'>Company Name Here</h1>
          </Col>
          <Col xs={3}>
            <img alt="shelf" src={require('../assets/images/amazon_payments.png')} className='amazon_badge' />
          </Col>
        </Row>


        { /* body row */ }
        <div className='row'>

          { /* left column */ }
          <Col xs={3}>
            <Row>
              <Col xs={12}>
                <img alt="shelf" src={require('../assets/images/showcase/one.jpg')} className='showcase' data-jslghtbx={require('../assets/images/showcase/one.jpg')} />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <img alt="shelf" src={require('../assets/images/showcase/two.jpg')} className='showcase' />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <img alt="shelf" src={require('../assets/images/showcase/three.jpg')} className='showcase' />
              </Col>
            </Row>
          </Col>

          { /* demo and button row */ }
          <div className='col-xs-6'>

            <div id='blueprint_slideshow'>
              <img alt="shelf" className='bp-slide' src={require('../assets/images/blueprint-slideshow/blueprint-1480053013319.svg')} />
              <img alt="shelf" className='bp-slide' src={require('../assets/images/blueprint-slideshow/blueprint-1480053056404.svg')} />
              <img alt="shelf" className='bp-slide' src={require('../assets/images/blueprint-slideshow/blueprint-1480053109841.svg')} />
              <img alt="shelf" className='bp-slide' src={require('../assets/images/blueprint-slideshow/blueprint-1480053821588.svg')} />
              <img alt="shelf" className='bp-slide' src={require('../assets/images/blueprint-slideshow/blueprint-1480053207183.svg')} />
            </div>

            <Link to='/shelves' id='btn_to_blueprint' className='btn btn-lg btn-warning'>
              Design Yours Now
            </Link>

          </div>

          { /* right column */ }
          <Col xs={3}>
            <Row>
              <Col xs={12}>
                <img alt="shelf" src={require('../assets/images/showcase/four.jpg')} className='showcase' />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <img alt="shelf angle" src={require('../assets/images/showcase/five.jpg')} className='showcase' />
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <img alt="shelf angle" src={require('../assets/images/showcase/six.jpg')} className='showcase' />
              </Col>
            </Row>
          </Col>

        </div>

      </div>
    )
  }

}

export default _Class


