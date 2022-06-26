import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from 'pages/Home'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
const lightTheme = createTheme({
  type: 'light',
})

const darkTheme = createTheme({
  type: 'dark',
})

function App() {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}
    >
      <NextUIProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </NextUIProvider>
    </NextThemesProvider>
  )
}

export default App
