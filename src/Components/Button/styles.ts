import styled from 'styled-components'

interface buttonContainerProps {
  color?: string
}

const Container = styled.div<buttonContainerProps>`
  width: 100px;
  height: 100px;

  background-color: ${props => props.theme['green-500']};
`

export { Container }
