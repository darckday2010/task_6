import { create } from "zustand";

interface CartState {
	limit: number;
	skip: number;
	userId: string;
	setPage: (newPage: number) => void;
	setLimit: (newLimit: number) => void;
	setUserId: (newUserId: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
	limit: 10,
	skip: 0,
	userId: "",

	setPage: (newPage) => set((state) => ({ skip: (newPage - 1) * state.limit })),

	setLimit: (newLimit) => set({ limit: newLimit, skip: 0 }),

	setUserId: (newUserId) => set({ userId: newUserId, skip: 0 }),
}));
