import styled from 'styled-components'

export const AnimatedFormContainer = styled.div`
  @keyframes myAnim {
    0% {
      opacity: 0;
      transform: translateY(-50px);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  animation: myAnim 250ms ease 0s 1 normal both;
`
