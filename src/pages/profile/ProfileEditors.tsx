import { ChangeEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { changeDisplayPicture } from "./redux/ChangeDpSlice";

const useChangeProfilePic = () => {
	const token = useAppSelector((state) => state.token.value) || "";
	const data = useAppSelector((state) => state.changeDp);
	const dispatch = useAppDispatch();
	const handleDpChange = (path: File | null) => {
        if (path) {
            dispatch(changeDisplayPicture({ token, path })); 
        }
	};
	return {
		data,
		handleDpChange,
	};
};

export const ProfileEditor = () => {
	const [selected, setSelected] = useState<string | null>(null);
    const [image, setImage] = useState<File | null>(null);
	const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];
        setImage(file);
		if (file) {
			const reader = new FileReader();
			reader.onload = () => {
				setSelected(reader.result as string);
			};
			reader.readAsDataURL(file);
		} else {
			setSelected(null);
		}
	};
	const { data, handleDpChange } = useChangeProfilePic();
	return (
		<div className=" w-64 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 dark:bg-slate-600 rounded-md">
			<div className="w-full flex flex-col p-5 justify-center items-center">
				{selected ? <img src={selected} /> : ""}
			</div>
			<div className="p-2 pt-0 flex flex-row justify-around">
				<input
					type="file"
					id="image"
					className="hidden"
					onChange={handleImageChange}
				/>
				<button
					onClick={() => document.getElementById("image")?.click()}
					className="p-2 text-sm bg-blue-600 text-white rounded-md"
				>
					Choose Image
				</button>
				{data.loading ? (
					<button className="bg-blue-500 px-7 py-2 rounded-md" disabled={true}>
						<i className="fa fa-circle-o-notch fa-spin" aria-hidden="true"></i>
					</button>
				) : (
					<button
						onClick={() => handleDpChange(image)}
						className={`p-2 bg-blue-600 text-white rounded-md text-sm ${
							selected ? "" : "bg-slate-300 cursor-not-allowed"
						}`}
						disabled={selected ? false : true}
					>
						Confirm
					</button>
				)}
			</div>
		</div>
	);
};

export const Editor = ({ type }: { type: 'BIO' | 'NAME' | 'LOCATION' }) => {
    return (
        <div className="w-64 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-200 p-5 flex flex-row justify-start dark:bg-slate-600 rounded-md">
            {type === 'BIO' ? <textarea className="bg-transparent border w-full h-44 focus:outline-none dark:text-white text-start p-1 mr-1" /> : <input type="text" className="w-full bg-transparent border-b mr-1 focus:outline-none dark:text-white" />}
            <button className="p-2 bg-blue-600 h-10 text-white rounded-md text-sm">Confirm</button>
        </div>
    )
}