import React, { useState } from 'react'
import classs from "./ForgotPasswordModal.module.css"
import ModalSkeleton from "../ModalSkeleton/ModalSkeleton"
import { Col, Row } from 'react-bootstrap'
import Input from '../Input/Input'
import Button from '../Button/Button'
import { toast } from 'react-toastify'
import { validateEmail } from '../../Config/apiUrl'
const ForgotPasswordModal = ({show , setShow , handleForgotPassword , isForgot}) => {
  const [email, setEmail] = useState("")
  const params = {
    email,
  }

  return (
    <>
    <ModalSkeleton header={"Forgot Password"} setShow={setShow} show={show}>
        <Row className='gy-4'>
            <Col md={12}>
                    <Input setter={setEmail} value={email} label={"Email"} placeholder={"Email"}/>
            </Col>
            <Col md={12}>
                <Button 
                onClick={() => handleForgotPassword(params)} 
                customStyle={{width:"100%"}} 
                label={isForgot ? "Submitting..." : "Submit"}/>
            </Col>
        </Row>
    </ModalSkeleton>
    </>
  )
}

export default ForgotPasswordModal