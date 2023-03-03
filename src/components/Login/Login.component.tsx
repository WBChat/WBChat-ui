import { useFormik } from 'formik'
import React from 'react'
import { useMutation } from 'react-query'

import { AuthorizationControllerService, TLoginData } from '../../api'
import {
  Button,
  Container,
  Form,
  FormContainer,
  Link,
  LinkContainer,
  LoadingButton,
  TextField,
  Title,
} from './Login.styles'

export const Login: React.FC = () => {
  const mutation = useMutation(
    (requestBody: TLoginData) =>
      AuthorizationControllerService.authControllerLogin({ requestBody }),
    {
      onSuccess: () => {},
    },
  )
  const formik = useFormik<TLoginData>({
    initialValues: {
      email: '',
      password: '',
    },

    onSubmit: () => {},
  })

  const handleLogin = (): void => {
    mutation.mutate(formik.values)
  }

  return (
    <Container>
      <FormContainer>
        <Title>SIGN IN</Title>
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
        {mutation.isLoading ? (
          <LoadingButton loading variant='outlined'>
            Submit
          </LoadingButton>
        ) : (
          <Button variant='contained' onClick={handleLogin}>
            Sign In
          </Button>
        )}
        <LinkContainer>
          Need an account? <Link to='/register'>SIGN UP</Link>
        </LinkContainer>
      </FormContainer>
    </Container>
  )
}
