import {
  Box,
  CircularProgress,
  Divider,
  Modal,
  Pagination,
  TextField,
  Typography,
} from '@mui/material'
import { useMutation } from 'react-query'
import { AddCircleOutline } from '@mui/icons-material'
import { useDebounce } from 'use-debounce'
import { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CommonError } from '@commonTypes/errorTypes'
import { UserSuggestion } from 'src/components/UserSuggestion'
import { useGetPeople, useGetTeamMembers } from '../queries/useGetMembers'
import { SuccessResponse } from '../api/models/SuccessResponse'
import { TeamsControllerService } from '../api/services/TeamsControllerService'
import { TeamContext } from '../context/team/TeamContext'
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

const PAGE_SIZE = 5

export const AddMembersModal: React.FC<Props> = ({ open, handleClose }) => {
  const { getTeamById } = useContext(TeamContext)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const { teamId } = useParams()

  const currentUser = useGetCurrentUser()
  const currentTeam = getTeamById(teamId!)

  const { data: teamMembers, refetch: refetchTeamMembers } = useGetTeamMembers({
    teamId: teamId!,
  })

  const [debouncedSearch] = useDebounce(search, 500)

  const { data, isFetching } = useGetPeople({
    page: page - 1,
    pageSize: PAGE_SIZE,
    searchValue: debouncedSearch,
    searchFields: ['username'],
  })

  const addMember = useMutation<SuccessResponse, CommonError, string>(
    'add_team_member',
    (memberId: string) =>
      TeamsControllerService.teamsControllerAddTeamMember({ teamId, memberId }),
    {
      onSuccess: () => {
        refetchTeamMembers()
      },
    },
  )

  const handlePaginationChange = (
    _: React.ChangeEvent<unknown>,
    value: number,
  ): void => {
    setPage(value)
  }

  const handleAddMember = (memberId: string): void => {
    addMember.mutate(memberId)
  }

  const isOwner = currentTeam?.owner === currentUser?._id

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography fontSize={24} fontWeight={700}>
          Add members
        </Typography>
        <TextField
          type='search'
          placeholder='Find people'
          label='Find people'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Divider sx={{ margin: '0 -32px' }} />
        <Box sx={{ display: 'flex', gap: 1, flexDirection: 'column' }}>
          {isFetching ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 1 }}>
              <CircularProgress />
            </Box>
          ) : data?.list.length ? (
            data?.list.map(user => {
              return (
                <UserSuggestion
                  username={user.username}
                  avatarSrc={user.avatar}
                  key={user._id}
                  actions={
                    isOwner &&
                    !teamMembers?.map(m => m._id)?.includes(user._id) && (
                      <Box onClick={() => handleAddMember(user._id)}>
                        <AddCircleOutline
                          sx={{
                            '&:hover': {
                              color: '#36f436',
                            },
                          }}
                        />
                      </Box>
                    )
                  }
                />
              )
            })
          ) : (
            <Typography>Nothing found</Typography>
          )}
        </Box>
        <Pagination
          page={page}
          sx={{ '& button': { width: '32px !important' } }}
          count={Math.ceil(Number(data?.count ?? 0) / PAGE_SIZE)}
          onChange={handlePaginationChange}
          color='primary'
        />
      </Box>
    </Modal>
  )
}
