import { LoadingButton as LoadingButtonMUI } from '@mui/lab'
import { Button as ButtonMUI, TextField as TextFieldMUI } from '@mui/material'
import { Link as RRDLink } from 'react-router-dom'
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 7px;
  padding: 50px 50px;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
`

export const Button = styled(ButtonMUI)`
  margin-top: 32px !important;
  width: 100%;
  background-color: #ee5684 !important;
  border-radius: 5px !important;
`

export const LoadingButton = styled(LoadingButtonMUI)`
  margin-top: 32px !important;
  width: 100%;
  background-color: #ee5684 !important;
  border-radius: 5px !important;
`

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  color: black;
  opacity: 65%;
  gap: 5px;
`
export const Link = styled(RRDLink)`
  color: black;
`

export const Title = styled.div`
  font-family: 'Cambria';
  font-weight: 700;
  opacity: 65%;
  font-size: 20px;
  margin-bottom: 30px;
`

export const FormContainer = styled.div`
  width: 250px;
`

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const TextField = styled(TextFieldMUI)`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`

export const ErrorField = styled.div`
  color: red;
`
