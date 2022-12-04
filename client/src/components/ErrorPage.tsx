import { useRouteError } from "react-router-dom";

type ErrorProps = {
	error: Error;
	message: string;
	statusText: string;
};

export default function ErrorPage() {
	const error = useRouteError() as ErrorProps;

	return (
		<div
			id="error-page"
			className="grid w-full min-h-screen place-items-center"
		>
			<div className="p-8 space-y-4 bg-opacity-50 border shadow-sm bg-zinc-900 backdrop-blur-md rounded-xl border-zinc-800">
				<h1 className="text-2xl text-red-400">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="inline w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
						/>
					</svg>{" "}
					Oops
				</h1>
				<p className="text-base font-medium font-extra">
					Sorry, an unexpected error has occurred.
				</p>
				<div className="p-4 font-mono text-base font-normal border-2 border-zinc-700 text-zinc-500 rounded-xl">
					<p className="font-tertiary">
						{error.statusText || error.message}
					</p>
					<p>
						{error?.error?.message ||
							error.statusText ||
							error.message}
					</p>
				</div>
			</div>
		</div>
	);
}
