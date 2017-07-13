import React from "react"
import { Button, Modal } from "react-bootstrap"
import ShelfData from "../data/shelves"
import ShelfUtil from "../lib/shelf_util"

let stackHeaders = [
  "First Stack",
  "Second Stack",
  "Third Stack",
  "Forth Stack",
  "Fifth Stack",
  "Sixth Stack",
  "Seventh Stack",
  "Eight Stack",
  "Ninth Stack",
  "Tenth Stack"
]

class _Class extends React.Component {
  close() {
    this.props.setCartVisibility(false)
  }

  usd(x) {
    return x.toLocaleString("en-US", { style: "currency", currency: "USD" })
  }

  priceTotal() {
    return ShelfUtil.getTotalPrice(this.props.shelves)
  }

  render() {
    let stackContents = function(stack) {
      return stack.get("heights").map(height => {
        let boardPrice = this.usd(
          ShelfData["bamboo"]["shelf"]["price"][stack.get("width")]
        )
        let footPrice = this.usd(ShelfData["bamboo"]["feet"]["price"][height])
        let connectorPackPrice = this.usd(ShelfData["connectorPackPrice"])
        return [
          <tr>
            <td>
              Board {stack.get("width")}&quot;
            </td>
            <td>
              {boardPrice}
            </td>
          </tr>,
          <tr>
            <td>
              <span className="foot">
                Foot {height}&quot;
              </span>
            </td>
            <td>
              {footPrice}
            </td>
          </tr>,
          <tr>
            <td>
              <span className="foot">
                Foot {height}&quot;
              </span>
            </td>
            <td>
              {footPrice}
            </td>
          </tr>,
          <tr>
            <td>
              <span className="foot">Connector pack</span>
            </td>
            <td>
              {connectorPackPrice}
            </td>
          </tr>
        ]
      })
    }

    let content = (
      <table className="table table-bordered cart_table">
        <tbody>
          {this.props.shelves.map((stack, index) => {
            return [
              <tr>
                <th colSpan="2" className="header">
                  {stackHeaders[index]}
                </th>
              </tr>,
              stackContents.bind(this)(stack)
            ]
          })}
          <tr className="total">
            <th colSpan="2">Total:</th>
          </tr>
          <tr>
            <td />
            <td>
              {this.usd(ShelfUtil.getTotalPrice(this.props.shelves))}
            </td>
          </tr>
        </tbody>
      </table>
    )

    return (
      <Modal show={this.props.visible} onHide={this.close.bind(this)}>
        <Modal.Header closeButton>
          <Modal.Title>Shelf Components</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {content}
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={this.close.bind(this)}>Close</Button> */}
          <Button className="cart_checkout" onClick={this.close.bind(this)}>
            Checkout at{" "}
            <img alt="amazon logo" src={require("../assets/images/amazon_logo.png")} />
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default _Class
