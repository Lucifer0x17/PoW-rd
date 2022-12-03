import React, { useState } from "react";

export const SearchContainer: React.FC = () => {
	const [value, setValue] = useState<string>("");
	const svgTransitions = `
		motion-reduce:transition-none motion-reduce:transform-none
		transition-colors border-transparent ease-in-out duration-200
	`;
	const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	};
	return (
		<div className="relative">
			<div
				className={`relative
					z-20 mx-auto text-accent-100`}
			>
				<input
					className="bg-zinc-800 bg-opacity-50 font-medium border border-zinc-800 h-10 px-5 pr-11 rounded-full text-sm focus:outline-none min-w-[18.5rem] placeholder:text-accent-300"
					type="text"
					placeholder="Search for employees, freelancers"
					value={value}
					onChange={handleInput}
				/>
				<button
					type="submit"
					className="absolute -translate-y-1/2 top-1/2 right-4"
					aria-label="Search Icon"
				>
					<svg
						className={`${
							value.length !== 0
								? `text-accent-100`
								: `text-accent-300`
						} h-5 w-5 fill-current ${svgTransitions}`}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
					>
						<path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
					</svg>
				</button>
			</div>
			{/* <SearchResultsContainer
                clearQuery={() => setValue("")}
                query={value}
            /> */}
		</div>
	);
};
