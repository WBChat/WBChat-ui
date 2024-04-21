import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/lab/LoadingButton'
import { Box, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useMutation } from 'react-query'
import { TeamsControllerService } from '../api/services/TeamsControllerService'

interface Props {
  open: boolean
  handleClose: () => void
  handleSubmit: (x: string, y: string) => void
  emailSent?: string
  loading: boolean
}

const style = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '6px',
  p: 4,
}

export const CreateTeamModal: React.FC<Props> = ({
  open,
  handleClose,
  loading,
  handleSubmit,
  emailSent,
}) => {
  const sendEmailMutation = useMutation(
    () =>
      TeamsControllerService.teamsControllerSendLicenseKey(),
  )

  const [name, setName] = useState('')
  const [key, setKey] = useState('')

  const [isEmailSent, setIsEmailSent] = useState(false)
  const [emailSending, setEmailSending] = useState(false)

  const handleGetKey = (): void => {
    setEmailSending(true)
    sendEmailMutation.mutateAsync().then(() => {
      setIsEmailSent(true)
    }).finally(() => {
      setEmailSending(false)
    })
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h5' component='h1'>
          Create team
        </Typography>
        {isEmailSent ? (
          <Typography id='modal-modal-title' variant='body1' component='h2'>
            License key was sent to this email: {emailSent}
          </Typography>
        ) : (
          <Box sx={{ display: 'flex'}}>
            <Typography id='modal-modal-title' variant='body1' component='h2'>
              For team creation you should have license key
            </Typography>
            <LoadingButton onClick={handleGetKey} variant='contained' loading={emailSending}>send key</LoadingButton>
          </Box>
          
        )}
        <TextField
          type='text'
          placeholder='Google'
          label='Team name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <TextField
          type='text'
          placeholder='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsa...'
          label='License key'
          value={key}
          onChange={e => setKey(e.target.value)}
        />
        <Button
          sx={{ width: '100%' }}
          variant='contained'
          loading={loading}
          onClick={() => handleSubmit(key, name)}
        >
          Create
        </Button>
      </Box>
    </Modal>
  )
}
