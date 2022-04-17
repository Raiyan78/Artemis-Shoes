//ADMIN VIEW
import React, {useState, useEffect} from 'react'
import { Col, Row, Container, Form ,Button, Alert, Table} from 'react-bootstrap'
import {  LinkContainer } from 'react-router-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserList } from '../actions/userAction'
import Loader from '../components/Loader'
import {deleteUser} from '../actions/userAction'
import { USER_LIST_SUC } from '../constants/userConstants'

function UserListPage() {
    const  dispatch = useDispatch()

    //read users state
    const usersList = useSelector(state => state.userList)
    const {users, error, loading} = usersList

    const userDelete = useSelector(state => state.userDelete)
    const {success} = userDelete

    useEffect(()=>{
        dispatch(getUserList())
    }, [dispatch, success])

    const deleteUserHandler = (id)=>{
        if(window.confirm('Are you sure?')){
             dispatch(deleteUser(id))
        }
    }

    return loading ? (<Loader/> )
        : error ? (<Alert variant = 'danger'> Unauthorized </Alert>)
        : (
        <div>
            <Table striped bordered hover variant="dark">
                <thead>
                    <td>ID</td>
                    <td>Username</td>
                    <td>Email</td>
                    <td>Staff Status</td>
                    <td>Profile</td>
                    <td>Remove user</td>
                </thead>

                <tbody>
                    {users.map(users => (
                        <tr key={users.id}>
                            <td>{users.id}</td>
                            <td>{users.username}</td>
                            <td>{users.email}</td>
                            <td>{users.is_staff ? ("Employee") : null}</td>
                            <td>
                                <LinkContainer to ={`/admin/user/edit/${users.id}`}>
                                    <Button variant = 'light'> 
                                        edit
                                    </Button>
                                </LinkContainer>    
                            </td>
                            <td>
                                <Button variant= 'danger' onClick={(e) => deleteUserHandler(users.id)}>
                                    Remove User
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default UserListPage