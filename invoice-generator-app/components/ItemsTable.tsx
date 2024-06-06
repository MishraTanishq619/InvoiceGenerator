import React, { useState } from "react";
import {
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
	getKeyValue,
} from "@nextui-org/table";
import { User } from "@nextui-org/user";
import { Chip } from "@nextui-org/chip";
import { Tooltip } from "@nextui-org/tooltip";

const EditIcon = (props) => (
	<svg
		aria-hidden="true"
		fill="none"
		focusable="false"
		height="1em"
		role="presentation"
		viewBox="0 0 20 20"
		width="1em"
		{...props}
	>
		<path
			d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit={10}
			strokeWidth={1.5}
		/>
		<path
			d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit={10}
			strokeWidth={1.5}
		/>
		<path
			d="M2.5 18.3333H17.5"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeMiterlimit={10}
			strokeWidth={1.5}
		/>
	</svg>
);

const DeleteIcon = (props) => (
	<svg
		aria-hidden="true"
		fill="none"
		focusable="false"
		height="1em"
		role="presentation"
		viewBox="0 0 20 20"
		width="1em"
		{...props}
	>
		<path
			d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
		<path
			d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
		<path
			d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
		<path
			d="M8.60834 13.75H11.3833"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
		<path
			d="M7.91669 10.4167H12.0834"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
	</svg>
);

const EyeIcon = (props) => (
	<svg
		aria-hidden="true"
		fill="none"
		focusable="false"
		height="1em"
		role="presentation"
		viewBox="0 0 20 20"
		width="1em"
		{...props}
	>
		<path
			d="M12.9833 10C12.9833 11.65 11.65 12.9833 10 12.9833C8.35 12.9833 7.01666 11.65 7.01666 10C7.01666 8.35 8.35 7.01666 10 7.01666C11.65 7.01666 12.9833 8.35 12.9833 10Z"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
		<path
			d="M9.99999 16.8916C12.9417 16.8916 15.6833 15.1583 17.5917 12.1583C18.3417 10.9833 18.3417 9.00831 17.5917 7.83331C15.6833 4.83331 12.9417 3.09998 9.99999 3.09998C7.05833 3.09998 4.31666 4.83331 2.40833 7.83331C1.65833 9.00831 1.65833 10.9833 2.40833 12.1583C4.31666 15.1583 7.05833 16.8916 9.99999 16.8916Z"
			stroke="currentColor"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={1.5}
		/>
	</svg>
);

const columns = [
	{ name: "Description", uid: "description" },
	{ name: "Quantity", uid: "quantity" },
	{ name: "UnitPrice", uid: "unitPrice" },
	{ name: "Discount", uid: "discount" },
	{ name: "Actions", uid: "actions" },
];

const items = [
	{
		id: 1,
		description: "GNC Whey",
		quantity: 2,
		unitPrice: 50.0,
		discount: 5.0,
	},
	{
		id: 2,
		description: "Nike Studs",
		quantity: 1,
		unitPrice: 100.0,
		discount: 10.0,
	},
	{
		id: 3,
		description: "Product 3",
		quantity: 3,
		unitPrice: 30.0,
		discount: 0.0,
	},
	{
		id: 4,
		description: "Product 4",
		quantity: 5,
		unitPrice: 20.0,
		discount: 2.0,
	},
	{
		id: 5,
		description: "Product 5",
		quantity: 10,
		unitPrice: 15.0,
		discount: 1.5,
	},
	{
		id: 6,
		description: "Product 6",
		quantity: 4,
		unitPrice: 60.0,
		discount: 5.0,
	},
];

const statusColorMap = {
	active: "success",
	paused: "danger",
	vacation: "warning",
};

interface Item {
	id: number;
	description: string;
	quantity: number;
	unitPrice: number;
	discount: number;
}

