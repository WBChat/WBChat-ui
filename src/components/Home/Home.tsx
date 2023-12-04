import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { TeamContext } from 'src/shared/context/team/TeamContext'

export const Home: React.FC = () => {
  const { teamsList } = useContext(TeamContext)

  if (teamsList === undefined || !teamsList.length) {
    return <>create team</>
  }

  return <Navigate to={`/team/${teamsList[0]._id}/`} />
}
