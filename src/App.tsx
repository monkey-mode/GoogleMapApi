import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from 'pages/Home'
import Root from 'components/Root'
import Header from 'components/Header'

function App() {
  return (
    <BrowserRouter>
      <Root>
        <Header />
        <Routes>
          <Route path={'/'} element={<Home />} />
        </Routes>
      </Root>
    </BrowserRouter>
  )
}

export default App
