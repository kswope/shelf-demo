
import React from 'react';

const draw = require('../lib/drawing')
const paper = require( 'paper' )


// So we can make changes to draw and see results without reloading browser
//
// NOTE: this worked but only seemed necessary when draw() was called from
// entry.js, not within a react module
//
// if ( module.hot ) {
//   module.hot.accept( "../drawing.js", function() {
//     draw = require( '../drawing' )
//     drawFromProps()
//   } )
// }


class _Class extends React.Component {


  componentDidUpdate(){
    draw( this.props.shelves.toJS() ) // also called in componentDidMount
  }


  componentDidMount(){

    window.scrollTo(0, 0)

    // canvas setup
    const widthScaleFactor = 16 / 32
    const canvas = document.getElementById( 'myCanvas' );
    canvas.width = window.innerWidth * widthScaleFactor
    canvas.height = 600
    paper.setup( canvas );

    draw( this.props.shelves.toJS() ) // also called in componentDidUpdate

  }


  render(){
    return <canvas id='myCanvas'></canvas>
  }


}

export default _Class


