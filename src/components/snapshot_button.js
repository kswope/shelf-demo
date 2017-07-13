import React from "react"
import { Button } from "react-bootstrap"

class _Class extends React.Component {
  buttonClick(e) {
    e.target.blur() // annoying button keeps focus
    this.props.setSnapshotVisibility(true)
  }

  render() {
    return (
      <Button
        className="main_buttons m-t-3"
        onClick={this.buttonClick.bind(this)}
      >
        <i className="fa fa-clone" />
        <span>Take Snapshot</span>
      </Button>
    )
  }
}

export default _Class
