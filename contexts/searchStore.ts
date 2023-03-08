import { create } from "zustand";

type State = {
  search: string;
  categoryVisible: boolean;
};

type Action = {
  updateSearch: (firstName: State["search"]) => void;
  toggleCategory: () => void;
};

export const useSearchStore = create<State & Action>((set) => ({
  search: "",
  categoryVisible: false,
  updateSearch: (search) => set(() => ({ search: search })),
  toggleCategory: () => set((state) => ({ categoryVisible: !state.categoryVisible })),
}));
