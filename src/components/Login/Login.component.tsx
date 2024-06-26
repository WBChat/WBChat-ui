import {
  AuthorizationControllerService,
  TAuthResponseData,
  TLoginData,
} from '@api'
import { CommonError } from '@commonTypes/errorTypes'
import { Routes } from '@constants'
import { AuthContext } from '@context'
import { AuthLayout } from '@layouts'
import { Button } from '@mui/material'
import { useFormik } from 'formik'
import React, { useContext, useEffect } from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'

import {
  Container,
  ErrorField,
  Form,
  FormContainer,
  LinkContainer,
  LoadingButton,
  TextField,
  Title,
} from './Login.styles'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { authenticate } = useContext(AuthContext)
  const mutation = useMutation<
    TAuthResponseData,
    CommonError,
    { requestBody: TLoginData }
  >('login', AuthorizationControllerService.authControllerLogin, {
    onSuccess: response => {
      authenticate(response.access_token, response.refresh_token)
    },
  })
  const formik = useFormik<TLoginData>({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: () => {},
  })

  useEffect(() => {
    const event = (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        handleLogin()
      }
    }

    window.addEventListener('keypress', event)

    return () => {
      window.removeEventListener('keypress', event)
    }
  }, [])

  const handleLogin = (): void => {
    mutation.mutate({ requestBody: formik.values })
  }

  return (
    <AuthLayout>
      <Container>
        <FormContainer>
          <Title>LOGIN</Title>
          <Form>
            <TextField
              size='small'
              label='Email or username'
              variant='outlined'
              id='email'
              name='email'
              type='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              onBlur={formik.handleBlur}
            />
            <TextField
              size='small'
              label='Password'
              variant='outlined'
              id='password'
              type='password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              onBlur={formik.handleBlur}
            />
          </Form>

          <ErrorField>{mutation.error?.body?.message ?? ''}</ErrorField>

          <LoadingButton
            loading={mutation.isLoading}
            onClick={handleLogin}
            variant='contained'
          >
            Login
          </LoadingButton>

          <LinkContainer>
            <span>Need an account?</span>{' '}
            <Button
              sx={{ mb: '-2px' }}
              onClick={() => navigate(Routes.Registration)}
            >
              SIGN UP
            </Button>
          </LinkContainer>
        </FormContainer>
      </Container>
    </AuthLayout>
  )
}
