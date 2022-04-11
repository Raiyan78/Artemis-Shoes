import React from 'react'
import { Link } from 'react-router-dom'
import { Col, Row, Image, ListGroup, Button, Card, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import {useState, useEffect} from 'react'

//REDUX IMPORTS
import { useDispatch, useSelector } from 'react-redux'
import { listProduct } from '../actions/productActions'
// import products from '../products'

function ProductPage({match, history}) {
  
  const [quantity, setQuantity] = useState(1) 
  const dispatch = useDispatch()
  const productDetail = useSelector (state => state.productDetail)
  const {loading, error, product } = productDetail

  console.log('before dispatch')

  useEffect(() => {
    dispatch(listProduct(match.params.id))
    console.log('inside dispatch')
  }, [])

  const addToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${quantity}`)
  }
  
  console.log('after dispatch')
  return (
    <div>
      {/* Home Page Btn */}
      {/* <Link to='/' className ="btn btn-light text-dark my-3"> Home Page
      </Link> */}
      
      <Row>
        <Col md='6'>
          <Image src = {product.image} alt={product.name} fluid></Image>  
        </Col>
        <Col md ='6'>
          <ListGroup variant="flush">
            <ListGroup.Item primary>
              <h3>{product.name} </h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating value = {product.rating} text={`${product.numReviews} reviews`} color ='#f5d731' />
            </ListGroup.Item>

            <ListGroup.Item >
              <h3>${product.price} </h3>
            </ListGroup.Item>

            <ListGroup.Item >
              <h4>{product.description} </h4>
            </ListGroup.Item>

            <ListGroup.Item >
              <h4>{product.countInStock > 0 ?"In stock" : "Out of Stock"} </h4>
            </ListGroup.Item>

            {product.countInStock && (
              <ListGroup.Item>
                <Row>
                  <Col>
                    Quantity
                  </Col>
                  <Col>
                    <Form.Control as='select' 
                                  value = {quantity}
                                  onChange = {(e) => setQuantity(e.target.value) }
                    >
                      {
                        [...Array(product.countInStock).keys()].map((x) => (
                          <option key = {x+1} value = {x+1}>
                            {x+1}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Col>  
                </Row>            
              </ListGroup.Item>
            )}


            <ListGroup.Item >
              <Button onClick = {addToCart} className='btn-block' disabled={product.countInStock > 0 ?false : true} variant="secondary" type='Button'>Add To Cart</Button>
            </ListGroup.Item>

          </ListGroup>
        </Col>
      </Row>
    </div>
  )
}

export default ProductPage