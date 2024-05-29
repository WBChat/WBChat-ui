import { CloseOutlined, FileDownload, FilePresent } from '@mui/icons-material'
import { Box, CircularProgress, IconButton, Typography } from '@mui/material'
import { filesize } from 'filesize'

export const FileAttachment: React.FC<{
  filename: string
  fileSize: number
  ext: string
  type: 'download' | 'close'
  progress?: boolean
  isError?: boolean

  onAction?: () => void
}> = ({ filename, type, ext, fileSize, progress, onAction, isError }) => {
  return (
    <Box
      sx={{
        padding: '6px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        background: '#292B2D',
        width: '168px',
        border: '2px solid #42a5f5',
        borderRadius: '6px',
        gap: 1,
      }}
    >
      <FilePresent fontSize='large' />
      <Box>
        <Box sx={{ display: 'flex' }}>
          <Typography
            fontSize={12}
            sx={{
              textOverflow: 'ellipsis',
              maxHeight: '18px',
              overflow: 'hidden',
              maxWidth: '60px',
            }}
          >
            {filename}
          </Typography>
          <Typography fontSize={12}>.{ext}</Typography>
        </Box>
        {progress && type === 'close' ? (
          <CircularProgress size={12} />
        ) : isError ? (
          <Typography fontSize={11} color='error'>
            Upload error
          </Typography>
        ) : (
          <Typography fontSize={11} color='GrayText'>
            {filesize(fileSize, { standard: 'jedec' })}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          marginLeft: 'auto',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
        }}
        onClick={onAction}
      >
        {type === 'download' ? (
          <IconButton>
            {progress ? <CircularProgress size={20} /> : <FileDownload />}
          </IconButton>
        ) : (
          <IconButton>
            <CloseOutlined />
          </IconButton>
        )}
      </Box>
    </Box>
  )
}
