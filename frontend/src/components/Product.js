import React from 'react'
import { Card } from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'

//redux related imports
import { useDispatch, useSelector } from 'react-redux'
import {productReducer} from '../reducers/productReducers'

function Product({product}) {
  return (
    <Card className= "my-3 p-3 rounded">
        {/* product image */}
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image}/>
        </Link>

        <Card.Body>
            {/* product name */}
            <Link to={`/product/${product._id}`}>
              <Card.Title as='div'>
                <strong>{product.name}</strong>
              </Card.Title>
            </Link>

          {/* product rating */}
          <Card.Text as='div'>
            <div className='my-3'>
              <Rating value = {product.rating} text = {' ' + product.numReviews + ' reviews'} color={'#f5d731'}></Rating>
            </div>
          </Card.Text>

          {/* product price */}
          <Card.Text as = 'h4'>
            ${product.price}
          </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product