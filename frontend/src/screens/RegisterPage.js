import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userAction'
import FormComponent from '../components/Form'

function RegisterPage({history, location}) {
    const [username, setUsername] = useState('') 
    const [email, setEmail] = useState('') 
  const [password, setPass] = useState('') //Setting up state

  const dispatch = useDispatch() 

  const userRegister = useSelector(state => state.userRegister)
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const {error, loading, userDetail} = userRegister

  useEffect(()=> {
      if(userDetail){
          history.push(redirect)
      }
  },[history, userDetail, redirect])

  const submit = (e) =>{
    e.preventDefault()
    dispatch(register(username,password, email))
    //console.log("submitted")
  }

  return (
    <FormComponent>
        <h1>
            Register
        </h1>

        {error ? 
            <Alert variant='warning'>
                Username already in use!
            </Alert> 
            : null}

        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>Set Username</Form.Label>
                <Form.Control required value={username} onChange = {(e) => setUsername(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Set Email</Form.Label>
                <Form.Control type='email' value={email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Set Password</Form.Label>
                <Form.Control required type='password' value={password} onChange = {(e) => setPass(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type = 'submit' margin='5' variant="secondary" size="md">Register</Button>
        </Form>

        <Row>
            <Col>
                <Link to = '/login'>Login Instead?</Link>
            </Col>
        </Row>
        
        
    </FormComponent>
  )
}

export default RegisterPage