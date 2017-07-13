import React from "react"
import ReactDOM from "react-dom"
import {HashRouter, Switch, Route} from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import qs from "qs"

import { loadState, saveState } from './lib/persist_state'
import reducer from './reducers'
import App from './containers/app'
import Home from './components/home'
import "./index.css"

window.onpopstate = function( event ) {
  console.log( "location: " + document.location + ", state: " + JSON.stringify( event.state ) );
}

/* eslint-disable */
if ( window.location.search ) {
  let queryString = qs.parse( window.location.search.substr( 1 ) )
  console.log( 'queryString', queryString )
  if ( queryString && queryString.snapshot ) {
    console.log( 'queryString.snapshot!!!', queryString.snapshot )
    let withoutQs = window.location.protocol + '//' + location.host + location.pathname
    window.history.replaceState( { str: 'saved state' }, null, withoutQs );
    window.history.pushState( { str: 'snapshot' }, null, withoutQs );
  }
}
/* eslint-enable */

const rootEl = document.getElementById("root")

// ReactDOM.render(<App />, rootEl)
//
// if (module.hot) {
//   module.hot.accept("./App", () => {
//     const NextApp = require("./App").default
//     ReactDOM.render(<NextApp />, rootEl)
//   })
// }

const store = createStore( reducer, loadState())

store.subscribe( () => {
  saveState( store.getState() );
} )

ReactDOM.render( 
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/shelves' component={App} />
      </Switch>
    </HashRouter>
  </Provider>, 
  rootEl
)
