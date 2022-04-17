import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button, Image, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart, removeFromCart } from '../actions/cartAction'
import Message from '../components/Message'; 
import { LinkContainer } from 'react-router-bootstrap'


function CartPage({match, location, history}) {

  const productId = match.params.id

  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const userDetail = useSelector(state => state.userLogin)
  // const { }

  //console.log('qty ', quantity)

  const cart = useSelector(state => state.cart)

  const {cartItem} = cart

  const dispatch = useDispatch()

  // const removeFromCartHandler = (id) =>{
  //   //console.log('removed ', id)
  //   dispatch(removeFromCart(id))
  // }


  useEffect(
    () => {
      if(productId){
        dispatch(addToCart(productId, quantity))
      }
    } , [dispatch, productId, quantity]
  )


  return (
    <Row>
      <h3>Cart</h3>
      
      <Col md = {8}>
        {cartItem.length === 0 ? (
          <Message variant = 'dark'>Cart Empty! Please add items to your cart to proceed! &gt;o&lt; </Message>
        ) : (
          <ListGroup>
            {cartItem.map(item => (
              <ListGroup key = {item.product}>
                <Row className = 'marginy'>

                  <Col md={2}>
                    <Image src = {item.image} fluid thumbnail/>
                  </Col>

                  <Col md ={3}>
                    <h6> {item.name}</h6>
                  </Col>

                  <Col md ={2}>
                    <h5> &#2547;{item.price}</h5>
                  </Col>

                  <Col md = {2}>
                    <Form.Control as='select' 
                                  value = {item.quantity}
                                  onChange = {(e) => dispatch(addToCart(item.product, Number(e.target.value))) }
                    >
                      {
                        [...Array(item.countInStock).keys()].map((x) => (
                          <option key = {x+1} value = {x+1}>
                            {x+1}
                          </option>
                        ))
                      }
                    </Form.Control>
                  </Col>

                  <Col md={1}>

                      <Button 
                        type = 'button' 
                        variant = 'outline-danger' 
                        //onClick = {() =>removeFromCartHandler(item.product)}
                        onClick = {() => dispatch(removeFromCart(item.product))}
                      >
                        Remove
                      
                      </Button>

                  </Col>

                </Row>
              </ListGroup>
            ))}
          </ListGroup>
        )

        }
      </Col>

      <Col md={4}>
        <Card
          className = {cartItem.length === 0 ? 'invisible' : 'visible'}
        >
          <ListGroup variant = 'flush'>
            <ListGroup.Item>
              <h1>Total</h1>
              &#2547;{cartItem.reduce((acc, item) => acc +item.quantity * item.price, 0)}
            </ListGroup.Item>

            <ListGroup.Item>
              <LinkContainer to='/shipping'> 
                <Button 
                  type = 'button' 
                  variant = 'success' 
                  disabled = {cartItem.length === 0  }
                  
                  // onClick = {}
                >
                  Checkout
                  </Button>
              </LinkContainer>
              
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>

    </Row>
  )
}

export default CartPage