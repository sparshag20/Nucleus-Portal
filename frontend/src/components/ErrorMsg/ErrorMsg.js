import React from 'react'
import { Alert } from 'react-bootstrap'

 const ErrorMsg = (props) => {
  return (
    <div>
        <Alert key="danger" variant="danger">
          {props.msg}
        </Alert>
    </div>
  )
}


export default ErrorMsg ;
