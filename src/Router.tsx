import { Route, Routes } from 'react-router-dom'

import { History } from './pages/History'
import { Home } from './pages/Home'
import { DefaultLayout } from './layouts/DefaultLayout'

const Router = (): JSX.Element => {
  return (
    <Routes>
      <Route path='/' element={<DefaultLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
      </Route>
    </Routes>
  )
}

export { Router }
