import { useState } from 'react'
import InputComponent from '../../components/InputComponent'
import ButtonComponent from '../../components/ButtonComponent'
import axiosInstance from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: null,
    password: null
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!user.username || !user.password) {
      setError("กรุณากรอกข้อมูลทั้งหมด")
      return;
    }

    try {
      const response = await axiosInstance.post("/login", user, {
        withCredentials: true
      })

      console.log("Response Data:", response.data.user)

      if(response.data.user.user_role === "teacher") {
        navigate("/overview");
      } else if(response.data.user.user_role === "admin") {
        navigate("/")
      }
    } catch (error) {
      console.log("Error Login: ", error.message)
    }


  }

  return (
    <div className='w-full h-screen flex justify-center items-center bg-gradient-to-br from-sky-400 to-blue-600'>

      <div
        className='w-full max-w-sm bg-white px-5 py-8 rounded-lg 
          sm:max-w-md 
          md:max-w-lg 
          lg:max-w-xl 
          xl:max-w-3xl
          mx-auto"'
      >
        <form onSubmit={handleSubmit}>
          <h1 className='text-center text-4xl uppercase'>Login</h1>
          <div className='mt-5 mb-5'>
            <label
              className='block text-center sm:text-left text-gray-600 mb-1'
            >
              username
            </label>
            <InputComponent
              type='text'
              className='
            w-full bg-transparent p-1.5 mt-2 rounded-md placeholder:text-slate-400 text-slate-700 text-md 
            border border-slate-200 transition duration-300 ease focus:outline-none focus:border-blue-500
            hover:border-blue-500 focus:shadow
            '
              onChange={handleChange}
              name="username"
              placeholder={"Username "}
            />
          </div>

          <div className='mt-5 mb-5'>
            <label className='block text-center sm:text-left text-gray-600 mb-1'>password</label>
            <InputComponent
              type='password'
              className='
            w-full bg-transparent p-1.5 mt-2 rounded-md placeholder:text-slate-400 text-slate-700 text-md 
            border border-slate-200 transition duration-300 ease focus:outline-none focus:border-blue-500
            hover:border-blue-500 focus:shadow
            '
              onChange={handleChange}
              name="password"
              placeholder={"Password"}
            />
          </div>

          {error && <p className='text-red-600'>{error}</p>}
        
          <ButtonComponent
            type='submit'
            className={`w-full bg-blue-600 p-3 rounded-lg text-white cursor-pointer transition-colors hover:bg-blue-800`}
          >
            Login
          </ButtonComponent>
        </form>

      </div>

    </div>
  )
}

export default Login
