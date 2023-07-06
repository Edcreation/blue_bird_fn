import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";
import { Editor, ProfileEditor } from "./ProfileEditors";

export default function Profile() {
	const { error, profile, loading } = useAppSelector((state) => state.profile);
	return (
		<div className="pt-5 min-h-screen flex flex-col justify-start items-center">
			{loading ? (
				<>
					<HeaderSkelleton />
					<BioSkelleton />
				</>
			) : error ? (
				<div className=""></div>
			) : (
				<>
					<Header profileImage={profile.image} />
					<Bio
						location={profile.location}
						bio={profile.bio}
						name={profile.name}
					/>
				</>
			)}
		</div>
	);
}

function Header({ profileImage }: { profileImage: string }) {
	const [display, setDisplay] = useState(false);
	return (
		<div
			className="w-11/12 md:w-4/5 max-w-[1000px] h-44 rounded-md border dark:border-slate-600"
			style={{
				backgroundImage:
					"url(https://marketplace.canva.com/EAE89qUYCic/1/0/1600w/canva-blue-ocean-tide-beach-motivational-quote-facebook-cover-UlayDxq20Mo.jpg)",
				backgroundRepeat: "no-repeat",
				backgroundPosition: "center",
				backgroundSize: "cover",
			}}
		>
			<div className=" h-32 w-32 rounded-full bg-white absolute mt-28 ml-5 border overflow-hidden">
				<img
					className="w-full h-full"
					src={`${
						profileImage ||
						"https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg"
					}`}
					alt="image"
				/>
			</div>
			<div
				onClick={() => setDisplay(true)}
				className="absolute w-7 h-7 mt-52 ml-28 rounded-full bg-white border-2 cursor-pointer flex justify-center items-center"
			>
				<i className="fa fa-pencil" aria-hidden="true"></i>
			</div>
			{display ? (
				<>
					<div
						onClick={() => setDisplay(false)}
						className="flex justify-center items-center absolute w-full h-full left-0"
					></div>
					<ProfileEditor />
				</>
			) : (
				""
			)}
		</div>
	);
}

function Bio({
	bio,
	location,
	name,
}: {
	bio: string;
	location: string;
	name: string;
}) {
	const [display, setDisplay] = useState(false);
	const [type, setType] = useState<'NAME' | 'BIO' | 'LOCATION'>('NAME');
	return (
		<div className="w-11/12 md:w-4/5 max-w-[1000px] border mt-2 flex flex-row dark:border-slate-600 rounded-md">
			<div className="w-44 h-full hidden md:block"></div>
			<div className="w-full  h-full p-5">
				<div className="flex flex-col pt-10 md:pt-0">
					<div className="text-lg font-semibold dark:text-white">
						{name === undefined ? (
							<button onClick={() => {setDisplay(true); setType('NAME') }} className="text-sm p-1">
								<i className="fa fa-plus mr-1" aria-hidden="true"></i>Add Name
							</button>
						) : (
							<p>{name}</p>
						)}
					</div>
					<div className="py-2 dark:text-white">
						<i className="fa fa-map-marker mr-3" aria-hidden="true"></i>
						{location === undefined ? (
							<button onClick={() => {setDisplay(true); setType('LOCATION') }} className="text-sm p-1">
								<i className="fa fa-plus mr-1" aria-hidden="true"></i>Add Location
							</button>
						) : (
							<p>{location}</p>
						)}
					</div>
					<div className="max-w-[300px] pl-3 border-l dark:border-slate-600 mt-2 text-slate-600">
					{bio === undefined ? (
							<button onClick={() => {setDisplay(true); setType('BIO') }} className="text-sm  p-1">
								<i className="fa fa-plus mr-1" aria-hidden="true"></i>Add Bio
							</button>
						) : (
							<p>{bio}</p>
						)}
					</div>
				</div>
				{display ? (
				<>
					<div
						onClick={() => setDisplay(false)}
						className="flex justify-center items-center absolute w-full h-full left-0"
					></div>
					<Editor type={type} />
				</>
			) : (
				""
			)}
			</div>
		</div>
	);
}

function HeaderSkelleton() {
	return (
		<div className="w-11/12 md:w-4/5 max-w-[1000px] h-44 rounded-md border dark:bg-slate-700 dark:border-slate-600">
			<div className=" h-32 w-32 rounded-full  absolute mt-28 ml-5 bg-slate-300 border dark:border-slate-500 overflow-hidden dark:bg-slate-800"></div>
		</div>
	);
}

function BioSkelleton() {
	return (
		<div className="w-11/12 md:w-4/5 max-w-[1000px] border mt-2 flex flex-row dark:border-slate-600 rounded-md">
			<div className="w-44 h-full hidden md:block"></div>
			<div className="w-full  h-full p-5">
				<div className="flex flex-col pt-10 md:pt-0">
					<div className="text-lg font-semibold h-7 animate-pulse rounded-sm w-44 bg-slate-400 dark:text-white"></div>
					<div className="py-2 animate-pulse w-36 rounded-sm bg-slate-400 mt-2 dark:text-white"></div>
					<div className="max-w-[300px] pl-3 border-l dark:border-slate-600 mt-2 text-slate-600">
						<div className="py-2 animate-pulse rounded-sm w-48 bg-slate-400 mt-2 dark:text-white"></div>
						<div className="py-2 animate-pulse rounded-sm w-40 bg-slate-400 mt-2 dark:text-white"></div>
						<div className="py-2 animate-pulse rounded-sm w-36 bg-slate-400 mt-2 dark:text-white"></div>
					</div>
				</div>
			</div>
		</div>
	);
}
