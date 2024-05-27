import styled, { css } from "styled-components";

export const VideoPart = styled.div`
  height: calc(100vh - 108px);
`

export const VideoGrid = styled.div`
  height: 100%; 
  display: flex;
  flex-wrap: wrap;
`

export const VideoCard = styled.div<{width: string; height: string; isSpeaking?: boolean}>`
  width: ${({width}) => width};
  height: ${({height}) => height};
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  outline: 2px solid transparent;
  outline-offset: -3px;

  transition: box-shadow 300ms;

  &:hover .name {
    opacity: 1;
    transition: opacity 500ms;
  }

  video {
    width: calc(100% - 4px)
  }

  ${({isSpeaking}) => isSpeaking && css`
    outline-color: #90caf9;
    outline-style: solid;
    outline-width: 3px;
    transition: outline-color 500ms;

    .name {
      opacity: 1;
      transition: opacity 500ms;
    }
  `}

  &:hover {
    outline-color: #90caf9;
    outline-style: solid;
    outline-width: 3px;
    transition: outline-color 500ms;
  }
`

export const Actions = styled.div`
  padding: 4px 0;
  gap: 8px;
  background: #212121;
  display: flex;
  justify-content: center;
`