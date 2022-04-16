import React from 'react'
import { Spinner } from 'react-bootstrap'
import BounceLoader from "react-spinners/BounceLoader"


function Loader() {
    return (
        // <Spinner
        //     animation='border'
        //     role='status'
        //     style={{
        //         height: '100px',
        //         width: '100px',
        //         margin: 'auto',
        //         display: 'block'
        //     }}
        // >
        //     <span className='sr-only'>Loading...</span>
        // </Spinner>

      <BounceLoader style ={{
          display : 'flex',
      }} color='#000000' size={100} />
    )
}

export default Loader