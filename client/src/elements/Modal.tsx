import ReactModal from "react-modal";
import Button from "./Button";

ReactModal.setAppElement("#root");

const Modal: React.FC<{
	isOpen: boolean;
	handleClose: () => void;
	children?: React.ReactNode;
	isPrompt?: boolean;
	title?: string;
	dismissible?: boolean;
}> = ({
	isOpen,
	handleClose,
	children,
	isPrompt = false,
	title = "Modal",
	dismissible = true,
}) => {
	return (
		<ReactModal
			isOpen={isOpen}
			closeTimeoutMS={200}
			onRequestClose={handleClose}
			style={{
				overlay: {
					display: "grid",
					placeItems: "center",
				},
				content: {
					border: "",
					inset: "",
					width: "90%",
					maxHeight: "clamp(300px, 90vmin, 500px)",
					background: "",
					borderRadius: "",
					padding: "",
				},
			}}
			shouldCloseOnOverlayClick={dismissible}
		>
			<div className="sticky top-0 left-0 z-20 flex justify-between px-8 py-6 text-lg border-b border-gray-400 font-secondary bg-zinc-900 border-opacity-10">
				<span>{title}</span>
				{dismissible && (
					<a
						onClick={handleClose}
						className="transition-colors cursor-pointer text-zinc-600 hover:text-zinc-400"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth={1.5}
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</a>
				)}
			</div>
			<div className="relative px-8 py-8 w-fit">{children}</div>
			{isPrompt && (
				<div className="sticky bottom-0 right-0 flex flex-row-reverse gap-4 px-8 py-6 mt-0 border-t border-gray-400 bg-zinc-900 border-opacity-10">
					<Button variant="primary" onClick={handleClose}>
						Okay
					</Button>
					{dismissible && (
						<Button variant="secondary" onClick={handleClose}>
							Close
						</Button>
					)}
				</div>
			)}
		</ReactModal>
	);
};

export default Modal;
