const express = require("express");
const app = express();
const port = 4000;

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
);

app.get("/", (req, res) => {
	res.send("Hello World!");
});
app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

app.post("/invoice/create", (req, res) => {
	console.log(req.body);
	const {
		logoImage,
		sellerDetails,
		billingDetails,
		shippingDetails,
		orderDetails,
		invoiceDetails,
		reverseChange,
		Items,
		signatureImage,
	} = req.body;

	makeInvoicePdf(
		logoImage,
		sellerDetails,
		billingDetails,
		shippingDetails,
		orderDetails,
		invoiceDetails,
		reverseChange,
		Items,
		signatureImage
	);

	res.json({
		msg: "Success",
		body: req.body,
	});
});

app.post("/invoice/getInvoiceAndPdf", (req, res) => {
	console.log(req.body);

	const fileName = req.body.invoiceNumber + ".pdf";

	res.setHeader("Content-Type", "application/pdf");
	res.setHeader("Content-Disposition", "inline; filename=" + fileName);

	const filePath = path.join(__dirname, "invoices_pdf", fileName);
	res.sendFile(filePath, (err) => {
		if (err) {
			console.error("Error sending file:", err);
			res.status(500).send("Error sending file");
		}
	});
});

const upload = require("./multer");
const path = require("path");
app.post("/uploadCompanyLogo", upload.single("file"), async (req, res) => {
	console.log("entered Logo", req.file, req.body.file);
	if (!req.file) {
		res.json({ msg: "No Files Uploaded." });
		return;
	}

	const image = req.file.originalname;

	res.json({ LogoImage: image });
});

app.post("/uploadSignature", upload.single("file"), async (req, res) => {
	console.log("entered", req.file, req.body.file);
	if (!req.file) {
		res.json({ msg: "No Files Uploaded." });
		return;
	}

	const image = req.file.originalname;

	res.json({ image: image });
});

