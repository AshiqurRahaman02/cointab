import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from 'xlsx';

import Post from "../components/Post";
import "../App.css";
import { postRoutes } from "../routes/postRoutes";
const notify = (message: string, type: string, time: number = 3000) => {
	if (type === "error") {
		toast.error(message, {
			position: "top-right",
			autoClose: time,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	} else if (type === "success") {
		toast.success(message, {
			position: "top-right",
			autoClose: time,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	} else if (type === "info") {
		toast.info(message, {
			position: "top-right",
			autoClose: time,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	} else if (type === "warning") {
		toast.warn(message, {
			position: "top-right",
			autoClose: time,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	} else {
		toast("🦄 Wow so easy!", {
			position: "top-right",
			autoClose: time,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	}
};

interface IUser {
	id: number;
	name: string;
	username: string;
	email: string;
	address: {
		street: string;
		suite: string;
		city: string;
		zipcode: string;
		geo: {
			lat: string;
			lng: string;
		};
	};
	phone: string;
	website: string;
	company: {
		name: string;
		catchPhrase: string;
		bs: string;
	};
}
interface IPost {
	userId: number;
	id: number;
	title: string;
	body: string;
}

function Posts() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [user, setUser] = useState<IUser>();
	const [posts, setPosts] = useState<IPost[] | []>([]);
	const [isLoding, setIsLoading] = useState(true);
	const [postAdded, setPostAdded] = useState(false);

	useEffect(() => {
		getUser();
	}, []);
	const getUser = async () => {
		fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				setUser(res);
				getPosts();
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
				navigate("/");
			});
	};
	const getPosts = async () => {
		fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				setPosts(res);
				checkIsPostAdded();
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
				navigate("/");
			});
	};

	const checkIsPostAdded = async () => {
		fetch(`${postRoutes.checkUserPost}?user_id=${id}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					setPostAdded(false);
				} else {
					setPostAdded(true);
				}
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
				navigate("/");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const addPosts = async () => {
		setIsLoading(true);
		const requestBody = JSON.stringify({
			userId: user?.id,
			posts: [posts[0]],
		});
		fetch(`${postRoutes.addPosts}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: requestBody,
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					notify(res.message, "error");
				} else {
					notify(res.message, "success");
					setPostAdded(true);
				}
			})
			.catch((err) => {
				console.log(err);
				navigate("/");
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const downloadPosts = async () => {
		try {
			if (!posts || posts.length === 0) {
				notify("No posts found for download", "warning");
				return;
			}

			const workbook = XLSX.utils.book_new();
			const worksheet = XLSX.utils.json_to_sheet(posts);
			XLSX.utils.book_append_sheet(workbook, worksheet, "Posts");
			const filename = `${user?.name}_posts.xlsx`;
			XLSX.writeFile(workbook, filename);
			notify("Excel file downloaded successfully", "success");
		} catch (error) {
			console.error("Error downloading Excel file:", error);
			notify("Error downloading Excel file. Please try again", "error");
		}
	};
	return (
		<div>
			<ToastContainer />
			{isLoding ? (
				<>
					<div className="banter-loader">
						<div className="banter-loader__box"></div>
						<div className="banter-loader__box"></div>
						<div className="banter-loader__box"></div>
						<div className="banter-loader__box"></div>
						<div className="banter-loader__box"></div>
						<div className="banter-loader__box"></div>
						<div className="banter-loader__box"></div>
						<div className="banter-loader__box"></div>
						<div className="banter-loader__box"></div>
					</div>
				</>
			) : (
				<>
					{user && (
						<div
							id="user"
							style={{
								width: `calc(100% - 20px)`,
								margin: "auto",
								display: "flex",
								justifyContent: "space-around",
								border: "0px",
								paddingTop: "20px",
							}}
						>
							<div></div>

							<div style={{ position: "relative" }}>
								<h1>{user.username.split("")[0].toUpperCase()}</h1>
								<p>
									{user.username}{" "}
									<div
										title="Open Website"
										onClick={() =>
											window.open(
												`https://${user.website}`,
												"_blank"
											)
										}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="w-6 h-6"
											style={{ width: "24px", height: "24px" }}
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
											/>
										</svg>
									</div>
								</p>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									gap: "5px",
									marginTop: "5px",
									marginLeft: "5px",
								}}
							>
								<p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="w-6 h-6"
										style={{ width: "24px", height: "24px" }}
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
										/>
									</svg>
									{user.name}
								</p>
								<p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="w-6 h-6"
										style={{ width: "24px", height: "24px" }}
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25"
										/>
									</svg>

									{user.email}
								</p>
								<p>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										className="w-6 h-6"
										style={{ width: "24px", height: "24px" }}
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
										/>
									</svg>
									{user.phone}
								</p>
							</div>
							<div>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<p style={{ margin: "0" }}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="w-6 h-6"
											style={{ width: "24px", height: "24px" }}
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
											/>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
											/>
										</svg>
										Address
									</p>{" "}
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "5px",
										marginTop: "5px",
										marginLeft: "5px",
									}}
								>
									<p>
										<span>Street:</span>
										<span>{user.address.street}</span>
									</p>
									<p>
										<span>Suite:</span>
										<span>{user.address.suite}</span>
									</p>
									<p>
										<span>City:</span>
										<span>{user.address.city}</span>
									</p>
									<p>
										<span>Zipcode:</span>
										<span>{user.address.zipcode}</span>
									</p>
									<p>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="w-6 h-6"
											style={{ width: "24px", height: "24px" }}
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"
											/>
										</svg>{" "}
										Geo location
									</p>
								</div>
							</div>
							<div>
								<div
									style={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<p style={{ margin: "0" }}>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											stroke-width="1.5"
											stroke="currentColor"
											className="w-6 h-6"
											style={{ width: "24px", height: "24px" }}
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
											/>
										</svg>
										Company
									</p>
								</div>
								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "5px",
										marginTop: "5px",
										marginLeft: "5px",
									}}
								>
									<p>
										<span>Company Name:</span>
										<span>{user.company.name}</span>
									</p>
									<p>
										<span>Company phrase:</span>
										<span>{user.company.catchPhrase}</span>
									</p>
									<div>
										<p style={{ marginBottom: "5px" }}>
											Company type:
										</p>
										<p>
											{user.company.bs
												.split(" ")
												.map((type, index) => (
													<span key={index} id="type">
														{type}{" "}
													</span>
												))}
										</p>
									</div>
								</div>
							</div>
						</div>
					)}
					{user && (
						<div
							style={{
								marginLeft: "20px",
								position: "sticky",
								top: "0",
								backgroundColor: "white",
								display: "flex",
								padding: "5px 30px",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<h2>{user.username}'s posts</h2>
							{postAdded ? (
								<button
									type="button"
									className="button"
									onClick={downloadPosts}
								>
									<span className="button__text">
										Download <br /> in excel
									</span>
									<span className="button__icon">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke-linejoin="round"
											stroke-linecap="round"
											stroke="currentColor"
											height="24"
											fill="none"
											className="svg"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
											/>
										</svg>
									</span>
								</button>
							) : (
								<button
									type="button"
									className="button"
									onClick={addPosts}
								>
									<span className="button__text">Bulk Add</span>
									<span className="button__icon">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="24"
											viewBox="0 0 24 24"
											stroke-width="2"
											stroke-linejoin="round"
											stroke-linecap="round"
											stroke="currentColor"
											height="24"
											fill="none"
											className="svg"
										>
											<line y2="19" y1="5" x2="12" x1="12"></line>
											<line y2="12" y1="12" x2="19" x1="5"></line>
										</svg>
									</span>
								</button>
							)}
						</div>
					)}
					{posts.length ? (
						<div
							style={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "space-evenly",
							}}
						>
							{posts.map((post, index) => (
								<Post
									name={user?.name || ""}
									userTag={user?.username || ""}
									title={post.title}
									review={post.body}
									likeCount={Math.floor(Math.random() * 9000 + 1000)}
									commentCount={Math.floor(Math.random() * 900 + 100)}
									retweetCount={Math.floor(Math.random() * 90 + 10)}
								/>
							))}
						</div>
					) : (
						<>
							<h2>{user?.name} don't have any post</h2>
						</>
					)}
				</>
			)}
		</div>
	);
}

export default Posts;
