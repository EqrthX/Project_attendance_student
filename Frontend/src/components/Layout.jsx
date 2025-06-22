import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import ButtonComponent from './ButtonComponent'
import { useAuth } from '../contexts/AuthContext'
import { HiMenu, HiX } from 'react-icons/hi'
import axiosInstance from '../utils/axiosInstance'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const response = await axiosInstance.post("/logout", {
        withCredentials: true
      })

      if(response) {
        navigate("/")
      }
    } catch (error) {
      console.log("Error to logout: ", error)
    }
  }
  return (
    <div className='flex h-screen'>
      <ButtonComponent
        className="md:hidden absolute top-4 left-4 z-20 p-2 rounded bg-indigo-600 text-white"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Open sidebar"
      >
        <HiMenu className='w-6 h-6'/>
      </ButtonComponent>

      <aside
        className={`
          fixed top-0 left-0 h-full bg-indigo-600 text-white 
          flex-shrink-0 z-30 w-50 p-6 md:w-58 lg:w-60
          transition-transform duration-200
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:static md:translate-x-0 md:w-32 lg:w-40 md:block
        `}
      >
        <div
          className='flex justify-between items-center mb-8'
        >
          {/* Header */}
          <span className='font-bold text-lg'>Sidebar</span>
          <button
            className="md:hidden p-1"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <HiX className='w-6 h-6 transform duration-100 hover:scale-120'/>
          </button>
        </div>

        {/* Sidebar content here */}
        <div className='flex flex-col'>
          <Link to={"/overview"}>Overview</Link>
          <Link>Dashboard</Link>
          <Link>Student</Link>
        </div>

        <div 
          className='mt-8 flex flex-col  items-center gap-3 absolute bottom-5 left-0 right-0'
        >
          {user && <span className='text-md'>{user.name}</span>}
          <ButtonComponent 
            className="bg-red-700 px-3 py-1 rounded text-lg transition-colors hover:bg-red-900"
            onClick={handleLogout}
          >
            Logout
          </ButtonComponent>
        </div>
      </aside>

      {/* Overlay Mobile only */}
      {sidebarOpen && (
        <div
          className='fixed inset-0 bg-black/50 z-20 md:hidden'
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* main content */}
      <main className='flex-1 p-4 md:ml-32 lg:ml-40'><Outlet /></main>
    </div>
  )
}

export default Layout
