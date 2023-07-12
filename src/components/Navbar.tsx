import CustomButton from './buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ProtectedComponent } from '../utils/auth';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearToken } from '../redux/slices/tokenSlice';
import { fetchProfile } from '../redux/slices/profileSlice';

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <header className="max-w-[1440px] ">
      <nav className=" flex z-50 pt-2 pb-2 px-3 flex-row fixed top-0 w-full backdrop-blur-sm justify-between text-white">
        <div className="font-extrabold text-xl flex items-center justify-center flex-row text-blue-600">
          <img
            width="0"
            height="0"
            sizes="200vw"
            className="w-auto h-4"
            src="/bluebird.png"
            alt="logo"
          />
        </div>
        <ul
          className={`flex-row ${
            openMenu ? '' : 'hidden'
          } md:flex md:relative md:m-0 md:bg-transparent z-50 text-white items-center text-start mt-10 md:max-w-[200px] w-full absolute right-0 bg-slate-900`}
        >
          <li className="w-full p-3 md:hover:bg-transparent md:hover:underline md:hover:text-blue-600 transition-opacity hover:bg-blue-600 hover:text-white">
            <Link to="/">Home</Link>
          </li>
          <li className="w-full p-3 md:hover:bg-transparent md:hover:underline md:hover:text-blue-600 transition-opacity hover:bg-blue-600 hover:text-white">
            <Link to="/explore">Explore</Link>
          </li>
          <li className="w-full p-3 md:hover:bg-transparent md:hover:underline md:hover:text-blue-600 transition-opacity hover:bg-blue-600 hover:text-white">
            <Link to="/movie">Movies</Link>
          </li>
        </ul>
        <div className="flex flex-row items-center justify-center">
          <ProtectedComponent replace={<AuthButton />}>
            <ProfileButtons />
          </ProtectedComponent>
          <div
            onClick={() => setOpenMenu((prev) => !prev)}
            className=" text-lg md:hidden ml-2 cursor-pointer mr-2 p-4 h-8 w-8 flex justify-center items-center rounded-full right-5"
          >
            {openMenu ?
              <i
                className="fa fa-window-close mt-1 text-xl cursor-pointer"
                aria-hidden="true"
              ></i>:
              <i className="fa fa-bars mt-1 text-xl" aria-hidden="true"></i>
            }
          </div>
        </div>
      </nav>
    </header>
  );
}

function AuthButton() {
  const router = useNavigate();
  return (
    <div className=" flex flex-row items-center">
      <CustomButton
        text="Sign Up"
        styles="underline text-blue-600"
        action={() => router('/signup')}
      />
      <CustomButton
        text="Login"
        styles="rounded-md pt-1 text-white bg-blue-600 p-2 flex justify-center items-center ml-3"
        action={() => router('/login')}
      />
    </div>
  );
}

function ProfileButtons() {
  const [openProfile, setOpenProfile] = useState(false);
  const { loading, profile } = useAppSelector((state) => state.profile);
  const token = useAppSelector((state) => state.token.value);
  const dpChange = useAppSelector((state) => state.changeDp);
  const pChange = useAppSelector((state) => state.changeProfileData);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProfile(token || ''));
  }, [token, dispatch, dpChange, pChange]);

  const navigate = useNavigate();
  return (
    <div className="flex flex-row items-center right-10">
      <div className="text-blue-600 mr-5 text-lg ">
        <i className="fa fa-bell-o" aria-hidden="true"></i>
      </div>
      {loading ?
        <div
          onClick={() => setOpenProfile((prev) => !prev)}
          className="h-8 w-8 object-fit cursor-pointer rounded-full animate-pulse bg-slate-300"
        ></div>:
        <div
          onClick={() => setOpenProfile((prev) => !prev)}
          className="h-8 w-8 object-fit cursor-pointer rounded-full bg-blue-600"
          style={{
            background: `url(${
              profile?.image ||
							'https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg'
            })`,
            backgroundSize: 'contain',
            WebkitBackgroundSize: 'contain'
          }}
        ></div>
      }
      <div
        onMouseLeave={() => setOpenProfile((prev) => !prev)}
        className={`w-52 h-56 mt-[48px] md:mt-12 flex flex-col justify-between bg-slate-800 fixed ${
          openProfile ? '' : 'hidden'
        } z-10 right-0 top-0`}
      >
        <div className="">
          <div className="h-12  bg-slate-900 flex justify-start items-center">
            <div onClick={() => setOpenProfile(false)} className="p-4 py-3 bg-slate-700 cursor-pointer">
              <i className="fa fa-chevron-left" aria-hidden="true"></i>
            </div>
          </div>

          <div
            onClick={() => navigate('/profile')}
            className="p-2 mt-5 cursor-pointer  hover:bg-blue-600 bg-slate-800"
          >
            <i className="fa fa-user mr-3" aria-hidden="true"></i>Profile
          </div>
          <div
            onClick={() => navigate('/profile')}
            className="p-2 cursor-pointer  hover:bg-blue-600 bg-slate-800"
          >
            <i className="fa fa-cogs text-[10px] mr-3" aria-hidden="true"></i>Settings
          </div>
        </div>
        <div
          onClick={() => {
            dispatch(clearToken());
            navigate('/explore');
          }}
          className="p-2 cursor-pointer  hover:bg-blue-600 hover:text-white bg-slate-800"
        >
          <i className="fa fa-sign-out mr-3" aria-hidden="true"></i>Logout
        </div>
      </div>
    </div>
  );
}
