import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert} from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetail , updateProfile } from '../actions/userAction'
import FormComponent from '../components/Form'
import Loader from '../components/Loader'
import { USER_UPDATE_RESET } from '../constants/userConstants'

function UserProfileById({history, location, match}) {
   //userid
  const userId = match.params.id

  //Setting up state
  const [username, setUsername] = useState('') 
  const [email, setEmail] = useState('') 
  const [is_staff, setIsStaff] = useState(false) 

  //Admin view, normal user wont see this page
  const userDetails = useSelector(state => state.userDetails)
  const {user, loading, error} = userDetails
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const userUpdate = useSelector(state => state.userUpdate)
  const {error: updateError, success: updateSuccess, loading : updateLoading} = userUpdate


  const dispatch = useDispatch()
  useEffect(()=> {
    if(updateSuccess){
      dispatch({
        type: USER_UPDATE_RESET
      })
      history.push('/admin/users/')
    }else{
      if(!user || !user.username || user.id !== Number(userId)){
        dispatch(getUserDetail(userId))
        console.log(userId)
      }else{
          setUsername(user.username)
          setEmail(user.email)
          setIsStaff(user.is_staff)
      }
    }
    
          
  },[user, userId, updateSuccess, history])

  console.log(username)
  console.log(is_staff)

  const submit =  (e) => {
    e.preventDefault()

    dispatch(updateProfile({
      id : user.id,
      username,
      email,
      is_staff: is_staff,
      }
    ))
  }

  return loading ? 
    (<Loader/> )
  : error ? 
    (<Alert>{error}</Alert>)
  : (
    <FormComponent>
        <h1>
            Edit User Detail
        </h1>

        {updateLoading && <Loader/>}
        {updateError && <Alert variant='danger'>{updateError}</Alert>}

        <Form onSubmit={submit}>
            <Form.Group>
                <Form.Label>Set Username</Form.Label>
                <Form.Control type='name' value={username} onChange = {(e) => setUsername(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Set Email</Form.Label>
                <Form.Control type='email' value={email} onChange = {(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group>
                <Form.Label>Set Admin</Form.Label>
                <Form.Check type='checkbox' checked ={is_staff} onChange = {(e) => setIsStaff(e.target.checked)}></Form.Check>
            </Form.Group>

            <Button className = 'my-3' type = 'submit' margin='5' variant="secondary" size="md">Update</Button>
        </Form>
        
        
    </FormComponent>
  )
}

export default UserProfileById