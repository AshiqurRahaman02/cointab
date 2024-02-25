import React, { useEffect, useState } from "react";

import "../App.css";
import { userRoutes } from "../routes/userRoutes";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import User from "../components/User";

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

function Home() {
	const [users, setUsers] = useState([]);
	const [isLoding, setIsLoading] = useState<boolean>(true);

	const [jsonUsers, setJsonUsers] = useState([]);

	useEffect(() => {
		getAllUsers();
	}, []);
	const getAllUsers = async () => {
		fetch(`${userRoutes.getAllUsers}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					notify(res.message, "warning");
				} else {
					setUsers(res.users);
				}
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
			})
			.finally(() => {
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			});
	};

	const getJsonUsers = async () => {
		setIsLoading(true);
		fetch(`https://jsonplaceholder.typicode.com/users`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((res) => {
				setJsonUsers(res);
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
			})
			.finally(() => {
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			});
	};
	return (
		<div>
			<div
				style={{
					width: "max-content",
					textAlign: "center",
					margin: "auto",
				}}
			>
				<h1>Cointab SE-ASSIGNMENT</h1>
				<button className="button1" onClick={getJsonUsers}>
					All users
				</button>
			</div>
			<ToastContainer />
			<main>
				<section>
					<h3 style={{ textAlign: "center" }}>All Users</h3>
					<div>
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
								{jsonUsers.length ? (
									<div id="users">
										{jsonUsers.map((user: any, index) => (
											<User
												key={index}
												users={users}
												user={user}
												notify={notify}
											/>
										))}
									</div>
								) : (
									<div
										style={{
											minHeight: "500px",
											width: "90%",
											margin: "auto",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											flexDirection: "column",
										}}
									>
										<h2>Click to get all users</h2>
										<button
											className="button1"
											onClick={getJsonUsers}
										>
											All users
										</button>
									</div>
								)}
							</>
						)}
					</div>
				</section>
			</main>
		</div>
	);
}

export default Home;
