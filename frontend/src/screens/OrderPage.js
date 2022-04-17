import React from 'react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Button, Image, Form, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'; 
import { LinkContainer } from 'react-router-bootstrap'

import { createOrder } from '../actions/orderAction'
import { ORDER_RESET, ORDER_LIST_USER_SUC } from '../constants/orderConstants'
import { CART_RESET } from '../constants/cartConstants'

function OrderPage({history}) {
    const cart = useSelector(state => state.cart)
    const {shippingAddress, paymentMethod, cartItem} = cart

    const orderCreate = useSelector(state => state.orderCreate)
    const {order, error, success} = orderCreate

    const totalItem = cartItem.reduce((acc, item) => acc +item.quantity * item.price, 0)

    const shippingCost = shippingAddress.city == "Dhaka" ? 0 : 50

    const tax = totalItem * 7 /100

    const totalPrice = Math.ceil(totalItem + shippingCost + tax)

    const dispatch = useDispatch()

    //if !cart go back to home
    if(cartItem.length == 0){
        history.push('/')
    }
    console.log('mian page')
    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: ORDER_RESET })
        }
    }, [success, history])

    const submitHandler = (e) =>{
        e.preventDefault()

        dispatch(createOrder({
            orderItems : cart.cartItem,
            shippingAddress : cart.shippingAddress,
            paymentMethod : cart.paymentMethod.paymentMethod,
            taxPrice : tax,
            shippingPrice : shippingCost,
            totalPrice : totalPrice,
            itemPrice : totalItem,  
        }))
        console.log('Submit')
        //history.push(`/orders/${}`)

    }
    
    return (
        
        <Row >
            <Col md={8} >
                <ListGroup>
                    <ListGroup.Item className='mb-2'>
                        <h2 className='mb-3'>Address</h2>
                        <h6>{shippingAddress.address}, </h6>
                        <h6>PostalCode: {shippingAddress.postalCode}, </h6>
                        <h6>{shippingAddress.city}, </h6>
                        <h6>{shippingAddress.country} </h6>
                        <h6>{shippingAddress.contactInfo}</h6>
                    </ListGroup.Item>

                    <ListGroup.Item className='mb-2'>
                        <h2 className='mb-3'>
                            Payment Method
                        </h2>
                        <h6>{paymentMethod.paymentMethod}</h6>

                    </ListGroup.Item>

                    <ListGroup.Item className='mb-2'>
                        <h2 className='mb-3'>Items</h2>
                        <ListGroup>
                            <Row className = 'marginy'>
                                <Col md ={4}>Name</Col>
                                <Col md ={2}>Price</Col>
                                <Col md ={2}>Quantity</Col>
                                <Col md ={2}>Total</Col>
                            </Row>
                        </ListGroup>
                        {cartItem.map(item => (
                            <ListGroup key={item.product}> 
                                <Row className = 'marginy'>
                                    <Col md ={4}>
                                        <h6> {item.name}</h6>
                                    </Col>

                                    <Col md ={3}>
                                        <h6> &#2547;{item.price}</h6>
                                    </Col>

                                    <Col md={1}>
                                        <h6>x{item.quantity}</h6>
                                    </Col>

                                    <Col md={2}>
                                        <h6>{item.quantity * item.price}</h6>
                                    </Col>

                                    <Col md={2}>
                                        <Image src = {item.image} fluid thumbnail/>
                                    </Col>
                                </Row>
                                
                            </ListGroup>
                        ))}
                    </ListGroup.Item>
                </ListGroup>

            </Col>

            <Col>
                <ListGroup>
                    <ListGroup.Item>
                        <h2>Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>Total</Col>
                            <Col md={6}>&#2547;{totalItem}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>Shipping Cost</Col>
                            <Col md={6}>&#2547;{shippingCost}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>Tax</Col>
                            <Col md={6}>&#2547;{tax}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>SubTotal</Col>
                            <Col md={6}>&#2547;{totalPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    {
                        error ? <ListGroup.Item>
                                    {error && <Alert variant='warning'>Items no longer in stock!</Alert>}
                                </ListGroup.Item>
                            : null
                    }
                    

                    <ListGroup.Item>
                        <Row>
                            <Button variant="success" onClick={submitHandler}>Order</Button>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
                
            </Col>
        </Row>
    )
}

export default OrderPage