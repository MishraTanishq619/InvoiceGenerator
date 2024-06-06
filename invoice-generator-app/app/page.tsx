"use client";
import React, { useState } from "react";
import { Input } from "@nextui-org/input";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Button } from "@nextui-org/button";
import axios from "axios";
import { DateInput } from "@nextui-org/date-input";
import ItemsTable from "@/components/ItemsTable";
import { useRecoilState, useRecoilValue } from "recoil";
import { itemListAtom } from "./recoil/atoms/itemList";

const InvoiceForm = () => {
	const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
	// Logo
	const [logoImageFile, setlogoImageFile] = useState({});
	const [logoImage, setlogoImage] = useState("");

	const handlelogoImageChange = (e) => {
		console.log(e.target.files);
		setlogoImage(e.target.files[0].name);
		setlogoImageFile({
			file: e.target.files[0],
			fileUrl: URL.createObjectURL(e.target.files[0]),
		});
		console.log(e.target.files[0].name);
	};

	// Signature
	const [signatureImageFile, setSignatureImageFile] = useState({});
	const [signatureImage, setSignatureImage] = useState("");

	const handleSignatureImageChange = (e) => {
		console.log(e.target.files);
		setSignatureImage(e.target.files[0].name);
		setSignatureImageFile({
			file: e.target.files[0],
			fileUrl: URL.createObjectURL(e.target.files[0]),
		});
		console.log(e.target.files[0].name);
	};

	const [sellerDetails, setSellerDetails] = useState({
		sellerName: "",
		sellerAddress: "",
		sellerCity: "",
		sellerState: "",
		sellerPincode: "",
		sellerPAN: "",
		sellerGST: "",
	});

	const [billingDetails, setBillingDetails] = useState({
		billingName: "",
		billingAddress: "",
		billingCity: "",
		billingState: "",
		billingPincode: "",
		billingStateUTCode: "",
	});

	const [shippingDetails, setShippingDetails] = useState({
		shippingName: "",
		shippingAddress: "",
		shippingCity: "",
		shippingState: "",
		shippingPincode: "",
		shippingStateUTCode: "",
	});

	const [orderDetails, setOrderDetails] = useState({
		orderNo: "",
		orderDate: "",
	});

	const [invoiceDetails, setInvoiceDetails] = useState({
		invoiceNo: "",
		invoiceDate: "",
		invoiceDetails: "",
	});

	const [reverseChange, setReverseChange] = useState("No");

	const Items = useRecoilValue(itemListAtom);

	const handleChange = (e, setFunction, field) => {
		setFunction((prevState) => ({
			...prevState,
			[field]: e.target.value,
		}));
	};

	const CreateInvoiceAndPdf = async () => {
		const data = {
			logoImage,
			sellerDetails,
			billingDetails,
			shippingDetails,
			orderDetails,
			invoiceDetails,
			reverseChange,
			Items,
			signatureImage,
		};

		try {
			const response = await axios.post(
				`http://${NEXT_PUBLIC_BACKEND_URL}/invoice/create`,
				data
			);
			console.log(response.data);
			alert("Invoice submitted successfully!");
		} catch (error) {
			console.error("There was an error submitting the invoice!", error);
			alert("There was an error submitting the invoice.");
		}
	};
	return (
		<div className="invoice-form flex flex-wrap">
			<Accordion>
				<AccordionItem
					key="1"
					aria-label="Accordion 1"
					title="Logo Image"
				>
					<form
						onSubmit={async (e) => {
							e.preventDefault();

							const formData = new FormData();
							formData.append("file", logoImageFile.file);

							axios
								.post(
									`http://${NEXT_PUBLIC_BACKEND_URL}/uploadCompanyLogo`,
									formData,
									{
										headers: {
											"Content-Type":
												"multipart/form-data",
										},
									}
								)
								.then((response) => {
									alert(
										"Logo uploaded successfully:",
										response.data
									);
								})
								.catch((error) => {
									alert("Error uploading Logo:", error);
								});
						}}
					>
						<input
							type="file"
							name="file"
							onChange={handlelogoImageChange}
						/>
						<input
							type="submit"
							value="Upload Signature"
							className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
							// onClick={uploadSignature}
						/>
						<img src={logoImageFile.fileUrl} />
					</form>
				</AccordionItem>

				<AccordionItem
					key="2"
					aria-label="Accordion 2"
					title="Seller Details"
				>
					<div className="flex flex-wrap">
						<Input
							type="text"
							label="Seller Name"
							value={sellerDetails.sellerName}
							onChange={(e) =>
								handleChange(e, setSellerDetails, "sellerName")
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Seller Address"
							value={sellerDetails.sellerAddress}
							onChange={(e) =>
								handleChange(
									e,
									setSellerDetails,
									"sellerAddress"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Seller City"
							value={sellerDetails.sellerCity}
							onChange={(e) =>
								handleChange(e, setSellerDetails, "sellerCity")
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Seller State"
							value={sellerDetails.sellerState}
							onChange={(e) =>
								handleChange(e, setSellerDetails, "sellerState")
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Seller Pincode"
							value={sellerDetails.sellerPincode}
							onChange={(e) =>
								handleChange(
									e,
									setSellerDetails,
									"sellerPincode"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Seller PAN"
							value={sellerDetails.sellerPAN}
							onChange={(e) =>
								handleChange(e, setSellerDetails, "sellerPAN")
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Seller GST"
							value={sellerDetails.sellerGST}
							onChange={(e) =>
								handleChange(e, setSellerDetails, "sellerGST")
							}
							className="w-64 m-4"
						/>
					</div>
				</AccordionItem>

				<AccordionItem
					key="3"
					aria-label="Accordion 3"
					title="Billing Details"
				>
					<div className="flex flex-wrap">
						<Input
							type="text"
							label="Billing Name"
							value={billingDetails.billingName}
							onChange={(e) =>
								handleChange(
									e,
									setBillingDetails,
									"billingName"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Billing Address"
							value={billingDetails.billingAddress}
							onChange={(e) =>
								handleChange(
									e,
									setBillingDetails,
									"billingAddress"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Billing City"
							value={billingDetails.billingCity}
							onChange={(e) =>
								handleChange(
									e,
									setBillingDetails,
									"billingCity"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Billing State"
							value={billingDetails.billingState}
							onChange={(e) =>
								handleChange(
									e,
									setBillingDetails,
									"billingState"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Billing Pincode"
							value={billingDetails.billingPincode}
							onChange={(e) =>
								handleChange(
									e,
									setBillingDetails,
									"billingPincode"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Billing State/UT Code"
							value={billingDetails.billingStateUTCode}
							onChange={(e) =>
								handleChange(
									e,
									setBillingDetails,
									"billingStateUTCode"
								)
							}
							className="w-64 m-4"
						/>
					</div>
				</AccordionItem>

				<AccordionItem
					key="4"
					aria-label="Accordion 4"
					title="Shipping Details"
					// className="flex flex-wrap"
				>
					<div className="flex flex-wrap">
						<Input
							type="text"
							label="Shipping Name"
							value={shippingDetails.shippingName}
							onChange={(e) =>
								handleChange(
									e,
									setShippingDetails,
									"shippingName"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Shipping Address"
							value={shippingDetails.shippingAddress}
							onChange={(e) =>
								handleChange(
									e,
									setShippingDetails,
									"shippingAddress"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Shipping City"
							value={shippingDetails.shippingCity}
							onChange={(e) =>
								handleChange(
									e,
									setShippingDetails,
									"shippingCity"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Shipping State"
							value={shippingDetails.shippingState}
							onChange={(e) =>
								handleChange(
									e,
									setShippingDetails,
									"shippingState"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Shipping Pincode"
							value={shippingDetails.shippingPincode}
							onChange={(e) =>
								handleChange(
									e,
									setShippingDetails,
									"shippingPincode"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Shipping State/UT Code"
							value={shippingDetails.shippingStateUTCode}
							onChange={(e) =>
								handleChange(
									e,
									setShippingDetails,
									"shippingStateUTCode"
								)
							}
							className="w-64 m-4"
						/>
					</div>
				</AccordionItem>

				<AccordionItem
					key="5"
					aria-label="Accordion 5"
					title="Order Details"
				>
					<div className="flex flex-wrap">
						<Input
							type="text"
							label="Order No"
							value={orderDetails.orderNo}
							onChange={(e) =>
								handleChange(e, setOrderDetails, "orderNo")
							}
							className="w-64 m-4"
						/>

						<Input
							type="date"
							label="Order Date"
							value={orderDetails.orderDate}
							onChange={(e) =>
								handleChange(e, setOrderDetails, "orderDate")
							}
							className="w-64 m-4"
						/>
					</div>
				</AccordionItem>
				<AccordionItem
					key="6"
					aria-label="Accordion 6"
					title="Invoice Details"
				>
					<div className="flex flex-wrap">
						<Input
							type="text"
							label="Invoice No"
							value={invoiceDetails.invoiceNo}
							onChange={(e) =>
								handleChange(e, setInvoiceDetails, "invoiceNo")
							}
							className="w-64 m-4"
						/>
						<Input
							type="date"
							label="Invoice Date"
							value={invoiceDetails.invoiceDate}
							onChange={(e) =>
								handleChange(
									e,
									setInvoiceDetails,
									"invoiceDate"
								)
							}
							className="w-64 m-4"
						/>
						<Input
							type="text"
							label="Invoice Details"
							value={invoiceDetails.invoiceDetails}
							onChange={(e) =>
								handleChange(
									e,
									setInvoiceDetails,
									"invoiceDetails"
								)
							}
							className="w-64 m-4"
						/>
					</div>
				</AccordionItem>

				<AccordionItem
					key="7"
					aria-label="Accordion 1"
					title="Reverse Change"
				>
					<Input
						type="text"
						label="Reverse Change"
						value={reverseChange}
						onChange={(e) => setReverseChange(e.target.value)}
						className="w-64 m-4"
					/>
				</AccordionItem>

				<AccordionItem
					key="8"
					aria-label="Accordion 8"
					title="Items Table"
				>
					<ItemsTable />
				</AccordionItem>

				<AccordionItem
					key="9"
					aria-label="Accordion 9"
					title="Signature Image"
				>
					<form
						// action="http://${NEXT_PUBLIC_BACKEND_URL}/uploadSignature"
						// method="post"
						// encType="multipart/form-data"
						// target="null"
						onSubmit={async (e) => {
							e.preventDefault();
							console.log("clicked");

							const formData = new FormData();
							formData.append("file", signatureImageFile.file);

							axios
								.post(
									`http://${NEXT_PUBLIC_BACKEND_URL}/uploadSignature`,
									formData,
									{
										headers: {
											"Content-Type":
												"multipart/form-data",
										},
									}
								)
								.then((response) => {
									alert(
										"Signature uploaded successfully:",
										response.data
									);
								})
								.catch((error) => {
									alert("Error uploading Signature:", error);
								});
						}}
					>
						<input
							type="file"
							name="file"
							onChange={handleSignatureImageChange}
						/>
						<input
							type="submit"
							value="Upload Signature"
							className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
							// onClick={uploadSignature}
						/>
						<img src={signatureImageFile.fileUrl} />
					</form>
				</AccordionItem>
			</Accordion>

			<div className="w-full flex justify-center">
				<button
					onClick={CreateInvoiceAndPdf}
					type="button"
					className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
				>
					Create Invoice
				</button>
			</div>
		</div>
	);
};

const page = () => {
	return (
		<div>
			<InvoiceForm />
		</div>
	);
};

export default page;