export default function ItemsTable() {
	const [Items, setItems] = useRecoilState(itemListAtom);

	const FilterSetItem = (itemId: number) => {
		const [Items4, setItems] = useRecoilState(itemListAtom);

		console.log(itemId, Items4);
	};

	const renderCell = (item, columnKey) => {
		const cellValue = item[columnKey];

		switch (columnKey) {
			case "description":
				return (
					<User
						avatarProps={{ radius: "lg", src: item.avatar }}
						// description={item.email}
						name={cellValue}
					>
						{/* {item.email} */}
					</User>
				);
			case "quantity":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">
							{cellValue}
						</p>
						{/* <p className="text-bold text-sm capitalize text-default-400">
							{item.team}
						</p> */}
					</div>
				);
			case "unitPrice":
				return (
					<div className="flex flex-col">
						<p className="text-bold text-sm capitalize">
							{cellValue}
						</p>
						{/* <p className="text-bold text-sm capitalize text-default-400">
                                {item.team}
                            </p> */}
					</div>
				);
			case "actions":
				return (
					<div
						className="relative flex items-center gap-2"
						onClick={() => {
							FilterSetItem(item.id);
							console.log("deletebtn", Items, item.id);
							// setItems(Items.filter((i) => i.id !== item.id));
						}}
					>
						{/* <Tooltip content="Details">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<EyeIcon />
							</span>
						</Tooltip>
						<Tooltip content="Edit user">
							<span className="text-lg text-default-400 cursor-pointer active:opacity-50">
								<EditIcon />
							</span>
						</Tooltip> */}
						<Tooltip color="danger" content="Delete user">
							<span className="text-lg text-danger cursor-pointer active:opacity-50">
								<DeleteIcon />
							</span>
						</Tooltip>
					</div>
				);
			default:
				return cellValue;
		}
	};
	// 	,
	// 	[setItems]
	// );

	return (
		<div>
			<Table aria-label="Example table with custom cells">
				<TableHeader columns={columns}>
					{(column) => (
						<TableColumn
							key={column.uid}
							align={
								column.uid === "actions" ? "center" : "start"
							}
						>
							{column.name}
						</TableColumn>
					)}
				</TableHeader>
				<TableBody items={Items}>
					{(item) => (
						<TableRow key={item.id}>
							{(columnKey) => (
								<TableCell>
									{renderCell(item, columnKey)}
								</TableCell>
							)}
						</TableRow>
					)}
				</TableBody>
			</Table>
			<div className="w-full flex justify-center">
				<PopOver />
			</div>
		</div>
	);
}

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Checkbox,
	Input,
	Link,
} from "@nextui-org/react";
import { useRecoilState, useRecoilValue } from "recoil";
import { ItemListLengthAtom, itemListAtom } from "@/app/recoil/atoms/itemList";

const PopOver = () => {
	const [Items, setItems] = useRecoilState(itemListAtom);
	const ItemListLength = useRecoilValue(ItemListLengthAtom);

	const demoItem = {
		id: ItemListLength + 1,
		description: "",
		quantity: 0,
		unitPrice: 0.0,
		discount: 0.0,
	};
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [itemData, setItemData] = useState<Item>(demoItem);

	const handleChange = (e, setFunction, field) => {
		setFunction((prevState) => ({
			...prevState,
			[field]: e.target.value,
		}));
	};

	return (
		<>
			<button
				onClick={onOpen}
				// onPress={onOpen}
				type="button"
				className="py-2.5 px-10 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
			>
				Add Product
			</button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				placement="top-center"
			>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Add Item
							</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									// endContent={"tanishq"}
									label="description"
									value={itemData.description}
									onChange={(e) =>
										handleChange(
											e,
											setItemData,
											"description"
										)
									}
									placeholder="Enter Description"
									variant="bordered"
								/>
								<Input
									label="quantity"
									value={itemData.quantity.toString()}
									onChange={(e) =>
										handleChange(e, setItemData, "quantity")
									}
									placeholder="Enter Quantity"
									variant="bordered"
								/>

								<Input
									label="unitPrice"
									value={itemData.unitPrice.toString()}
									onChange={(e) =>
										handleChange(
											e,
											setItemData,
											"unitPrice"
										)
									}
									placeholder="Enter Unit Price"
									variant="bordered"
								/>

								<Input
									label="discount"
									value={itemData.discount.toString()}
									onChange={(e) =>
										handleChange(e, setItemData, "discount")
									}
									placeholder="Enter Discount"
									variant="bordered"
								/>
							</ModalBody>
							<ModalFooter>
								<Button
									color="danger"
									variant="flat"
									onPress={() => {
										setItemData(demoItem);
										onClose();
									}}
								>
									Discard
								</Button>
								<Button
									color="default"
									onPress={() => {
										setItems([
											...Items,
											{
												...itemData,
												id: ItemListLength + 1,
											},
										]);
										setItemData(demoItem);
										onClose();
										console.log("Added", Items);
									}}
								>
									Add
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
