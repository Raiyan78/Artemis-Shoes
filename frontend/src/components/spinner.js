import React from 'react'
import Spinner from 'react-bootstrap'

function spinner() {
  return (
    <Spinner
        animation = 'border'
        variant="secondary"
        style ={{
            height : '100px',
            width : '100px'
        }}
    >
    </Spinner>
  )
}

export default spinner