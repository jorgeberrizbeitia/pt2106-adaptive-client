import axios from 'axios'
import React, { Component } from 'react'

export class Products extends Component {

  state = {
    products: null,
    isLoading: true
  }

  componentDidMount() {
    axios.get("http://localhost:5005/api/products")
    .then( (response) => this.setState({ products: response.data, isLoading: false}))
    .catch( (err) => console.log(err));
  }

  render() {

    const { products, isLoading } = this.state

    return (
      <div>

        <h1>My Products</h1>
        <hr />
        
        {isLoading ? <h1>...is loading</h1> : products.map(eachProduct => {
          return (
            <div key={eachProduct._id}>
              <p>Name: {eachProduct.name}</p>
              <p>Quantity: {eachProduct.quantity}</p>
              <p>Price: {eachProduct.price}</p>
              <hr />
            </div>
          )
        })}
      </div>
    )
  }
}

export default Products
