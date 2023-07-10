import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components'
import Home from './pages/home/Home'
import Explore from './pages/explore/Explore'
import { ProtectedComponent } from './utils/auth'
import { Suspense, lazy } from 'react'
import Movie from './pages/movie/Movie'

const Login = lazy(() => import("./pages/login/Login"));
const SignUp = lazy(() => import("./pages/signup/SignUp"));
const Profile = lazy(() => import("./pages/profile/Profile"));

function App() {
  return (
    <div className=' bg-slate-950 min-h-screen '>
      <Navbar />
      <Suspense fallback={<p>Loading..</p>}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/signup' element={<ProtectedComponent replace={<SignUp />}><p className='text-white text-center'>404</p></ProtectedComponent>}></Route>
          <Route path='/login' element={<ProtectedComponent replace={<Login />}><p className='text-white text-center'>404</p></ProtectedComponent>}></Route>
          <Route path='/explore' element={<Explore />}></Route>
          <Route path='/movie/*' element={<Movie />}></Route>
          <Route path='/profile' element={<ProtectedComponent replace={<p className='text-white text-center'>404</p>}><Profile /></ProtectedComponent>}></Route>
        </Routes>
      </Suspense>
    </div>
  )
}

export default App
