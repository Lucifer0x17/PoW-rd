import Landing from "@/components/Landing";
import Dashboard from "@/components/Dashboard";
import DashboardCompany from "@/components/Dashboard/Company";
import DashboardFreelancer from "@/components/Dashboard/Freelancer";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ErrorPage from "@/components/ErrorPage";
import { NestedPathRoutes } from "./components/Dashboard/NestedPathRoutes";
import { cssTransition, ToastContainer } from "react-toastify";
import "@/styles/styles.scss";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/toasts.scss";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Landing />,
		errorElement: <ErrorPage />,
	},
	{
		path: "/dashboard",
		errorElement: <ErrorPage />,
		children: [
			{
				path: "freelancer",
				element: <DashboardFreelancer />,
				errorElement: <ErrorPage />,
				loader: ({ params }) => {
					if (!params.id) {
						return "";
					}
					if (
						NestedPathRoutes.freelancer.some(
							item => params.id === item.href.replace("/", "")
						)
					) {
						return params.id;
					}

					throw new Error(`${params.id} is not a valid path`);
				},
				children: [
					{
						path: ":id",
						element: <DashboardFreelancer />,
						errorElement: <ErrorPage />,
					},
				],
			},
			{
				path: "company",
				element: <DashboardCompany />,
				errorElement: <ErrorPage />,
				loader: ({ params }) => {
					if (!params.id) {
						return "";
					}
					if (
						NestedPathRoutes.company.some(
							item => params.id === item.href.replace("/", "")
						)
					) {
						return params.id;
					}

					throw new Error(`${params.id} is not a valid path`);
				},
				children: [
					{
						path: ":id",
						element: <DashboardCompany />,
						errorElement: <ErrorPage />,
					},
				],
			},
			{
				path: "",
				element: <Dashboard />,
				errorElement: <ErrorPage />,
			},
		],
	},
]);

const Slide = cssTransition({
	collapseDuration: 200,
	enter: "slideIn",
	exit: "slideOut",
});

function App() {
	return (
		<main className="text-3xl font-bold font-primary">
			<ToastContainer
				theme="dark"
				transition={Slide}
				position="bottom-right"
			/>
			<RouterProvider router={router} />
		</main>
	);
}

export default App;
