import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetail, editProfile } from '../actions/userAction'
import {USER_PROFILE_CHANGE_RESET} from '../constants/userConstants'

function UserProfilePage({history}) {
  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('') 
  const [email, setEmail] = useState('') 

  const dispatch = useDispatch() 

  const userDetails = useSelector(state => state.userDetails)
  const {error, loading, user} = userDetails

  const userLogin = useSelector(state => state.userLogin)
  const {userDetail} = userLogin

  const userEditProfile = useSelector(state => state.userEditProfile)
  const {success} = userEditProfile

  useEffect(()=> {
    if(!userDetail){                    //if user not logged in, redirect to login page
        history.push('/login')
    }
    else{
      if(!user || !user.username || success){   //if user information state is loaded
        dispatch({
          type: USER_PROFILE_CHANGE_RESET,
        })       
        dispatch(getUserDetail('profile'))
      }
      else{
        setEmail(user.email)
        setPassword(user.password)
      }
    }
  },[dispatch, user, history, userDetail, success])

  const submit = (e) =>{
    //console.log('submitted')
    e.preventDefault()

    dispatch(editProfile({
      'id' : user._id,
      'username' : user.username,
      'email' : email,
      'password' : password
      }
    ))
  }

  return (
    <Row>
      <Col md='4'>
        <h2>Profile</h2>
        {success ? 
          <Alert variant='success'>
            Successfully changed
          </Alert>
          : null
        }
        <Form onSubmit={submit}>
            <Form.Group className='py-3'>
                <Form.Label>Change Email</Form.Label>
                <Form.Control value= {email} onChange ={(e) => setEmail(e.target.value)} type='email'  ></Form.Control>
            </Form.Group>

            <Form.Group className='pb-3 '>
                <Form.Label>Change Password/Old Password</Form.Label>
                <Form.Control required value= {password} type='password' onChange ={(e) => setPassword(e.target.value)}></Form.Control>
            </Form.Group>

            <Button className='py-3' type = 'submit' margin='5' variant="secondary" size="md">Update</Button>
        </Form> 
      </Col>

      <Col md='8'>
        <h2>Previous Orders</h2>  
      </Col>
    </Row>
  )
}

export default UserProfilePage