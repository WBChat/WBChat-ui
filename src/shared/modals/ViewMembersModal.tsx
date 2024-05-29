import {
  Box,
  CircularProgress,
  Divider,
  Modal,
  Typography,
} from '@mui/material'
import { useMutation } from 'react-query'
import { RemoveCircleOutline } from '@mui/icons-material'
import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CommonError } from '@commonTypes/errorTypes'
import { UserSuggestion } from 'src/components/UserSuggestion'
import { useGetTeamMembers } from '../queries/useGetMembers'
import { TeamContext } from '../context/team/TeamContext'
import { TeamsControllerService } from '../api/services/TeamsControllerService'
import { SuccessResponse } from '../api/models/SuccessResponse'
import { useGetCurrentUser } from '../queries/useGetCurrentUser'

interface Props {
  open: boolean
  handleClose: () => void
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

export const ViewMembersModal: React.FC<Props> = ({ open, handleClose }) => {
  const { teamId } = useParams()
  const { getTeamById } = useContext(TeamContext)
  const currentTeam = getTeamById(teamId!)
  const currentUser = useGetCurrentUser()
  const {
    data,
    isFetching,
    refetch: refetchTeamMembers,
  } = useGetTeamMembers({ teamId: teamId! })

  const removeMember = useMutation<SuccessResponse, CommonError, string>(
    'add_team_member',
    (memberId: string) =>
      TeamsControllerService.teamsControllerRemoveTeamMember({
        teamId,
        memberId,
      }),
    {
      onSuccess: () => {
        refetchTeamMembers()
      },
    },
  )

  const handleRemoveMember = (memberId: string): void => {
    removeMember.mutate(memberId)
  }

  const isMeOwner = currentTeam?.owner === currentUser?._id

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography fontSize={24} fontWeight={700}>
          View members
        </Typography>

        <Divider sx={{ margin: '0 -32px' }} />
        {isFetching ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
            <CircularProgress />
          </Box>
        ) : (
          data?.map(user => {
            const isOwner = currentTeam?.owner === user._id

            return (
              <UserSuggestion
                username={user.username}
                key={user._id}
                isOwner={isOwner}
                avatarSrc={user.avatar}
                actions={
                  isMeOwner &&
                  user._id !== currentTeam?.owner && (
                    <RemoveCircleOutline
                      onClick={() => handleRemoveMember(user._id)}
                      sx={{
                        '&:hover': {
                          color: '#f44336',
                        },
                      }}
                    />
                  )
                }
              />
            )
          })
        )}
      </Box>
    </Modal>
  )
}
