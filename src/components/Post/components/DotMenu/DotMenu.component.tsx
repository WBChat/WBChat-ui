import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import {
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Paper,
  Popover,
} from '@mui/material'
import { useRef } from 'react'

interface Props {
  open: boolean
  ownPost: boolean
  handleClose: () => void
  onDotButtonClick: () => void
  onMessageDelete: () => void
  onMessageEdit: () => void
  onMessageCopy: () => void
}

export const DotMenu: React.FC<Props> = props => {
  const anchorRef = useRef(null)

  return (
    <>
      <IconButton
        sx={{ borderRadius: '2px', padding: '4px' }}
        ref={anchorRef}
        onClick={props.onDotButtonClick}
      >
        <MoreVertIcon
          color={props.open ? 'info' : 'action'}
          sx={{ fontSize: '16px' }}
        />
      </IconButton>
      <Popover
        open={props.open}
        anchorEl={anchorRef.current}
        onClose={props.handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Paper sx={{ width: 180, maxWidth: '100%' }}>
          <MenuList>
            {props.ownPost && (
              <MenuItem onClick={props.onMessageEdit}>
                <ListItemIcon>
                  <EditIcon fontSize='small' />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
              </MenuItem>
            )}
            <MenuItem onClick={props.onMessageCopy}>
              <ListItemIcon>
                <ContentCopyIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText>Copy text</ListItemText>
            </MenuItem>

            {props.ownPost && (
              <>
                <Divider />
                <MenuItem onClick={props.onMessageDelete}>
                  <ListItemIcon>
                    <DeleteIcon fontSize='small' color='error' />
                  </ListItemIcon>
                  <ListItemText
                    sx={theme => ({ color: theme.palette.error.main })}
                  >
                    Delete
                  </ListItemText>
                </MenuItem>
              </>
            )}
          </MenuList>
        </Paper>
      </Popover>
    </>
  )
}
