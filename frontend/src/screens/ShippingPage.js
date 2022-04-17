import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert, ListGroup} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import FormComponent from '../components/Form'
import { setShippingAddress } from '../actions/cartAction'

function ShippingPage({history}) {
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [country, setCountry] = useState('')
    const [contactInfo, setContactInfo] = useState('')

    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(setShippingAddress({address, postalCode, city, country, contactInfo}))

        history.push('/payment')
        console.log('shipping ')
    }

    return (
        <FormComponent>
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='py-3'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control required value= {address} onChange ={(e) => setAddress(e.target.value)} type='text'  ></Form.Control>
                </Form.Group>

                <Form.Group className='py-3'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control value= {postalCode} onChange ={(e) => setPostalCode(e.target.value)} type='text'></Form.Control>
                </Form.Group>

                <Form.Group className='py-3'>
                    <Form.Label>City</Form.Label>
                    <Form.Control value= {city} onChange ={(e) => setCity(e.target.value)} type='text'></Form.Control>
                </Form.Group>

                <Form.Group className='py-3'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control value= {country} onChange ={(e) => setCountry(e.target.value)} type='text'  ></Form.Control>
                </Form.Group>

                <Form.Group className='py-3'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control required value= {contactInfo} onChange ={(e) => setContactInfo(e.target.value)} type='text'  ></Form.Control>
                </Form.Group>

                <Button className='py-3' type = 'submit' variant="secondary" size="md">Confirm Address</Button>
            </Form>

        </FormComponent>
    )
}

export default ShippingPage