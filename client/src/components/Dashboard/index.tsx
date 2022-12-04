import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
	// TODO
	// Redirect Freelancer or Company based on user type
	// Right now its gonna redirect to Freelancer

	const navigate = useNavigate();

	useEffect(() => {
		navigate("/dashboard/freelancer");
	}, []);
	return <></>;
};

export default Dashboard;
