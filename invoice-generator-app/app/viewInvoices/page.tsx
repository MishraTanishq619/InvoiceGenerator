"use client";
import { title } from "@/components/primitives";
import { Input } from "@nextui-org/input";
import axios from "axios";
import { useState } from "react";

export default function viewInvoicesPage() {
	const [invoiceNumber, setInvoiceNumber] = useState("");

	const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

	const GetInvoiceAndPdf = async () => {
		try {
			console.log(invoiceNumber);
			const response = await axios.post(
				`http://${NEXT_PUBLIC_BACKEND_URL}/invoice/getInvoiceAndPdf`,
				{ invoiceNumber: invoiceNumber },
				{
					responseType: "blob",
				}
			);
			alert("Invoice got successfully!");

			const url = window.URL.createObjectURL(
				new Blob([response.data], { type: "application/pdf" })
			);
			const link = document.createElement("a");
			link.href = url;
			// link.setAttribute("download", "sample.pdf"); // or link.setAttribute('target', '_blank'); to open in a new tab
			link.setAttribute("target", "_blank");
			document.body.appendChild(link);
			link.click();
			link.remove();
		} catch (error) {
			console.error("There was an error in getting the invoice!", error);
			alert(
				"No such Invoice Created or There was an error in getting the invoice."
			);
		}
	};

	return (
		<div>
			<div className="mb-20">
				<h1 className={title()}>View Your Invoice</h1>
			</div>
			<div className="flex">
				<p className="text-xl text-nowrap mt-5">
					Enter Invoice Number :
				</p>
				<Input
					type="text"
					isRequired
					// label="Invoice Number"
					// labelPlacement={"outside-left"}
					value={invoiceNumber}
					onChange={(e) => setInvoiceNumber(e.target.value)}
					className="w-96 m-4"
				/>
			</div>
			<div>
				<button
					onClick={GetInvoiceAndPdf}
					type="button"
					className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
				>
					Get Invoice
				</button>
			</div>
		</div>
	);
}
