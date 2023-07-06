import { ImageCardType } from "../../utils/types";

function ImageCard({ profile, time, likes, shares, comments, image }: ImageCardType) {
	return (
		<div className="w-80 flex overflow-hidden flex-col justify-center items-center min-h-[100px] bg-slate-200 rounded-md border text-sm border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100">
			<div className="p-5  w-full flex flex-row items-center justify-between">
				<div className="flex flex-row items-center">
					<div className="h-10 w-10 rounded-full overflow-hidden flex justify-center items-center border border-slate-300 dark:border-slate-900 bg-white">
						<img
							src={profile.image}
							width="40"
							height="30"
							sizes="100vw"
							className="h-full"
							alt={profile.username}
						/>
					</div>
					<div className="ml-1 italic font-bold">{profile.username}</div>
				</div>
				<div className="text-slate-500 font-thin italic">{time}</div>
			</div>
			<img
				src={image}
				width={0}
				height={0}
				sizes="100vw"
				className="w-full max-h-[500px]"
				alt={image}
			/>
			<div className="w-full flex flex-row items-center justify-between p-1">
				<div className="px-5 flex flex-row items-center justify-between w-4/5 md:w-3/5">
					<button className=" flex flex-row items-center">
						<i className="fa fa-heart text-red-700" aria-hidden="true"></i>
						<p className="ml-1 text-sm text-red-700">{likes}</p>
					</button>
					<button className=" flex flex-row items-center justify-center">
						<i className="fa fa-retweet text-blue-600" aria-hidden="true"></i>
						<p className="ml-1 text-sm text-blue-600">{shares}</p>
					</button>
					<button className=" flex flex-row items-center justify-center">
						<i
							className="fa fa-comments-o text-green-600"
							aria-hidden="true"
						></i>
						<p className="ml-1 text-sm text-green-600">{comments}</p>
					</button>
				</div>
				<button className="text-md p-2">
					<i className="fa fa-bookmark" aria-hidden="true"></i>
				</button>
			</div>
		</div>
	);
}

export default ImageCard;
