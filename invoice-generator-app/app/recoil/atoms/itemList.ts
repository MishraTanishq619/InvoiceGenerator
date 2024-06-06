import { atom, selector } from "recoil";

export const itemListAtom = atom({
	key: "itemListState",
	default: [] as {
		id: number;
		description: string;
		quantity: number;
		unitPrice: number;
		discount: number;
	}[],
});

export const ItemListLengthAtom = selector({
	key: "ItemListLengthAtom", // unique ID (with respect to other atoms/selectors)
	get: ({ get }) => {
		const list = get(itemListAtom);

		return list.length;
	},
});
