import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TeamContext } from 'src/shared/context/team/TeamContext'

import { Routes } from '@constants'

export const Home: React.FC = () => {
  const { teamsList } = useContext(TeamContext)

  if (teamsList === undefined || !teamsList.length) {
    return <Navigate to={Routes.NoTeams} />
  }

  return <Navigate to={`/team/${teamsList[0]._id}/`} />
}
