

import React from 'react';
import { Button, Modal, FormControl, FormGroup } from 'react-bootstrap';


class _Class extends React.Component {

  close(){
    this.props.setSnapshotVisibility(false)
  }

  render(){

    return (

      <Modal show={ this.props.visible } onHide={this.close.bind(this)}>

        <Modal.Header closeButton>
          <Modal.Title>Snapshot</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <p>
            The link below is a permanent &quot;snapshot&quot; in time of this current blueprint.
          </p>

          <p>
            Use it for saving (as a bookmark), emailing, linking, etc
          </p>

          <FormGroup>
            <FormControl type="text" readOnly={true} value="http://asdf/asdf/asdf" />
          </FormGroup>

          <p>
            Following the link above will start a <b>new</b> blueprint beginning at the snapshot.
          </p>

        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.close.bind(this)}>Close</Button>
        </Modal.Footer>

      </Modal>

    )

  }

}



export default _Class


