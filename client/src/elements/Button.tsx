import { useRef } from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
	variant: "primary" | "secondary" | "tertiary";
}
const Button: React.FC<Props> = ({ variant, onClick, children }) => {
	let className = useRef("");
	switch (variant) {
		case "primary":
			className.current =
				"cursor-pointer bg-blue-400 bg-opacity-50 border border-blue-300 border-opacity-25 text-white flex items-center gap-2 py-2 px-4 font-semibold tracking-normal rounded-2xl transition-colors hover:border-opacity-0 hover:shadow-md justify-center";
			break;
		case "secondary":
			className.current =
				"cursor-pointer justify-center bg-transparent bg-opacity-50 border border-blue-300 border-opacity-25 text-white flex items-center gap-2 py-2 px-4 font-semibold tracking-normal rounded-2xl transition-colors hover:border-opacity-50 hover:shadow-md";
			break;
		case "tertiary":
			className.current =
				"cursor-pointer bg-gray-400 bg-opacity-50 border border-gray-300 border-opacity-25 text-white flex items-center gap-2 py-2 px-4 font-semibold tracking-normal rounded-2xl transition-colors hover:border-opacity-0 hover:shadow-md justify-center";
			break;
		default:
			className.current =
				"cursor-pointer bg-blue-400 bg-opacity-50 border border-blue-300 border-opacity-25 text-white flex items-center gap-2 py-2 px-4 font-semibold tracking-normal rounded-2xl transition-colors hover:border-opacity-0 hover:shadow-md justify-center";
			break;
	}
	return (
		<button onClick={onClick} className={className.current}>
			{children}
		</button>
	);
};

export default Button;