const makeInvoicePdf = (
	logoImage,
	sellerDetails,
	billingDetails,
	shippingDetails,
	orderDetails,
	invoiceDetails,
	reverseChange,
	Items,
	signatureImage
) => {
	var fonts = {
		Roboto: {
			normal: "fonts/Roboto-Regular.ttf",
			bold: "fonts/Roboto-Bold.ttf",
			italics: "fonts/Roboto-Italic.ttf",
			bolditalics: "fonts/Roboto-BlackItalic.ttf",
		},
	};
	var PdfPrinter = require("pdfmake");
	var printer = new PdfPrinter(fonts);
	var fs = require("fs");

	const items = Items;

	const sellerName = sellerDetails.sellerName;
	const sellerAddress = sellerDetails.sellerAddress;
	const sellerCity = sellerDetails.sellerCity;
	const sellerState = sellerDetails.sellerState;
	const sellerPincode = sellerDetails.sellerPincode;
	const sellerPAN = sellerDetails.sellerPAN;
	const sellerGST = sellerDetails.sellerGST;

	const billingName = billingDetails.billingName;
	const billingAddress = billingDetails.billingAddress;
	const billingCity = billingDetails.billingCity;
	const billingState = billingDetails.billingState;
	const billingPincode = billingDetails.billingPincode;
	const billingStateUTCode = billingDetails.billingStateUTCode;

	const shippingName = shippingDetails.shippingName;
	const shippingAddress = shippingDetails.shippingAddress;
	const shippingCity = shippingDetails.shippingCity;
	const shippingState = shippingDetails.shippingState;
	const shippingPincode = shippingDetails.shippingPincode;
	const shippingStateUTCode = shippingDetails.shippingStateUTCode;

	const orderNo = orderDetails.orderNo;
	const orderDate = orderDetails.orderDate;

	const invoiceNo = invoiceDetails.invoiceNo;
	const invoiceDate = invoiceDetails.invoiceDate;
	const invoiceDetail = invoiceDetails.invoiceDetails;

	const reverseCharge = reverseChange;

	const placeofDelivery = shippingState;
	//
	var docDefinition = {
		content: [
			{
				columns: [
					{
						image: `uploads/${logoImage}`, // Replace with your logo path
						// text: "LOGO",
						width: 150,
					},
					[
						{
							text: "Tax Invoice/Bill of Supply/Cash Memo",
							alignment: "right",
							style: "header",
							fontSize: 15,
						},
						{
							text: `(Original For Recipient)`,
							alignment: "right",
							style: "subheader",
						},
					],
				],
			},
			{
				text: "\n",
			},
			{
				columns: [
					{
						width: "*",
						alignment: "left",
						text: [
							{ text: "SELLER DETAILS\n", bold: true },
							`${sellerName}\n`,
							`${sellerAddress}\n`,
							`${sellerCity}, ${sellerState}, ${sellerPincode}\n`,
							{ text: "PAN No.: ", bold: true },
							`${sellerPAN}\n`,
							{ text: "GST Registration No.: ", bold: true },
							`${sellerGST}\n`,
						],
					},
					{
						width: "*",
						alignment: "right",
						text: [
							{ text: "BILLING DETAILS\n", bold: true },
							`${billingName}\n`,
							`${billingAddress}\n`,
							`${billingCity}, ${billingState}, ${billingPincode}\n`,
							{ text: "State/UT Code: ", bold: true },
							`${billingStateUTCode}\n`,
						],
					},
				],
			},
			{
				text: "\n",
			},
			{
				width: "*",
				alignment: "right",
				text: [
					{ text: "SHIPPING DETAILS\n", bold: true },
					`${shippingName}\n`,
					`${shippingAddress}\n`,
					`${shippingCity}, ${shippingState}, ${shippingPincode}\n`,
					{ text: "State/UT Code: ", bold: true },
					`${shippingStateUTCode}\n`,
				],
			},
			{
				width: "*",
				alignment: "right",
				text: [
					{ text: "Place of Supply : ", bold: true },
					`${sellerState} \n`,
					{ text: "Place of Delivery : ", bold: true },
					`${placeofDelivery} \n`,
				],
			},
			{
				text: "\n",
			},
			{
				columns: [
					{
						width: "*",
						alignment: "left",
						text: [
							{ text: "Order No.: ", bold: true },
							`${orderNo}\n`,
							{ text: "Order Date: ", bold: true },
							`${orderDate}\n`,
						],
					},
					{
						width: "*",
						alignment: "right",
						text: [
							{ text: "Invoice No.: ", bold: true },
							`${invoiceNo}\n`,
							{ text: "Invoice Details: ", bold: true },
							`${invoiceDetail}\n`,
							{ text: "Invoice Date: ", bold: true },
							`${invoiceDate}\n`,
						],
					},
				],
			},
			{
				text: "\n",
			},
			{
				table: {
					headerRows: 1,
					widths: [
						"auto",
						"auto",
						"auto",
						"auto",
						"auto",
						"auto",
						"auto",
						"auto",
						"auto",
					],
					body: [
						[
							{ text: "Description", style: "tableHeader" },
							{ text: "Unit Price", style: "tableHeader" },
							{ text: "Quantity", style: "tableHeader" },
							{ text: "Discount", style: "tableHeader" },
							{ text: "Net Amount", style: "tableHeader" },
							{ text: "Tax Type", style: "tableHeader" },
							{ text: "Tax Rate", style: "tableHeader" },
							{ text: "Tax Amount", style: "tableHeader" },
							{ text: "Total Amount", style: "tableHeader" },
						],
						...items.map((item) => [
							item.description,
							`$${item.unitPrice}`,
							item.quantity,
							item.discount,
							`$${
								item.unitPrice * item.quantity - item.discount
							}`, // net amount
							`${
								sellerState == shippingState
									? "CGST \n SGST"
									: "IGST "
							}`, // tax type
							`${
								sellerState == shippingState
									? "9% \n 9%"
									: "18%"
							}`, // tax type
							`${
								sellerState == shippingState
									? (
											((item.unitPrice * item.quantity -
												item.discount) *
												9) /
											100
									  ).toString() +
									  " \n " +
									  (
											((item.unitPrice * item.quantity -
												item.discount) *
												9) /
											100
									  ).toString()
									: (
											((item.unitPrice * item.quantity -
												item.discount) *
												18) /
											100
									  ).toString()
							}`, // tax amount
							`${
								((item.unitPrice * item.quantity -
									item.discount) *
									118) /
								100
							}`, // total amount
						]),
						[
							{ text: "Total", style: "tableHeader", colSpan: 7 },
							"",
							"",
							"",
							"",
							"",
							"",
							`${items.reduce((acc, item) => {
								return (
									acc +
									((item.unitPrice * item.quantity -
										item.discount) *
										18) /
										100
								);
							}, 0)}`,
							`${items.reduce((acc, item) => {
								return (
									acc +
									((item.unitPrice * item.quantity -
										item.discount) *
										118) /
										100
								);
							}, 0)}`,
						],
						[
							{
								text:
									"Amount in Words : \n" +
									`${numberToWords(
										Math.floor(
											items.reduce((acc, item) => {
												return (
													acc +
													((item.unitPrice *
														item.quantity -
														item.discount) *
														118) /
														100
												);
											}, 0)
										)
									)} Only`,
								bold: true,
								colSpan: 9,
							},
							"",
							"",
							"",
							"",
							"",
							"",
							"",
							"",
						],
						[
							{
								colSpan: 9,
								alignment: "right",
								table: {
									widths: ["*"],
									body: [
										[
											{
												text: `For ${sellerName}`,
												bold: true,
												alignment: "right",
											},
										],
										[
											{
												image: `uploads/${signatureImage}`,
												alignment: "right",
												width: 90,
												height: 30,
											},
										],
										[
											{
												text: "Authorised Signatory",
												alignment: "right",
												bold: true,
											},
										],
									],
								},
								layout: "noBorders",
							},

							{},
							{},
							{},
							{},
							{},
							{},
							{},
							{},
						],
					],
				},
			},
			{
				text: "\n",
			},
			{
				text: `Whether Tax is payable under reverse charge - ${reverseCharge}`,
				alignment: "left",
			},
			{
				text: "\n\nThank you for your business!",
				alignment: "center",
				margin: [0, 20, 0, 0],
			},
		],
		styles: {
			header: {
				fontSize: 18,
				bold: true,
			},
			subheader: {
				fontSize: 14,
				margin: [0, 5, 0, 5],
			},
			tableHeader: {
				bold: true,
				fillColor: "#eeeeee",
			},
		},
		defaultStyle: {
			columnGap: 20,
		},
	};

	var options = {};
	// create invoice and save it to invoices_pdf folder
	var pdfDoc = printer.createPdfKitDocument(docDefinition, options);
	pdfDoc.pipe(fs.createWriteStream("invoices_pdf/" + invoiceNo + ".pdf"));
	pdfDoc.end();

	//

	function numberToWords(num) {
		if (num === 0) return "Zero";

		const belowTwenty = [
			"",
			"One",
			"Two",
			"Three",
			"Four",
			"Five",
			"Six",
			"Seven",
			"Eight",
			"Nine",
			"Ten",
			"Eleven",
			"Twelve",
			"Thirteen",
			"Fourteen",
			"Fifteen",
			"Sixteen",
			"Seventeen",
			"Eighteen",
			"Nineteen",
		];
		const tens = [
			"",
			"",
			"Twenty",
			"Thirty",
			"Forty",
			"Fifty",
			"Sixty",
			"Seventy",
			"Eighty",
			"Ninety",
		];
		const thousands = ["", "Thousand", "Million", "Billion"];

		function helper(n) {
			if (n < 20) return belowTwenty[n];
			if (n < 100)
				return (
					tens[Math.floor(n / 10)] +
					(n % 10 !== 0 ? " " + belowTwenty[n % 10] : "")
				);
			if (n < 1000)
				return (
					belowTwenty[Math.floor(n / 100)] +
					" Hundred" +
					(n % 100 !== 0 ? " " + helper(n % 100) : "")
				);
			for (let i = 1; i < thousands.length; i++) {
				const unit = Math.pow(1000, i);
				if (n < unit * 1000) {
					return (
						helper(Math.floor(n / unit)) +
						" " +
						thousands[i] +
						(n % unit !== 0 ? " " + helper(n % unit) : "")
					);
				}
			}
		}

		return helper(num).trim();
	}
};
