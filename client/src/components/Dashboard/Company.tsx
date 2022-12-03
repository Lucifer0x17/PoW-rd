import React from "react";
import DefaultLayout from "@/components/Dashboard/DefaultLayout";

const Company = () => {
	return (
		<DefaultLayout base="/dashboard/company">
			<div className="p-4 py-6 font-secondary">
				Dashboard{" "}
				<span className="text-lg font-medium font-extra">
					| Company
				</span>
			</div>
		</DefaultLayout>
	);
};

export default Company;
