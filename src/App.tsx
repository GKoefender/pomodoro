import { ThemeProvider } from 'styled-components'

import { Button } from './Components/Button'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'

function App () {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <Button></Button>
      <Button></Button>
      <Button></Button>
      <Button></Button>
    </ThemeProvider>
  )
}

export { App }
