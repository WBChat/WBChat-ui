import { LoadingButton as LoadingButtonMUI } from '@mui/lab'
import { TextField as TextFieldMUI } from '@mui/material'
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

export const LoadingButton = styled(LoadingButtonMUI)`
  margin-top: 12px !important;
  width: 100%;
  border-radius: 5px !important;
`

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  gap: 12px;
`

export const Title = styled.div`
  font-weight: 700;
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
  color: #d32f2f;
  font-size: 14px;
  padding-top: 12px;
`
