import React from "react"
import { Button } from "react-bootstrap"

class _Class extends React.Component {
  buttonClick(e) {
    alert("YOU ARE NOW ON AMAZON.COM")
    e.target.blur() // annoying button keeps focus
  }

  render() {
    return (
      <Button
        className="main_buttons m-t-1"
        onClick={this.buttonClick.bind(this)}
      >
        Checkout at <img alt="amazon logo" src={require("../assets/images/amazon_logo.png")} />
      </Button>
    )
  }
}

export default _Class
