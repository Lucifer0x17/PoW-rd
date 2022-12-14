import { SafeEventEmitterProvider } from "@web3auth/base";
import create from "zustand";

const range = (len: number) => {
	const arr = [];
	for (let i = 0; i < len; i++) {
		arr.push(i);
	}
	return arr;
};

const newPerson = () => {
	return {
		name: "Boidushya",
		address: "powrd.eth",
		amt: Math.floor(Math.random() * 30),
		time: Math.floor(Math.random() * 100),
	};
};

const newFreelancer = () => {
	return {
		name: "Boidushya",
		amt: Math.floor(Math.random() * 30),
		status: Math.random() > 0.5 ? true : false,
		details: "xyz",
	};
};

export function makeData(...lens: number[]) {
	const makeDataLevel: any = (depth = 0) => {
		const len = lens[depth];
		return range(len).map(d => {
			return {
				...newPerson(),
				subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
			};
		});
	};

	return makeDataLevel();
}

export function makeFreelancerData(...lens: number[]) {
	const makeDataLevel: any = (depth = 0) => {
		const len = lens[depth];
		return range(len).map(d => {
			return {
				...newFreelancer(),
				subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
			};
		});
	};

	return makeDataLevel();
}

interface DataState {
	data: any;
	freelancerData: any;
	balance: number | null;
	makeData: (data: any) => void;
	makeFreelancerData: (data: any) => void;
	updateBalance: (balance: number) => void;
	provider: SafeEventEmitterProvider | null;
	setProvider: (provider: SafeEventEmitterProvider | null) => void;
}

export const useDataStore = create<DataState>(set => ({
	data: [],
	freelancerData: [],
	balance: null,
	provider: null,
	setProvider: (provider: SafeEventEmitterProvider | null) =>
		set({ provider }),
	updateBalance: (balance: number) => set({ balance }),
	makeData: makeData,
	makeFreelancerData: makeFreelancerData,
	notifications: [],
}));
