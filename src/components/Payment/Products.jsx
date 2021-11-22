import axios from 'axios'
import React, { Component } from 'react'
import Payment from "./Payment"

export class Products extends Component {

  state = {
    products: null,
    isLoading: true,
    itemToBuy: null
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/products`)
    .then( (response) => this.setState({ products: response.data, isLoading: false }))
    .catch( (err) => console.log(err));
  }

  handleClick = (item) => {
    this.setState({ itemToBuy: item })
  }

  render() {

    const { products, isLoading, itemToBuy } = this.state

    return (
      <div>

        <h1>My Products</h1>
        <hr />
        
        {isLoading ? <h1>...is loading</h1> : products.map(eachProduct => {
          return (
            <div key={eachProduct._id}>
              <p><b>Name:</b> {eachProduct.name}</p>
              <p><b>Quantity:</b> {eachProduct.quantity}</p>
              <p><b>Price:</b> {eachProduct.price}</p>
              <button onClick={() => this.handleClick(eachProduct)}>Buy</button>
              { itemToBuy && itemToBuy._id === eachProduct._id && <Payment itemToBuy={itemToBuy}/> }
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}

export default Products
