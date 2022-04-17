
import React, { useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual, useStore } from 'react-redux'

import { Row, Col, ListGroup, Card, Button, Image, Form, Alert } from 'react-bootstrap'
import { viewOrder } from '../actions/orderAction'
import Loader from '../components/Loader'

function OrderDetailPage({match}) {
    const id = match.params.id
    const dispatch = useDispatch()
    console.log(id)

    const orderDetail = useSelector(state => state.orderDetail)
    const { loading , order, error} = orderDetail

    const totalItem = 0

    if(!loading && !error){
        order.totalItem = order.orderItems.reduce((acc, item) => acc +item.quantity * item.price, 0)
    }
    

    useEffect(()=>{
        if(!order || order._id !== Number(id)){
            dispatch(viewOrder(id))
        }
        console.log('inside useEffect')
    }, [order,id])

    return loading ? (
        <Loader/>
    ) : error ? (
        <Alert variant='danger'> {error} </Alert>
    ) : (
        <Row >
            <Col md={8} >
                <ListGroup>
                    <ListGroup.Item className='mb-2'>
                        <h2 className='mb-3'>Address</h2>
                        <h6>{order.shippingAddress.address}, </h6>
                        <h6>PostalCode: {order.shippingAddress.postalCode}, </h6>
                        <h6>{order.shippingAddress.city}, </h6>
                        <h6>{order.shippingAddress.country} </h6>
                        <h6>Phone : {order.shippingAddress.contactInfo} </h6>
                    </ListGroup.Item>

                    <ListGroup.Item className='mb-2'>
                        <h2 className='mb-3'>
                            Payment Method
                        </h2>
                        <h6>{order.paymentMethod}</h6>

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
                        {order.orderItems.map(item => (
                            <ListGroup key={item.product}> 
                                <Row className = 'marginy'>
                                    <Col md ={4}>
                                        <h6> {item.name}</h6>
                                    </Col>

                                    <Col md ={3}>
                                        <h6> ${item.price}</h6>
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
                            <Col md={6}>${order.totalItem}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>Shipping Cost</Col>
                            <Col md={6}>${order.shippingPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col md={6}>Tax</Col>
                            <Col md={6}>${order.taxPrice}</Col>
                        </Row>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Row>
                            <Col md={6}><strong>SubTotal</strong></Col>
                            <Col md={6}><strong>${order.totalPrice}</strong></Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup className='my-3'>
                        {order.isPaid 
                            ? <Alert variant = 'success'>Paid! {order.paidAt.substring(0,10)}</Alert>
                            : <Alert variant = 'danger'>Not paid</Alert>     
                        }

                        {order.isDelivered
                            ? <Alert variant = 'success'>Delivered! {order.deliveredAt.substring(0,10)}</Alert>
                            : <Alert variant = 'danger'>Not Delivered</Alert>     
                        }   
                </ListGroup>
            </Col>
        </Row>
    )
}

export default OrderDetailPage      