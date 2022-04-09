import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userAction'
import FormComponent from '../components/Form'
import Popup from 'react-popup'

function LoginPage({location, history}) {
  const [username, setUsername] = useState('') 
  const [password, setPass] = useState('') //Setting up state

  const dispatch = useDispatch() 

  const userLogin = useSelector(state => state.userLogin)
  
  const redirect = location.search ? location.search.split('=')[1] : '/'
  const {error, loading, userDetail} = userLogin

  useEffect(()=> {
      if(userDetail){
          history.push(redirect)
      }
  },[history, userDetail, redirect])

  const submit = (e) =>{
    e.preventDefault()
    dispatch(login(username,password))
  }
  return (
    <FormComponent>
        <h1>
            Login
        </h1>

        {error ? 
            <Alert variant='danger'>
                Wrong username or pass!
            </Alert> 
            : null}

        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control value={username} onChange = {(e) => setUsername(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' value={password} onChange = {(e) => setPass(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type = 'submit' margin='5' variant="secondary" size="md">Log In</Button>
        </Form>

        <Row>
            <Col>
                {/* <Link to = {redirect ? `register?redirect=${redirect}` : '/register'}>Register</Link> */}
                <Link to='/register'>Register</Link>
            </Col>
        </Row>
        
    </FormComponent>
  )
}

export default LoginPage