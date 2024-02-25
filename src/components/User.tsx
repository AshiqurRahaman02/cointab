import React, { useEffect, useState } from "react";
import { userRoutes } from "../routes/userRoutes";
import { useNavigate } from "react-router-dom";

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
interface Props {
	users: any;
	user: IUser;
	notify: any;
}
function User({ users, user, notify }: Props) {
	const navigate = useNavigate();
	const [isAdded, setIsAdded] = useState(false);

	const [displayAddress, setDisplayAddress] = useState(false);
	const [displayCompany, setDisplayCompany] = useState(false);

	useEffect(() => {
		users.forEach((u: any) => {
			if (u.user_id === user.id) {
				setIsAdded(true);
			}
		});
	}, []);

	const addUser = () => {
		fetch(userRoutes.addUser, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				user_id: user.id,
				name: user.name,
				email: user.email,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.isError) {
					notify(res.message, "error");
				} else {
					setIsAdded(true);
				}
			})
			.catch((err) => {
				console.log(err);
				notify(err.message, "error");
			});
	};
	return (
		<div id="user">
			<div
				title="Open Website"
				onClick={() => window.open(`https://${user.website}`, "_blank")}
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

			<div>
				<h1>{user.username.split("")[0].toUpperCase()}</h1>
				<p>{user.username}</p>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					gap: "10px",
					marginTop: "10px",
					marginBottom: "30px",
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
						<div onClick={() => setDisplayAddress((pre) => !pre)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6"
								style={{
									width: "24px",
									height: "24px",
									rotate: displayAddress ? "180deg" : "0deg",
									cursor: "pointer",
								}}
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m19.5 8.25-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</div>
					</div>
					{displayAddress && (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "5px",
								marginLeft: "34px",
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
					)}
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
						</p>{" "}
						<div onClick={() => setDisplayCompany((pre) => !pre)}>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								className="w-6 h-6"
								style={{
									width: "24px",
									height: "24px",
									rotate: displayCompany ? "180deg" : "0deg",
									cursor: "pointer",
								}}
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="m19.5 8.25-7.5 7.5-7.5-7.5"
								/>
							</svg>
						</div>
					</div>
					{displayCompany && (
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "5px",
								marginLeft: "34px",
							}}
						>
							<p>
								<span>{user.company.name}</span>
							</p>
							<p>
								<span>{user.company.catchPhrase}</span>
							</p>
							<div
								style={{
									display: "flex",
									gap: "5px",
								}}
							>
								{user.company.bs.split(" ").map((type, index) => (
									<span key={index} id="type">
										{type}{" "}
									</span>
								))}
							</div>
						</div>
					)}
				</div>
			</div>
			{isAdded ? (
				<button
					type="button"
					className="button"
					onClick={() => {
						navigate(`/post/${user.id}`);
					}}
				>
					<span className="button__text">Open</span>
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
								d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
							/>
						</svg>
					</span>
				</button>
			) : (
				<button type="button" className="button" onClick={addUser}>
					<span className="button__text">Add</span>
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
	);
}

export default User;
