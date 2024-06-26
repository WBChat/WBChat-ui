import styled from 'styled-components'

export const ChannelContainer = styled.div`
  position: relative;
  height: 100%;
  background-color: #212325;
`

export const ChannelHeader = styled.div`
  padding: 12px 24px;
  border-bottom: 1px solid #383A3D;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const PostsArea = styled.div<{offset: string; hide: boolean}>`
  width: 100%;
  /* display: ${({hide}) => hide ? 'none' : 'flex'}; */
  display: flex;
  opacity: ${({hide}) => hide ? 0 : 1};;
  max-height: calc(100vh - ${({offset}) => offset});
  padding: 16px 0;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 10px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.1);
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.3);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.6);
  }
  flex-direction: column;
`
