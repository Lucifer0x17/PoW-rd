import React, { useEffect, useState } from "react";
import DefaultLayout from "@/components/Dashboard/DefaultLayout";
import { useParams } from "react-router-dom";
import Button from "@/elements/Button";
import Modal from "@/elements/Modal";
import { toast } from "react-toastify";
import Table from "@/elements/Table";
import { useDataStore } from "@/contexts/store";
import Freelancer from "./Freelancer";
import FreelancerTable from "@/elements/FreelancerTable";

const Balance = () => {
	const balance = useDataStore(state => state.balance);
	const updateBalance = useDataStore(state => state.updateBalance);
	const provider = useDataStore(state => state.provider);
	useEffect(() => {
		setTimeout(() => {
			updateBalance(2.8);
		}, 1000);
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

const AddEmployee = () => {
	const [info, setInfo] = useState({
		name: null,
		address: null,
		amount: null,
		start: null,
		period: null,
	});
	const handleSubmit = () => {
		// Replace with real backend code
		// axios.post(url,info).then().catch()
	};
	return (
		<div className="py-8 pt-0 block">
			<div className="ReactModal__Content !rounded-none overflow-hidden !ml-0 !scale-100">
				<div className="flex justify-between py-6 px-8 text-lg font-secondary sticky bg-zinc-900 top-0 left-0 z-20 border-b border-gray-400 border-opacity-10">
					<span className="">New Employee</span>
				</div>
				<div className="w-fit relative max-h-[22rem] p-8">
					<form className="w-full space-y-4">
						<div className="flex items-center gap-4">
							<input
								className="bg-zinc-800 w-fit appearance-none border-2 border-zinc-700 rounded py-2 px-4 text-zinc-200 leading-tight focus:outline-none focus:bg-zinc-800	 focus:border-sky-800"
								type="text"
								value={info.name || ""}
								onChange={e => {
									setInfo({
										...info,
										//@ts-ignore
										name: e.target.value,
									});
								}}
								placeholder="Employee Name"
							/>
							<input
								className="bg-zinc-800 w-fit appearance-none border-2 border-zinc-700 rounded py-2 px-4 text-zinc-200 leading-tight focus:outline-none focus:bg-zinc-800	 focus:border-sky-800"
								type="text"
								value={info.address || ""}
								onChange={e => {
									setInfo({
										...info,
										//@ts-ignore
										address: e.target.value,
									});
								}}
								placeholder="Employee ENS"
							/>
						</div>
						<div className="flex items-center gap-4">
							<input
								className="bg-zinc-800 w-full appearance-none border-2 border-zinc-700 rounded py-2 px-4 text-zinc-200 leading-tight focus:outline-none focus:bg-zinc-800	 focus:border-sky-800"
								type="text"
								value={info.amount || ""}
								onChange={e => {
									setInfo({
										...info,
										//@ts-ignore
										amount: parseFloat(e.target.value),
									});
								}}
								placeholder="Amount (paid periodically)"
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<input
								className="bg-zinc-800 w-full appearance-none border-2 border-zinc-700 rounded py-2 px-4 text-zinc-200 leading-tight focus:outline-none focus:bg-zinc-800	 focus:border-sky-800"
								type="date"
								value={info.start || ""}
								onChange={e => {
									setInfo({
										...info,
										//@ts-ignore
										start: e.target.value,
									});
								}}
								placeholder="Start Time"
							/>
							<input
								className="bg-zinc-800 w-full appearance-none border-2 border-zinc-700 rounded py-2 px-4 text-zinc-200 leading-tight focus:outline-none focus:bg-zinc-800	 focus:border-sky-800"
								type="time"
								value={info.period || ""}
								onChange={e => {
									setInfo({
										...info,
										//@ts-ignore
										period: e.target.value,
									});
								}}
								placeholder="Pay Period"
							/>
						</div>
					</form>
				</div>
				<div className="sticky bottom-0 right-0 flex flex-row-reverse gap-4 px-8 py-6 mt-0 border-t border-gray-400 bg-zinc-900 border-opacity-10">
					<Button variant="primary" onClick={handleSubmit}>
						Generate Invoice
					</Button>
				</div>
			</div>
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
			<h3 className="font-headline text-3xl mb-4">Add Employee</h3>
			<AddEmployee />
			<h3 className="font-headline text-3xl mb-4">List of Employees</h3>
			<Table />
		</>
	);
};

const AddFunds = () => {
	const [amount, setAmount] = useState(null);
	const handleSubmit = () => {
		// Replace with real backend code
		// axios.post(url,{
		// 	amount: amount
		// }).then().catch()
	};
	return (
		<div
			className="py-8 pt-0 block block-animate-up"
			style={{
				//@ts-ignore
				"--start": "0s",
				"--delay": "200ms",
			}}
		>
			<div className="ReactModal__Content !max-w-none !rounded-none overflow-hidden !ml-0 !scale-100">
				<div className="flex justify-between py-6 px-8 text-lg font-secondary sticky bg-zinc-900 top-0 left-0 z-20 border-b border-gray-400 border-opacity-10">
					<h3 className="font-headline text-3xl">Add Funds</h3>
				</div>
				<div className="w-fit relative max-h-[22rem] p-8">
					<form className="w-full space-y-4">
						<input
							className="bg-zinc-800 w-fit appearance-none border-2 border-zinc-700 rounded py-2 px-4 text-zinc-200 leading-tight focus:outline-none focus:bg-zinc-800	 focus:border-sky-800"
							type="text"
							value={amount || ""}
							onChange={e => {
								setAmount(
									//@ts-ignore
									parseFloat(e.target.value)
								);
							}}
							placeholder="Amount"
						/>
					</form>
				</div>
				<div className="sticky bottom-0 right-0 flex flex-row-reverse items-center justify-between gap-4 px-8 py-6 mt-0 border-t border-gray-400 bg-zinc-900 border-opacity-10">
					<Button variant="primary" onClick={handleSubmit}>
						Add Funds
					</Button>
				</div>
			</div>
		</div>
	);
};

const WithdrawFunds = () => {
	const [amount, setAmount] = useState(null);
	const handleSubmit = () => {
		// Replace with real backend code
		// axios.post(url,{
		// 	amount: amount
		// }).then().catch()
	};
	const maxAmount = 10;

	return (
		<div
			className="py-8 pt-0 block block-animate-up"
			style={{
				//@ts-ignore
				"--start": "50ms",
				"--delay": "250ms",
			}}
		>
			<div className="ReactModal__Content !max-w-none w-full !rounded-none overflow-hidden !ml-0 !scale-100">
				<div className="flex justify-between py-6 px-8 text-lg font-secondary sticky bg-zinc-900 top-0 left-0 z-20 border-b border-gray-400 border-opacity-10">
					<h3 className="font-headline text-3xl">Withdraw Funds</h3>
				</div>
				<div className="w-fit relative max-h-[22rem] p-8">
					<form className="w-full space-y-4">
						<input
							className="bg-zinc-800 w-fit appearance-none border-2 border-zinc-700 rounded py-2 px-4 text-zinc-200 leading-tight focus:outline-none focus:bg-zinc-800	 focus:border-sky-800"
							type="text"
							value={amount || ""}
							onChange={e => {
								setAmount(
									//@ts-ignore
									parseFloat(e.target.value)
								);
							}}
							placeholder="Amount"
						/>
					</form>
				</div>
				<div className="sticky bottom-0 right-0 flex justify-between items-center gap-4 px-8 py-6 mt-0 border-t border-gray-400 bg-zinc-900 border-opacity-10">
					<span className="text-sm inline-block leading-none px-2 py-1 rounded-full text-sky-300 ">
						Max withdrawable amount:{" "}
						<span className="font-bold text-base text-sky-200">
							${maxAmount}
						</span>
					</span>
					<Button variant="secondary" onClick={handleSubmit}>
						Withdraw Funds
					</Button>
				</div>
			</div>
		</div>
	);
};

// const Freelancers = () => {
// 	const [isShownModal, setIsShownModal] = React.useState(false);
// 	const [isShownPrompt, setIsShownPrompt] = React.useState(false);
// 	const notify = () => toast("This is a toast");
// 	return (
// 		<>
// 			<div className="flex gap-4">
// 				<Button variant="primary" onClick={() => setIsShownModal(true)}>
// 					Open Modal
// 				</Button>
// 				<Button
// 					variant="primary"
// 					onClick={() => setIsShownPrompt(true)}
// 				>
// 					Open Prompt
// 				</Button>
// 			</div>
// 			<div className="mt-4">
// 				<Button variant="primary" onClick={notify}>
// 					Trigger Toast
// 				</Button>
// 			</div>
// 			<Modal
// 				isPrompt={true}
// 				title="Prompt"
// 				isOpen={isShownPrompt}
// 				handleClose={() => setIsShownPrompt(false)}
// 			>
// 				This is a Prompt
// 			</Modal>
// 			<Modal
// 				isOpen={isShownModal}
// 				handleClose={() => setIsShownModal(false)}
// 			>
// 				This is a Modal
// 			</Modal>
// 		</>
// 	);
// };

const Freelancers = () => {
	return <FreelancerTable />;
};

const Funds = () => {
	return (
		<>
			<Balance />
			<div className="grid grid-cols-2 gap-4">
				<AddFunds />
				<WithdrawFunds />
			</div>
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
		path: "freelancers",
		component: <Freelancers />,
	},
];

const Company = () => {
	const { id } = useParams();

	return (
		<DefaultLayout base="/dashboard/company">
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
