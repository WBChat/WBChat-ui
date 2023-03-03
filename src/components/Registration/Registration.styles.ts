import { LoadingButton as LoadingButtonMUI } from '@mui/lab'
import { Button as ButtonMUI, TextField as TextFieldMUI } from '@mui/material'
import { Link as RRDLink } from 'react-router-dom'
import styled from 'styled-components'

import { AnimatedFormContainer } from '../../style/animations'

export const Container = styled(AnimatedFormContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #313338;
  border-radius: 5px;
  padding: 32px 32px;
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.2);
`

export const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 50%;
`

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  gap: 12px;
`

export const Link = styled(RRDLink)`
  color: black;
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
  border-radius: 5px !important;
`

export const FormContainer = styled.div`
  width: 450px;
  .MuiFormHelperText-root {
    position: absolute;
    bottom: -25px;
  }
`

export const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 30px;
`

export const Form = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`

export const TextField = styled(TextFieldMUI)`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
`
