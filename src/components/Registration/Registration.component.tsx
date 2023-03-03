import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'
import { useMutation } from 'react-query'
import * as Yup from 'yup'

import { AuthorizationControllerService, TUserRegistration } from '../../api'
import { AuthLayout } from '../AuthLayout/AuthLayout.component'
import {
  Button,
  Container,
  Form,
  FormBox,
  FormContainer,
  Link,
  LinkContainer,
  LoadingButton,
  TextField,
  Title,
} from './Registration.styles'

export const Registration: React.FC = () => {
  const mutation = useMutation(
    (requestBody: TUserRegistration) =>
      AuthorizationControllerService.authControllerRegistration({
        requestBody,
      }),
    {
      onSuccess: () => {},
    },
  )

  const formik = useFormik<
    Partial<TUserRegistration & { repeatPassword: string }>
  >({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
      first_name: '',
      last_name: '',
      level: undefined,
      direction: undefined,
      experience: undefined,
    },
    validationSchema: Yup.object().shape({
      first_name: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('First name field is required'),
      last_name: Yup.string()
        .min(2, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Last name field is required'),
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
      level: Yup.string().required('Level field is required'),
      direction: Yup.string().required('Direction field is required'),
      experience: Yup.string().required('Experience field is required'),
    }),
    onSubmit: () => {
      formik.validateForm().then(errors => {
        if (Object.entries(errors).length === 0) {
          mutation.mutate(newFormikValues as TUserRegistration)
        }
      })
    },
  })
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
                error={
                  !!formik.errors.first_name && !!formik.touched.first_name
                }
                helperText={
                  formik.touched.first_name
                    ? formik.errors.first_name
                    : undefined
                }
                size='small'
                label='First Name'
                variant='outlined'
                id='firstname'
                name='first_name'
                onChange={formik.handleChange}
                value={formik.values.first_name}
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
            <FormBox>
              <TextField
                error={!!formik.errors.last_name && !!formik.touched.last_name}
                helperText={
                  formik.touched.last_name ? formik.errors.last_name : undefined
                }
                size='small'
                label='Last Name'
                variant='outlined'
                id='lastname'
                name='last_name'
                onChange={formik.handleChange}
                value={formik.values.last_name}
                onBlur={formik.handleBlur}
              />
              <FormControl
                size='small'
                error={!!formik.errors.level && !!formik.touched.level}
              >
                <InputLabel>Level</InputLabel>
                <Select
                  id='level'
                  name='level'
                  value={formik.values.level}
                  label='Level'
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={TUserRegistration.level.TRAINEE}>
                    {TUserRegistration.level.TRAINEE}
                  </MenuItem>
                  <MenuItem value={TUserRegistration.level.JUNIOR}>
                    {TUserRegistration.level.JUNIOR}
                  </MenuItem>
                  <MenuItem value={TUserRegistration.level.MIDDLE}>
                    {TUserRegistration.level.MIDDLE}
                  </MenuItem>
                  <MenuItem value={TUserRegistration.level.SENIOR}>
                    {TUserRegistration.level.SENIOR}
                  </MenuItem>
                  <MenuItem value={TUserRegistration.level.TECH_ARCHITECTOR}>
                    {TUserRegistration.level.TECH_ARCHITECTOR}
                  </MenuItem>
                </Select>
                {formik.touched.level && (
                  <FormHelperText>{formik.errors.level}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                size='small'
                error={!!formik.errors.direction && !!formik.touched.direction}
              >
                <InputLabel>Direction</InputLabel>
                <Select
                  label='Direction'
                  variant='outlined'
                  id='direction'
                  name='direction'
                  onChange={formik.handleChange}
                  value={formik.values.direction}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={TUserRegistration.direction.FRONTEND}>
                    {TUserRegistration.direction.FRONTEND}
                  </MenuItem>
                  <MenuItem value={TUserRegistration.direction.BACKEND}>
                    {TUserRegistration.direction.BACKEND}
                  </MenuItem>
                </Select>
                {formik.touched.direction && (
                  <FormHelperText>{formik.errors.direction}</FormHelperText>
                )}
              </FormControl>

              <FormControl
                size='small'
                error={
                  !!formik.errors.experience && !!formik.touched.experience
                }
              >
                <InputLabel>Experience</InputLabel>
                <Select
                  label='Experience'
                  variant='outlined'
                  id='experience'
                  name='experience'
                  onChange={formik.handleChange}
                  value={formik.values.experience}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value={TUserRegistration.experience.NO_EXPERIENCE}>
                    {TUserRegistration.experience.NO_EXPERIENCE}
                  </MenuItem>
                  <MenuItem
                    value={TUserRegistration.experience.LESS_THAN_1_YEAR}
                  >
                    {TUserRegistration.experience.LESS_THAN_1_YEAR}
                  </MenuItem>
                  <MenuItem value={TUserRegistration.experience._1_3_YEARS}>
                    {TUserRegistration.experience._1_3_YEARS}
                  </MenuItem>
                  <MenuItem
                    value={TUserRegistration.experience.MORE_THAN_3_YEARS}
                  >
                    {TUserRegistration.experience.MORE_THAN_3_YEARS}
                  </MenuItem>
                </Select>
                {formik.touched.experience && (
                  <FormHelperText>{formik.errors.experience}</FormHelperText>
                )}
              </FormControl>
            </FormBox>
          </Form>
          {mutation.isLoading ? (
            <LoadingButton loading variant='outlined'>
              Submit
            </LoadingButton>
          ) : (
            <Button variant='contained' onClick={handleRegister}>
              Sign Up
            </Button>
          )}
          <LinkContainer>
            Already a user? <Link to='/login'>SIGN IN</Link>
          </LinkContainer>
        </FormContainer>
      </Container>
    </AuthLayout>
  )
}
