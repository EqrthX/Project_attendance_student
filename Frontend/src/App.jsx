
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Overviewpage from './pages/Overviewpage'
import Login from './pages/Login/Login'
import Layout from './components/Layout'
import { AuthProvider } from './contexts/AuthContext'

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route element={<Layout />}>

            <Route path='/overview' element={<Overviewpage />} />

          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
