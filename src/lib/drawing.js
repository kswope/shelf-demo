
let paper = require( 'paper' )


let boardThickness = 0.75 // inches or unit used in shelf width
let baseHeight = 2 // height of the base shelf legs
let viewPadding = 150 // padding inside canvas ( should be enough to accomodate outside diminsion indicators )


const horizontal = Symbol('horizontal')
const vertical = Symbol('vertical')


function maxStacksWidth( stacks ) {
  return stacks.reduce( ( accum, stack ) => accum + stack.width, 0 )
}


function maxStacksHeight( stacks, boardThickness ) {
  return stacks.map( function( stack ) {
    return stack.heights.reduce( ( accum, height ) => accum + height + boardThickness, 0 )
  } ).sort( ( a, b ) => b - a )[ 0 ]
}


// calculate fit in view, this is mathy
function createPixelScaler( viewSize, stacks, padding, baseHeight ) {

  let maxWidth = maxStacksWidth(stacks)
  let maxHeight = maxStacksHeight(stacks, boardThickness)

  // add on shelf base
  // maxHeight = maxHeight + baseHeight
  maxHeight += baseHeight

  // apply padding to viewSize just by trimming it off
  viewSize = { width: viewSize.width - padding, height: viewSize.height - padding }

  // try making maxWidth the same size as viewSize.width using that algebra thing 
  let shelfheight2 = ( maxHeight * viewSize.width ) / maxWidth

  let scalingFactor // amount to scale pixels to achieve best fit

  // if resized shelfheight2 fits inside existing viewSize.height then we have a good fit
  if ( shelfheight2 <= viewSize.height ) {
    scalingFactor = shelfheight2 / maxHeight
  } else {
    // repeat procedure above but instead expand maxHeight to match viewSize.height
    let shelfwidth2 = ( maxWidth * viewSize.height ) / maxHeight
    scalingFactor = shelfwidth2 / maxWidth
  }

  return ( x ) => x * scalingFactor

}


// draws individual board, 'x' is horizontal is 'y' is vertical
function createBoard( x, y, length, pxsr, orientation, color = 'white' ) {

  let thickness = pxsr(boardThickness)
  length = pxsr(length)

  let [ width, height ] = orientation === horizontal ? [ length, thickness ] : [ thickness, length ]

  let rect = new paper.Rectangle( x, y, width, height )
  let path = new paper.Path.Rectangle( rect )
  path.strokeColor = color
  path.strokeWidth = 1
  return path

}


function createSides( x, y, height, stackWidth, pxsr ) {

  let thickness = pxsr(boardThickness)
  return [
    createBoard( x, y + thickness, height, pxsr, vertical ),
    createBoard( x + pxsr( stackWidth ) - thickness, y + thickness, height, pxsr, vertical )
  ]
}


function draw(stacks){

  paper.project.clear()

  // // background
  // let background = new paper.Shape.Rectangle( {
  //   rectangle: paper.view.bounds,
  //   fillColor: '#6666cc'
  // } );

  let pxsr = createPixelScaler( paper.view.viewSize, stacks, viewPadding, baseHeight )

  let group = new paper.Group()

  let x = 0
  for( let stack of stacks ) {

    let y = 0

    // create base
    group.addChild( createBoard( x, y, stack.width, pxsr, horizontal ) )

    // draw bases two 'feet'
    for ( let side of createSides( x, y, baseHeight, stack.width, pxsr ) ) {
      group.addChild( side )
    }

    for ( let [ , height ] of stack.heights.entries() ) {
      y -= ( pxsr( height ) + pxsr( boardThickness ) )
      // draw shelf horizontal board
      group.addChild( createBoard( x, y, stack.width, pxsr, horizontal ) )
      // draw shelfs two 'feet'
      for ( let side of createSides( x, y, height, stack.width, pxsr ) ) {
        group.addChild( side )
      }
    }

    x += ( pxsr( stack.width ) )

  }

  // center total shelf image in canvas
  group.position = paper.view.center

  // add total size text
  {
    let height = maxStacksHeight( stacks, boardThickness )
    let width = maxStacksWidth( stacks )
    let content = `Total width ${width}"   Total Height ${height}"`
    let text = new paper.PointText( {
      content: content,
      fillColor: 'white',
      fontFamily: 'Courier New',
      fontWeight: 'normal',
      fontSize: 15
    } );
    let textGroup = new paper.Group()
    textGroup.addChild( text )
    textGroup.position.x = paper.view.center.x
    textGroup.position.y = paper.view.viewSize.height - 20
  }


  // temporary download button
  {

    let text = new paper.PointText( {
      content: "\uf030",
      fillColor: 'white',
      fontFamily: 'FontAwesome',
      fontWeight: 'normal',
      fontSize: 15
    } );

    text.position.x = paper.view.viewSize.width - 20
    text.position.y = paper.view.viewSize.height - 17
    text.onClick = function(){
      var XMLS = new XMLSerializer(); 
      let fileName = 'blueprint-' + Date.now() + '.svg'
      require( "downloadjs" )( XMLS.serializeToString( paper.project.exportSVG() ), fileName, 'text/plain' );
    }

  }

  // get groups off sub pixel boundary to prevent blurry lines
  // paper.view.translate( new paper.Point( 0.5, 0.5 ) )

  paper.view.draw();

}

module.exports = draw

