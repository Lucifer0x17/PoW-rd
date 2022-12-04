import React, { useEffect, useRef, useState } from "react";
import DefaultLayout from "@/components/Dashboard/DefaultLayout";
import { useParams } from "react-router-dom";
import Button from "@/elements/Button";
import Modal from "@/elements/Modal";
import { toast } from "react-toastify";
import { useDataStore } from "@/contexts/store";
import FreelancerTable from "@/elements/FreelancerTable";
import { SearchContainer } from "@/elements/SearchContainer";

interface InfoTypes {
	name: string | null;
	address: string | null;
	amount: number | null;
	description: string | null;
}

//@ts-ignore
const GenerateInvoice = () => {
	const [info, setInfo] = useState({
		name: null,
		address: null,
		amount: null,
		description: null,
	});
	const handleSubmit = () => {
		// Replace with real backend code
		// axios.post(url,info).then().catch()
	};
	return (
		<div className="py-8 pt-0 block">
			<div className="ReactModal__Content !rounded-none overflow-hidden !ml-0 !scale-100">
				<div className="flex justify-between py-6 px-8 text-lg font-secondary sticky bg-zinc-900 top-0 left-0 z-20 border-b border-gray-400 border-opacity-10">
					<span className="">Invoice Generator</span>
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
								placeholder="Company Name"
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
								placeholder="Company ENS"
							/>
						</div>
						<div className="flex items-center gap-4">
							<input
								className="bg-zinc-800 w-fit appearance-none border-2 border-zinc-700 rounded py-2 px-4 text-zinc-200 leading-tight focus:outline-none focus:bg-zinc-800	 focus:border-sky-800"
								type="text"
								value={info.amount || ""}
								onChange={e => {
									setInfo({
										...info,
										//@ts-ignore
										amount: parseFloat(e.target.value),
									});
								}}
								placeholder="Amount"
							/>
						</div>
						<input
							className="bg-zinc-800 w-full appearance-none border-2 border-zinc-700 rounded py-2 px-4 text-zinc-200 leading-tight focus:outline-none focus:bg-zinc-800	 focus:border-sky-800"
							type="text"
							value={info.description || ""}
							onChange={e => {
								setInfo({
									...info,
									//@ts-ignore
									description: e.target.value,
								});
							}}
							placeholder="Assignment Description"
						/>
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
			<h3 className="font-headline text-3xl mb-4">Generate Invoice</h3>
			<GenerateInvoice />
			<h3 className="font-headline text-3xl mb-4">List of Invoice</h3>
			<FreelancerTable />
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
			<div className="p-8 py-6 font-secondary w-full">
				<div>
					<div className="w-full flex justify-between items-center">
						<h1>
							<span className="font-serif">Dashboard </span>
							<span className="text-lg font-medium font-extra">
								/ Freelancer{" "}
								{id && (
									<span className="text-sm font-normal text-zinc-500">
										/ {id}
									</span>
								)}
							</span>
						</h1>
						<div className="flex items-center gap-2">
							<SearchContainer />
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

export default Freelancer;
