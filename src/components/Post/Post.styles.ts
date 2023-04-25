import styled from 'styled-components'

export const PostContainer = styled.div`
  color: white;
  display: flex;
  gap: 10px;
`

export const Username = styled.div`
  font-weight: 600;
  font-size: 15px;
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`

export const Time = styled.span`
  font-size: 11px;
  font-weight: 300;
  margin-left: 4px;
`

export const Text = styled.div`
  font-weight: 300;
  font-size: 15px;
  margin: -8px 0;

  img {
    max-width: 500px;
  }
`
