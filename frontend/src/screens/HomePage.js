import React from 'react'
//import products from '../products'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import {useState, useEffect} from 'react'
import { listProducts } from '../actions/productActions'

function HomePage() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {error, loading, products} = productList
  useEffect(() => {
    dispatch(listProducts())
  }, [dispatch])

  // const products = []
  return (
    <div>
        <h1>New Arrivals</h1>
        {loading ? <h2>Loading</h2>
                  : error ? <h3>{error}</h3>  
                  : <Row>
                      {products.map(product =>(
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                            <Product product={product}/>
                        </Col>
                       ))}
                    </Row>
        }
    </div>
  )
}

export default HomePage