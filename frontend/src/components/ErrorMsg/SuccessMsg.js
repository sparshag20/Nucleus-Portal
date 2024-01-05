import React from 'react'
import { Alert } from 'react-bootstrap'

const SuccessMsg = (props) => {
  return (
    <div>
  
      <Alert key="success" variant="success">
        {props.msg}  
      </Alert>
  
    </div>
  )
}

export default SuccessMsg
