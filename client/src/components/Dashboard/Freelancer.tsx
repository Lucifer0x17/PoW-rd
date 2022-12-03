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

const Freelancer = () => {
	const { id } = useParams();

	return (
		<DefaultLayout base="/dashboard/freelancer">
			<div className="p-8 py-6 font-secondary ">
				<div>
					<span className="font-serif">Dashboard </span>
					<span className="text-lg font-medium font-extra">
						/ Freelancer{" "}
						{id && (
							<span className="text-sm font-normal text-zinc-500">
								/ {id}
							</span>
						)}
					</span>
				</div>
				<div className="mt-8 text-base font-normal">
					{
						PATH_MAPS.filter(
							item => item.path === (id ? id : "")
						)[0].component
					}
				</div>
			</div>
		</DefaultLayout>
	);
};

export default Freelancer;
