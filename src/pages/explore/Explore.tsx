import { TextCard } from "../../components";

function Explore() {
	return (
		<div className="">
			<Main />
		</div>
	);
}

function Main() {
	const posts = [
		{
			id: "12345",
			profile: {
				image:
					"https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm328-366-tong-08_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=6a37204762fdd64612ec2ca289977b5e",
				username: "John Doe",
			},
			type: "text",
			text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi, magnam nam repudiandae ad iste molestiae natus amet laudantium optio incidunt possimus inventore nostrum vitae ratione repellendus facilis consequatur saepe illo?",
			time: "2h ago",
			likes: "2M",
			comments: "1.6k",
			shares: "500",
			image: "",
		},
		{
			id: "12345",
			profile: {
				image:
					"https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm328-366-tong-08_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=6a37204762fdd64612ec2ca289977b5e",
				username: "John Doe",
			},
			type: "image",
			text: "Hello guys how is this experience?",
			image:
				"https://e0.pxfuel.com/wallpapers/301/386/desktop-wallpaper-top-35-cool-cars-awesome-car-logo.jpg",
			time: "2h ago",
			likes: "2M",
			comments: "1.6k",
			shares: "500",
		},
		{
			id: "12345",
			profile: {
				image:
					"https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm328-366-tong-08_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=6a37204762fdd64612ec2ca289977b5e",
				username: "John Doe",
			},
			type: "text",
			text: "Hello guys how is this experience?",
			time: "2h ago",
			likes: "2M",
			comments: "1.6k",
			shares: "500",
			image: "",
		},
		{
			id: "12345",
			profile: {
				image:
					"https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm328-366-tong-08_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=6a37204762fdd64612ec2ca289977b5e",
				username: "John Doe",
			},
			type: "image",
			text: "Hello guys how is this experience?",
			image:
				"https://e0.pxfuel.com/wallpapers/301/386/desktop-wallpaper-top-35-cool-cars-awesome-car-logo.jpg",
			time: "2h ago",
			likes: "2M",
			comments: "1.6k",
			shares: "500",
		},
		{
			id: "12345",
			profile: {
				image:
					"https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm328-366-tong-08_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=6a37204762fdd64612ec2ca289977b5e",
				username: "John Doe",
			},
			text: "Hello guys how is this experience?",
			time: "2h ago",
			likes: "2M",
			comments: "1.6k",
			shares: "500",
		},
		{
			id: "12345",
			profile: {
				image:
					"https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm328-366-tong-08_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=6a37204762fdd64612ec2ca289977b5e",
				username: "John Doe",
			},
			text: "Hello guys how is this experience?",
			time: "2h ago",
			likes: "2M",
			comments: "1.6k",
			shares: "500",
		},
	];
	return (
		<div className="pb-20 p-4 mt-10 w-full max-w-[1440px] ">
			<div className="flex flex-col items-center justify-center">
				{posts.map((post, index) => (
					<TextCard
						key={index}
						text={post.text}
						time={post.time}
						id={post.id}
						likes={post.likes}
						comments={post.comments}
						shares={post.shares}
						profile={post.profile}
					/>
				))}
			</div>
		</div>
	);
}

export default Explore;
