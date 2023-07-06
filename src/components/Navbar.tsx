import CustomButton from "./buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { ProtectedComponent } from "../utils/auth";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { clearToken } from "../redux/slices/tokenSlice";
import { fetchProfile } from "../redux/slices/profileSlice";

export default function Navbar() {
	const [openMenu, setOpenMenu] = useState(false);
	return (
		<header className="max-w-[1440px] ">
			<nav className="p-3 flex z-50 pt-3 flex-row justify-between dark:text-white">
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
				<div
					onClick={() => setOpenMenu(false)}
					className={`absolute ${
						openMenu ? "" : "hidden"
					} left-0 bottom-0 z-30 w-full  h-full`}
				></div>
				<ul
					className={`flex-row ${
						openMenu ? "" : "hidden"
					} md:flex md:relative md:m-0 md:bg-transparent text-slate-800 dark:bg-slate-800 z-50 dark:text-white items-center text-start mt-10 max-w-[200px] w-52 absolute right-3 bg-slate-300`}
				>
					<li className="w-full p-3 md:hover:bg-transparent md:hover:underline md:hover:text-blue-600 transition-opacity hover:bg-blue-600 hover:text-white">
						<Link to="/">Home</Link>
					</li>
					<li className="w-full p-3 md:hover:bg-transparent md:hover:underline md:hover:text-blue-600 transition-opacity hover:bg-blue-600 hover:text-white">
						<Link to="/explore">Explore</Link>
					</li>
					<li className="w-full p-3 md:hover:bg-transparent md:hover:underline md:hover:text-blue-600 transition-opacity hover:bg-blue-600 hover:text-white">
						Trending
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
						{openMenu ? (
							<i
								className="fa fa-window-close mt-1 text-xl cursor-pointer"
								aria-hidden="true"
							></i>
						) : (
							<i className="fa fa-bars mt-1 text-xl" aria-hidden="true"></i>
						)}
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
				action={() => router("/signup")}
			/>
			<CustomButton
				text="Login"
				styles="rounded-md pt-1 text-white bg-blue-600 p-2 flex justify-center items-center ml-3"
				action={() => router("/login")}
			/>
		</div>
	);
}

function ProfileButtons() {
	const [openProfile, setOpenProfile] = useState(false);
	const { loading, profile } = useAppSelector((state) => state.profile);
    const token = useAppSelector((state) => state.token.value);
    const dpChange = useAppSelector((state) => state.changeDp);
	const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchProfile(token || ''))
    }, [token, dispatch, dpChange])
    
	const navigate = useNavigate();
	return (
		<div className="flex flex-row items-center right-10">
			<div
				onClick={() => setOpenProfile(false)}
				className={`absolute ${
					openProfile ? "" : "hidden"
				} left-0 bottom-0 w-full h-full`}
			></div>
			<div className="text-blue-600 mr-5 text-lg ">
				<i className="fa fa-bell-o" aria-hidden="true"></i>
			</div>
			{loading ? (
				<div
					onClick={() => setOpenProfile((prev) => !prev)}
					className="h-8 w-8 object-fit cursor-pointer rounded-full animate-pulse bg-slate-300"
				></div>
			) : (
				<div
					onClick={() => setOpenProfile((prev) => !prev)}
					className="h-8 w-8 object-fit cursor-pointer rounded-full bg-blue-600"
					style={{
						background: `url(${
							profile.image ||
							"https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
						})`,
						backgroundSize: "contain",
					}}
				></div>
			)}

			<div
				className={`w-52 absolute ${
					openProfile ? "" : "hidden"
				} z-50 right-3 top-12 mt-4`}
			>
				<div className="w-full p-2 bg-slate-200 flex flex-row justify-center items-center dark:bg-slate-700">
					<div className="w-10 h-10 bg-white rounded-full border border-slate-50"></div>
					<div className="ml-5 text-sm dark:text-white italic font-semibold">
						eddymugish65
					</div>
				</div>
				<div
					onClick={() => navigate("/profile")}
					className="p-2 cursor-pointer bg-slate-200 hover:bg-blue-600 hover:text-white dark:bg-slate-800"
				>
					<i className="fa fa-user mr-3" aria-hidden="true"></i>Profile
				</div>
				<div
					onClick={() => dispatch(clearToken())}
					className="p-2 cursor-pointer bg-slate-200 hover:bg-blue-600 hover:text-white dark:bg-slate-800"
				>
					<i className="fa fa-sign-out mr-3" aria-hidden="true"></i>Logout
				</div>
			</div>
		</div>
	);
}
