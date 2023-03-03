import { useFormik } from 'formik'
import React from 'react'
import { useMutation } from 'react-query'

import {
  AuthorizationControllerService,
  TAuthResponseData,
  TLoginData,
} from '../../api'
import { CommonError } from '../../types/errorTypes'
import { AuthLayout } from '../AuthLayout/AuthLayout.component'
import {
  Container,
  ErrorField,
  Form,
  FormContainer,
  Link,
  LinkContainer,
  LoadingButton,
  TextField,
  Title,
} from './Login.styles'

export const Login: React.FC = () => {
  const mutation = useMutation<
    TAuthResponseData,
    CommonError,
    { requestBody: TLoginData }
  >('login', AuthorizationControllerService.authControllerLogin, {
    onSuccess: () => {},
  })
  const formik = useFormik<TLoginData>({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: () => {},
  })

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
              label='Email'
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

          <ErrorField>{mutation.error?.body.message ?? ''}</ErrorField>

          <LoadingButton
            loading={mutation.isLoading}
            onClick={handleLogin}
            variant='contained'
          >
            Login
          </LoadingButton>

          <LinkContainer>
            Need an account? <Link to='/register'>SIGN UP</Link>
          </LinkContainer>
        </FormContainer>
      </Container>
    </AuthLayout>
  )
}
