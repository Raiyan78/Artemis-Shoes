import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert, ListGroup} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import FormComponent from '../components/Form'
import { setPaymentMethod } from '../actions/cartAction'

function PaymentPage({history}) {
    const [paymentMethod, setPayment] = useState('cod')
    const cart = useSelector(state => state.cart)
    const {shippingAddress, cartItem} = cart

    if(cartItem.length == 0 ){
        history.push('/')
    } else if(!shippingAddress){
        history.push('/shipping/')
    }
    const dispatch = useDispatch()

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(setPaymentMethod({paymentMethod}))
        history.push('/placeorder')
        console.log('payment')
    }


    return (
        <FormComponent>
            <h1>Payment</h1>
            <Form onSubmit={submitHandler} className='py-3'>
                <Form.Group className='mb-3' required>
                    <Form.Label as='legend'>Select payment method</Form.Label>
                    <Col>
                        <Form.Check
                            required
                            className='py-3' 
                            type='checkbox'
                            label='Cash on Delivery'
                            id = 'COD'
                            value = 'Cash on Delivery'
                            onChange={(e) => setPayment(e.target.value)}
                        
                        >
                        </Form.Check>
                    </Col>
                    <Col>
                        <Button className='py-3' type = 'submit' variant="secondary" size="md">Place Order</Button>
                    </Col>
                    
                </Form.Group>


            </Form>
        </FormComponent>
    )
}

export default PaymentPage