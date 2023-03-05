import { create } from "zustand";

type State = {
  search: string;
};

type Action = {
  updateSearch: (firstName: State["search"]) => void;
};

export const useSearchStore = create<State & Action>((set) => ({
  search: "",
  updateSearch: (search) => set(() => ({ search: search })),
}));
