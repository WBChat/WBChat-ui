import AddReactionIcon from '@mui/icons-material/AddReaction'
import { IconButton, Popover } from '@mui/material'
import ReactEmojiPicker, { EmojiClickData, Theme } from 'emoji-picker-react'
import { useRef } from 'react'

interface Props {
  open: boolean
  handleClose: () => void
  onEmojiButtonClick: () => void
  onEmojiClick?: (emojiData: EmojiClickData, event: MouseEvent) => void
}

export const EmojiPicker: React.FC<Props> = props => {
  const anchorRef = useRef(null)

  return (
    <>
      <IconButton
        sx={{ borderRadius: '2px', padding: '4px' }}
        ref={anchorRef}
        onClick={props.onEmojiButtonClick}
      >
        <AddReactionIcon
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
        <ReactEmojiPicker
          width={300}
          height={350}
          theme={Theme.DARK}
          onEmojiClick={props.onEmojiClick}
        />
      </Popover>
    </>
  )
}
