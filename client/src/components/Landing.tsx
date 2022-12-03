import React, { useEffect, useState } from "react";
import HeroImage from "@/assets/clipboard.png";
import ETHIndiaLogo from "@/assets/ETHIndia.png";
import { RoughNotation } from "react-rough-notation";
import Modal from "@/elements/Modal";
import Button from "@/elements/Button";
import { Web3Auth } from "@web3auth/modal";
import {
	CHAIN_NAMESPACES,
	SafeEventEmitterProvider,
	WALLET_ADAPTERS,
} from "@web3auth/base";
import { useDataStore } from "@/contexts/store";

const clientId =
	"BN0RRmypB4ulOB9uJ3UvFbyIN5rcprkklaVHFGHjfRapx895lFZOSG6ANvMUNdg-w1Zvk22YvLZYmMJbnYzH54A";

const HeroSection = () => {
	const subtitle =
		"Paychecks for the decentralized economy made SIMPLE".split(" ");

	const [showTwitter, setShowTwitter] = useState(false);
	const [showGithub, setShowGithub] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
	const [provider, setProvider] = useDataStore(state => [
		state.provider,
		state.setProvider,
	]);

	const login = async () => {
		setIsModalOpen(false);
		if (!web3auth) {
			console.log("web3auth not initialized yet");
			return;
		}
		const web3authProvider = await web3auth.connect();
		setProvider(web3authProvider);
	};

	useEffect(() => {
		const init = async () => {
			try {
				const web3auth = new Web3Auth({
					clientId,
					chainConfig: {
						chainNamespace: CHAIN_NAMESPACES.EIP155,
						chainId: "80001",
						rpcTarget: "https://rpc-mumbai.maticvigil.com/", // This is the public RPC we have added, please pass on your own endpoint while creating an app
					},
					uiConfig: {
						theme: "dark",
					},
				});

				setWeb3auth(web3auth);

				await web3auth.initModal();
				if (web3auth.provider) {
					setProvider(web3auth.provider);
				} else {
					console.log("???");
				}
			} catch (error) {
				console.error(error);
			}
		};

		init();
	}, []);

	return (
		<div className="relative flex items-center justify-between h-full max-w-full gap-32 mx-8 lg:max-w-3xl">
			<div className="max-w-lg space-y-2 w-fit">
				<h1
					className="font-semibold leading-normal tracking-normal w-fit text-7xl font-secondary font-headline text-gradient main-text-in"
					data-text="$Payroll"
				>
					PoW'rd<span className="cursor-underscore">_</span>
				</h1>
				<p className="text-lg font-medium font-extra">
					{subtitle.map((word, index) => (
						<span
							key={index}
							className="whitespace-pre text-animate-up"
							style={{
								// @ts-ignore
								"--start": "150ms",
								"--delay": `${index * 0.1}s`,
							}}
						>
							{word.toLowerCase() === "simple" ? (
								<RoughNotation
									type="underline"
									show={true}
									strokeWidth={2}
									animationDuration={400}
									animationDelay={1250}
									color="rgb(59 130 246)"
								>
									<span className="font-secondary">
										SIMPLE.
									</span>
								</RoughNotation>
							) : (
								<>
									{word}
									{index !== subtitle.length - 1 && " "}
								</>
							)}
						</span>
					))}
				</p>
				<div className="flex items-center gap-4 pt-4">
					<a
						onMouseOver={() => setShowGithub(true)}
						onTouchStart={() => setShowGithub(true)}
						onMouseOut={() => setShowGithub(false)}
						onTouchEnd={() => setShowGithub(false)}
						href="https://github.com/boidushya/payroll-client"
						target={`_blank`}
						rel="noreferrer"
						style={{
							//@ts-ignore
							"--start": "500ms",
							"--delay": "100ms",
						}}
						className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold tracking-normal text-white transition-colors bg-transparent bg-opacity-25 border border-blue-300 border-opacity-25 block-animate-up rounded-2xl hover:border-opacity-50 hover:shadow-md"
					>
						<RoughNotation
							type="underline"
							show={showGithub}
							strokeWidth={3}
							animationDuration={400}
							animationDelay={0}
							padding={0}
							color="rgb(96 165 250 / 0.5)"
						>
							Know More
						</RoughNotation>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="currentColor"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
							></path>
						</svg>
					</a>
					<a
						onMouseOver={() => setShowTwitter(true)}
						onTouchStart={() => setShowTwitter(true)}
						onMouseOut={() => setShowTwitter(false)}
						onTouchEnd={() => setShowTwitter(false)}
						// href="/dashboard"
						// target={`_blank`}
						// rel="noreferrer"
						onClick={() => setIsModalOpen(true)}
						style={{
							//@ts-ignore
							"--start": "500ms",
							"--delay": "150ms",
						}}
						className="cursor-pointer flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold tracking-normal text-white transition-colors bg-blue-400 bg-opacity-50 border border-blue-300 border-opacity-25 block-animate-up rounded-2xl hover:border-opacity-0 hover:shadow-md"
					>
						<RoughNotation
							type="underline"
							show={showTwitter}
							strokeWidth={3}
							animationDuration={400}
							animationDelay={0}
							padding={0}
							color="rgb(96 165 250 / 0.5)"
						>
							Get Started
						</RoughNotation>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="currentColor"
							className="w-5 h-5"
						>
							<path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
							<path
								fillRule="evenodd"
								d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
								clipRule="evenodd"
							/>
						</svg>
					</a>
				</div>
			</div>
			<div className="w-fit glow move-right">
				<div className="relative z-10 grid w-64 h-64 space-y-4 text-xl text-center text-gray-400 border border-opacity-25 shadow-md place-items-center rounded-2xl bg-zinc-900 bg-opacity-80 backdrop-blur-lg border-zinc-500">
					<img
						src={HeroImage}
						alt="Clipboard"
						className="object-contain w-48 h-48 hero-image"
					/>
				</div>
			</div>
			<footer
				style={{
					//@ts-ignore
					"--start": "1500ms",
					"--delay": "150ms",
				}}
				className="absolute bottom-0 left-0 flex items-end justify-center w-full py-2 text-sm font-medium whitespace-pre footer-animate-up opacity-20 font-primary"
			>
				<span className="leading-none">Made with for </span>
				<a
					href="https://ethindia.co"
					target="_blank"
					rel="noreferrer"
					className="h-fit w-fit flex hover:scale-125 hover:px-0.5 transition-[padding,transform] origin-bottom"
				>
					<img
						src={ETHIndiaLogo}
						className="object-contain w-5 h-5"
					/>{" "}
				</a>
				<span className="leading-none"> with 🤍 by PotatoPotata</span>
			</footer>
			<Modal
				title="Sign In"
				handleClose={() => setIsModalOpen(false)}
				isOpen={isModalOpen}
			>
				<div className="w-full flex items-center justify-center gap-4">
					<Button variant="primary" onClick={login}>
						Sign in as Freelancer
					</Button>
					<Button variant="secondary">Sign in as Company</Button>
				</div>
			</Modal>
		</div>
	);
};

const Landing = () => {
	return (
		<section className="grid w-full min-h-screen place-items-center">
			<HeroSection />
		</section>
	);
};

export default Landing;
