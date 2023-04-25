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
  max-height: calc(100vh - 260px);
  padding: 16px 32px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.2);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  flex-direction: column;
  gap: 16px;
`
