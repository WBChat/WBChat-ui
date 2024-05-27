import {
  AuthorizationControllerService,
  TAuthResponseData,
  TUserRegistration,
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
import * as Yup from 'yup'

import { ErrorField } from '../Login/Login.styles'
import {
  Container,
  Form,
  FormBox,
  FormContainer,
  LinkContainer,
  LoadingButton,
  TextField,
  Title,
} from './Registration.styles'

export const Registration: React.FC = () => {
  const { authenticate } = useContext(AuthContext)
  const mutation = useMutation<
    TAuthResponseData,
    CommonError,
    TUserRegistration
  >(
    (requestBody: TUserRegistration) =>
      AuthorizationControllerService.authControllerRegistration({
        requestBody,
      }),
    {
      onSuccess: res => {
        authenticate(res.access_token, res.refresh_token)
      },
    },
  )

  const navigate = useNavigate()

  const formik = useFormik<
    Partial<TUserRegistration & { repeatPassword: string }>
  >({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
      username: '',
    },
    validationSchema: Yup.object().shape({
      username: Yup.string()
        .min(3, 'Too Short!')
        .max(21, 'Too Long!')
        .required('First name field is required')
        .nullable(),
      password: Yup.string()
        .min(7, 'Too Short!')
        .max(21, 'Too Long!')
        .required('Password field is required'),
      repeatPassword: Yup.string()
        .required('Retype your password')
        .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
      email: Yup.string()
        .email('Invalid email')
        .required('Email field is required'),
    }),
    onSubmit: () => {
      formik.validateForm().then(errors => {
        if (Object.entries(errors).length === 0) {
          mutation.mutate(newFormikValues as TUserRegistration)
        }
      })
    },
  })

  useEffect(() => {
    const event = (e: KeyboardEvent): void => {
      if (e.key === 'Enter') {
        handleRegister()
      }
    }

    window.addEventListener('keypress', event)

    return () => {
      window.removeEventListener('keypress', event)
    }
  }, [])

  const { repeatPassword, ...newFormikValues } = formik.values

  const handleRegister = (): void => {
    formik.handleSubmit()
  }

  return (
    <AuthLayout>
      <Container>
        <FormContainer>
          <Title>SIGN UP</Title>

          <Form>
            <FormBox>
              <TextField
                error={!!formik.errors.username && !!formik.touched.username}
                helperText={
                  formik.touched.username ? formik.errors.username : undefined
                }
                size='small'
                label='Username'
                variant='outlined'
                id='username'
                name='username'
                onChange={formik.handleChange}
                value={formik.values.username}
                onBlur={formik.handleBlur}
              />
              <TextField
                error={!!formik.errors.email && !!formik.touched.email}
                helperText={
                  formik.touched.email ? formik.errors.email : undefined
                }
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
                error={!!formik.errors.password && !!formik.touched.password}
                helperText={
                  formik.touched.password ? formik.errors.password : undefined
                }
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

              <TextField
                error={
                  !!formik.errors.repeatPassword &&
                  !!formik.touched.repeatPassword
                }
                helperText={
                  formik.touched.repeatPassword
                    ? formik.errors.repeatPassword
                    : undefined
                }
                size='small'
                label='Repeat password'
                variant='outlined'
                id='repeatPassword'
                type='password'
                name='repeatPassword'
                onChange={formik.handleChange}
                value={formik.values.repeatPassword}
                onBlur={formik.handleBlur}
              />
            </FormBox>
          </Form>
          <ErrorField>{mutation.error?.body?.message ?? ''}</ErrorField>
          <LoadingButton
            loading={mutation.isLoading}
            onClick={handleRegister}
            variant='contained'
          >
            Sign Up
          </LoadingButton>
          <LinkContainer>
            <span>Already a user?</span>{' '}
            <Button sx={{ mb: '-2px' }} onClick={() => navigate(Routes.Login)}>
              SIGN IN
            </Button>
          </LinkContainer>
        </FormContainer>
      </Container>
    </AuthLayout>
  )
}
