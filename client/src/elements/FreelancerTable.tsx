import { useDataStore } from "@/contexts/store";
import React from "react";
import { useTable } from "react-table";
import ENSLogo from "@/assets/ens.svg";
import { makeFreelancerData } from "../contexts/store";

interface TableProps {
	columns: any;
	data: any;
}

const Table: React.FC<TableProps> = ({ columns, data }) => {
	// Use the state and functions returned from useTable to build your UI
	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});

	// Render the UI for your table
	return (
		<table
			className="table-auto shadow-lg w-full fade-in"
			style={{
				//@ts-ignore
				"--start": "0s",
				"--delay": "500ms",
			}}
			{...getTableProps()}
		>
			<thead className="bg-zinc-900">
				{headerGroups.map(headerGroup => (
					<tr className="" {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map((column, index) => {
							//@ts-ignore
							return column.hideHeader === false ? null : (
								<th
									className="border dark:border-zinc-800 font-medium py-6 px-8 leading-none text-zinc-400 dark:text-zinc-200 text-left"
									{...column.getHeaderProps()}
								>
									{column.render("Header")}
								</th>
							);
						})}
					</tr>
				))}
			</thead>
			<tbody
				className="bg-zinc-800 bg-opacity-80 border border-zinc-800"
				{...getTableBodyProps()}
			>
				{rows.map((row, i) => {
					prepareRow(row);
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
								// const isAddress = cell.column.id === "address";
								return (
									<td
										className="border-b border-zinc-700 border-opacity-50 p-3 pl-8 text-zinc-500 dark:text-zinc-400"
										{...cell.getCellProps()}
									>
										{cell.render("Cell")}
									</td>
								);
							})}
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

function FreelancerTable() {
	const columns = React.useMemo(
		() => [
			{
				Header: "Identity",
				hideHeader: false,
				id: "identity",
				columns: [
					{
						Header: "Client Name",
						accessor: "name",
					},
					{
						Header: "Amount",
						accessor: "amt",
					},
					{
						Header: "Cleared Status",
						accessor: "status",
						Cell: ({ value }: any) => {
							return (
								<span
									className={`flex text-zinc-300 px-2 pr-3 leading-none py-1 rounded-full bg-zinc-700 ${
										value
											? `bg-green-500 border-green-500 text-green-400`
											: `bg-yellow-500 border-yellow-500 text-yellow-400`
									} items-center gap-1.5 w-fit bg-opacity-20 border border-opacity-50`}
								>
									<svg
										height="8"
										width="8"
										viewBox="0 0 100 100"
										className="fill-current"
									>
										<circle cx="50" cy="50" r="40" />
									</svg>
									<span
										className={`text-sm leading-none ${
											value
												? `text-green-200`
												: `text-yellow-200`
										}`}
									>
										{value ? `Cleared` : `Pending`}
									</span>
								</span>
							);
						},
					},
					{
						Header: "Description",
						accessor: "details",
					},
				],
			},
		],
		[]
	);

	const makeData = useDataStore(state => state.makeFreelancerData);
	const data = React.useMemo(() => makeData(20), []);

	return (
		<>
			<Table columns={columns} data={data} />
		</>
	);
}

export default FreelancerTable;
