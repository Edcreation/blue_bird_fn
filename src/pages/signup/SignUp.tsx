/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomButton from "../../components/buttons/CustomButton";
import api from "../../utils/axios.config";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../redux/slices/tokenSlice";
import { useAppDispatch } from "../../redux/hooks";

const useSignUp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const handleSignUp = ({
		email,
		username,
		password,
	}: {
		email: string;
		username: string;
		password: string;
	}) => {
		setLoading(true);
		api
			.post("api/auth/signup", { email, username, password })
			.then((res) => {
				setLoading(false);
				dispatch(setToken(res.data.data));
				navigate('/');
			})
			.catch((err) => {
				setLoading(false);
				setError(err.response.data.error || err.response.data.message);
				setTimeout(() => {
					setError(null);
				}, 5000);
			});
	};
	return {
		loading,
		error,
		handleSignUp,
	};
};

export default function SignUp() {
	const image =
		"https://media.istockphoto.com/id/1344945018/photo/beautiful-chrysanthemum-close-up-flower-background-garden-flowers-horizontal-flowers-art.webp?b=1&s=170667a&w=0&k=20&c=-cLFjqqJZ6N4_b-YsiH8uxx18QUSQjWelb8hEHeNd7I=";
	const { loading, error, handleSignUp } = useSignUp();
	const handleSubmit = (event: any) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const data = new FormData(form);
		const formValues: { [name: string]: string } = {};
		for (const [name, value] of data.entries()) {
			formValues[name] = value as string;
		}
		handleSignUp({
			email: formValues.email,
			username: formValues.username,
			password: formValues.password,
		});
	};
	return (
		<div className="w-full flex flex-col items-center justify-start dark:text-white">
			<form
				onSubmit={handleSubmit}
				className="w-4/5 z-10 md:w-3/5 lg:w-1/2 max-w-[600px] mt-20 overflow-hidden flex flex-row justify-center items-start"
			>
				<div
					className="w-2/5 hidden rounded-l border border-r-0 md:block overflow-hidden h-96 scale-100 border-slate-400 dark:border-slate-500"
					style={{
						backgroundImage: `url(${image})`,
						backgroundRepeat: "no-repeat",
						backgroundSize: "cover",
					}}
				></div>
				<div className="w-full md:w-3/5 h-96 border md:border-l-0 flex flex-col justify-center items-center rounded-tr-md rounded-br-md bg-slate-300 border-slate-400 dark:bg-slate-700 dark:border-slate-500">
					<div className="w-full text-center text-lg font-semibold p-2">
						Sign Up
					</div>
					<div className="w-full text-center text-red-300 font-semibold transition animate-pulse h-6">{error}</div>
					<div className="w-4/5 flex flex-col items-center text-start p-2 justify-center">
						<div className="w-full">Email</div>
						<input
							type="email"
							name="email"
							className="bg-transparent text-black w-full border-slate-500 border-b focus:outline-none p-1 dark:text-white"
							autoComplete="off"
						/>
					</div>
					<div className="w-4/5 flex flex-col items-center text-start p-2 justify-center">
						<div className="w-full">Username</div>
						<input
							type="text"
							name="username"
							className="bg-transparent text-black w-full border-slate-500 border-b focus:outline-none p-1 dark:text-white"
							autoComplete="off"
						/>
					</div>
					<div className="w-4/5 flex flex-col items-center text-start p-2 justify-center">
						<div className="w-full">Password</div>
						<input
							type="password"
							name="password"
							className="bg-transparent text-black w-full border-slate-500 border-b focus:outline-none p-1 dark:text-white"
							autoComplete="off"
						/>
					</div>
					<div className="w-3/5 flex flex-col items-center text-start p-2 justify-center">
						{loading ? (
							<button className="bg-blue-500 px-7 py-2 rounded-md" disabled={true}>
								<i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
							</button>
						) : (
							<CustomButton text="Sign Up" />
						)}
					</div>
				</div>
			</form>
		</div>
	);
}
