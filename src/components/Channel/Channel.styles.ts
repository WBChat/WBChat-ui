import styled from 'styled-components'

export const ChannelContainer = styled.div`
  position: relative;
  height: 100%;
`

export const ChannelHeader = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid #e0e1e3;
`

export const ChannelTitle = styled.span`
  color: #fff;
  font-size: 17px;
`

export const EditorContainer = styled.div`
  position: absolute;
  bottom: 16px;
  left: 12px;
  right: 12px;
`

export const PostsArea = styled.div`
  width: calc(100% - 68px);
  display: flex;
  max-height: calc(100vh - 250px);
  padding: 0 32px;
  overflow-y: auto;
  flex-direction: column;
  gap: 8px;
`
