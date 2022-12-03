import React, { useEffect } from "react";
import DefaultLayout from "@/components/Dashboard/DefaultLayout";
import { useParams } from "react-router-dom";
import Button from "@/elements/Button";
import Modal from "@/elements/Modal";
import { toast } from "react-toastify";
import Table from "@/elements/Table";
import { useDataStore } from "@/contexts/store";

const Balance = () => {
	const balance = useDataStore(state => state.balance);
	const updateBalance = useDataStore(state => state.updateBalance);
	const provider = useDataStore(state => state.provider);
	useEffect(() => {
		setTimeout(() => {
			updateBalance(2.8);
		}, 2000);
	}, []);
	console.log(provider);
	return (
		<div className="pb-8 w-full flex items-end justify-between">
			<span
				className="font-extra font-light text-xl text-animate-up"
				style={{
					//@ts-ignore
					"--start": "0s",
					"--delay": "200ms",
				}}
			>
				Balance
			</span>
			<div
				style={{
					//@ts-ignore
					"--start": "0s",
					"--delay": "250ms",
				}}
				className="dotted-line block-animate-up"
			/>
			<h1
				style={{
					//@ts-ignore
					"--start": "0s",
					"--delay": "300ms",
					display: "flex",
				}}
				className="font-headline text-6xl w-fit text-gradient leading-none text-animate-up gap-2"
			>
				<span>$</span>
				{balance || (
					<span className="h-14 w-16 rounded-xl bg-zinc-800 animate-pulse" />
				)}
			</h1>
		</div>
	);
};

// Placeholder components for each nested path
const Home = () => {
	return (
		<>
			{/* TODO:
				[] Current Balance for contract
			*/}
			<Balance />
			<Table />
		</>
	);
};

const Employees = () => {
	return <>Employees</>;
};

const Freelancers = () => {
	return <>Freelancers</>;
};

const Funds = () => {
	const [isShownModal, setIsShownModal] = React.useState(false);
	const [isShownPrompt, setIsShownPrompt] = React.useState(false);
	const notify = () => toast("This is a toast");
	return (
		<>
			<div className="flex gap-4">
				<Button variant="primary" onClick={() => setIsShownModal(true)}>
					Open Modal
				</Button>
				<Button
					variant="primary"
					onClick={() => setIsShownPrompt(true)}
				>
					Open Prompt
				</Button>
			</div>
			<div className="mt-4">
				<Button variant="primary" onClick={notify}>
					Trigger Toast
				</Button>
			</div>
			<Modal
				isPrompt={true}
				title="Prompt"
				isOpen={isShownPrompt}
				handleClose={() => setIsShownPrompt(false)}
			>
				This is a Prompt
			</Modal>
			<Modal
				isOpen={isShownModal}
				handleClose={() => setIsShownModal(false)}
			>
				This is a Modal
			</Modal>
		</>
	);
};

const PATH_MAPS = [
	{
		path: "",
		component: <Home />,
	},
	{
		path: "funds",
		component: <Funds />,
	},
	{
		path: "employees",
		component: <Employees />,
	},
	{
		path: "freelancers",
		component: <Freelancers />,
	},
];

const Company = () => {
	const { id } = useParams();

	return (
		<DefaultLayout base="/dashboard/freelancer">
			<div className="p-8 py-6 font-secondary w-full">
				<div>
					<div className="w-full flex justify-between items-center">
						<h1>
							<span className="font-serif">Dashboard </span>
							<span className="text-lg font-medium font-extra">
								/ Company{" "}
								{id && (
									<span className="text-sm font-normal text-zinc-500">
										/ {id}
									</span>
								)}
							</span>
						</h1>
						<a className="cursor-pointer p-2 bg-zinc-800 bg-opacity-50 border border-zinc-800 rounded-full text-zinc-400">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-5 h-5"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
								/>
							</svg>
						</a>
					</div>
					<div className="mt-8 text-base font-normal">
						{
							PATH_MAPS.filter(
								item => item.path === (id ? id : "")
							)[0].component
						}
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Company;
