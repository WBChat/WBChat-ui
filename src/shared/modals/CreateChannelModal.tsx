import Button from '@mui/lab/LoadingButton'
import { Box, Modal, TextField, Typography } from '@mui/material'
import { useState } from 'react'

interface Props {
  open: boolean
  handleClose: () => void
  handleSubmit: (x: string) => void
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

export const CreateChannelModal: React.FC<Props> = ({
  open,
  handleClose,
  loading,
  handleSubmit,
}) => {
  const [name, setName] = useState('')

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h5' component='h2'>
          Create channel
        </Typography>
        <TextField
          type='text'
          placeholder='Town square'
          label='Channel name'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <Button
          sx={{ width: '100%' }}
          variant='contained'
          loading={loading}
          onClick={() => handleSubmit(name)}
        >
          Create
        </Button>
      </Box>
    </Modal>
  )
}
