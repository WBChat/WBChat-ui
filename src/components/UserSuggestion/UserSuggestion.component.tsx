import { Box, Typography } from '@mui/material'
import React, { ReactNode } from 'react'
import { Avatar } from '../Avatar/Avatar.component'

interface Props {
  username: string
  avatarSrc: string
  isOwner?: boolean
  actions?: ReactNode
}

export const UserSuggestion: React.FC<Props> = props => {
  return (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        m: '0 -32px',
        p: '12px 32px',
        '&:hover': {
          backgroundColor: 'rgb(255, 255, 255, 0.08)',
        },
      }}
    >
      <Avatar url={props.avatarSrc} username={props.username} size={42} />
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        <Typography fontSize={20} fontWeight={700}>
          {props.username}
        </Typography>
        {props.isOwner && (
          <Box
            sx={{
              padding: '2px 4px',
              fontSize: '12px',
              background: 'grey',
              position: 'relative',
              top: '-8px',
              borderRadius: '2px',
            }}
          >
            owner
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: 'auto',
          cursor: 'pointer',
        }}
      >
        {props.actions}
      </Box>
    </Box>
  )
}
