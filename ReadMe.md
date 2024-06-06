# Invoice Generator and Viewer

This project is an application built with Next.js that serves as an invoice generator and viewer. It allows users to create invoices with customizable details such as seller information, billing details, shipping details, order details, and invoice details. Additionally, users can upload images for the company logo and signature.

## Features:

**Image Upload**: Allows users to upload images for the company logo and signature.

**Invoice Customization**: Users can customize seller information, billing details, shipping details, and more.

**Invoice Generation**: Users can fill in various details to generate invoices dynamically.

**PDF Viewer**: Generated invoices are available for viewing in PDF format.

## Usage:

**Invoice Generation**: Access the '/' route to fill in the necessary details and create invoices.

**PDF Viewer**: Navigate to the '/viewInvoices' route to view generated invoices in PDF format.

## Technologies Used

**Next.js**: Used as the framework for building the application.

**Next UI Component Library**: Utilized for building UI components.

**Recoil**: Used for state management.

**Node.js**: Backend server for handling APIs.

**Axios**: Utilized for making HTTP requests.

**Multer.js**: Backend library for handling file uploads.

**PdfMake**: Backend server for generating PDFs.

# Starting the Project with Docker Compose

## Prerequisites

-   Docker
-   Docker Compose

## Step 1: Clone the Repository

Clone the repository to your local machine using Git:

```bash
git clone https://github.com/your-username/InvoiceGenerator.git
```

## Step 2: Navigate to the Project Directory

Navigate to the project directory:

```bash
cd InvoiceGenerator
```

## Step 3: Start the Project with Docker Compose

Run the following command to start the project using Docker Compose:

```bash
docker-compose -f docker-compose.dev.yaml up
```

## Step 4: Access the Application

Once the containers are up and running, you can access the application in your web browser:

**Frontend**: Visit http://localhost:3000/

**Backend**: The backend API will be accessible at http://localhost:4000/

## FrontEnd

### NextUI

NextUI is a modern React-based UI component library that helps build beautiful, responsive, and accessible web applications. It provides a variety of pre-built components that can be customized to fit the design requirements.

### Components Used:

**Input**: For capturing various text inputs.

**Accordion**: For organizing different sections of the form.

**AccordionItem**: For individual sections within the accordion.

**Button**: For submitting forms and performing actions.

**Modal**: Overlays for dialogs and pop-ups.

**DateInput**: For capturing date inputs.

**ItemsTable**: Custom component for displaying items.

**useRecoilState**: For managing state with Recoil.

**useRecoilValue**: For accessing Recoil state values.

## Pages

### '/' - Generate Invoice

The root page (/) is used for generating invoices. It contains the InvoiceForm component, which allows users to input all necessary details and upload files for generating an invoice. It uses several NextUI components to ensure a consistent and user-friendly interface.

#### Dark mode

![genInvoicepage](https://github.com/MishraTanishq619/InvoiceGenerator/assets/127047332/eabfd286-8b00-4772-bb40-651e07988921)

#### Light mode

![genInvoicepage2](https://github.com/MishraTanishq619/InvoiceGenerator/assets/127047332/9b00fc36-e934-433b-8dcc-8e5daa7eb02e)

### InvoiceForm Component

The InvoiceForm component manages several states for handling form data and image uploads. It includes fields for logo and signature images, seller, billing, and shipping details, as well as order and invoice information.

### /viewInvoices - View Invoices

The /viewInvoices page is used to display the generated invoices. Users can view, download, or manage their invoices from this page.

#### Dark mode

![viewInvoicePage](https://github.com/MishraTanishq619/InvoiceGenerator/assets/127047332/14ce244d-cdba-4673-ae9e-aad046dd6a27)

#### Light mode

![viewInvoicePage2](https://github.com/MishraTanishq619/InvoiceGenerator/assets/127047332/f07642e2-5f68-4861-9487-cc8852c8d3b3)

## Invoice Generator Backend API

### Overview

This backend application handles the creation, storage, and retrieval of invoices in PDF format. It is built with Node.js and Express and includes routes for uploading company logos and signatures, creating invoices, and retrieving invoice PDFs.

### Dependencies

-   **Multer** : Multer is configured in a separate file (multer.js) which sets up the middleware for handling multipart/form-data, primarily used for uploading files.

-   **Express** : Fast, unopinionated, minimalist web framework for Node.js

-   **Cors** : Middleware for enabling CORS (Cross-Origin Resource Sharing)

-   **body-parser** : Middleware for parsing incoming request bodies

-   **Pdfmake** : Library for generating PDF documents in the browser and server-side

## API Endpoints

### POST /invoice/create

Description: Creates an invoice PDF with the provided data.
Request Body: JSON object containing:

```json
{
	"logoImage": "path/to/logo.png",
	"sellerDetails": {},
	"billingDetails": {},
	"shippingDetails": {},
	"orderDetails": {},
	"invoiceDetails": {},
	"reverseChange": "Yes/No",
	"Items": [{}],
	"signatureImage": "path/to/signature.png"
}
```

Response:

```json
{
	"msg": "Success",
	"body": {}
}
```

### POST /invoice/getInvoiceAndPdf

Description: Retrieves the PDF of the specified invoice.
Request Body: JSON object containing:

```json
{
	"invoiceNumber": "Invoice Number"
}
```

Response: Sends the invoice PDF file.

### POST /uploadCompanyLogo

Description: Uploads a company logo image.

Request Body: Multipart form data containing the logo file.

Response:

```json
{
	"LogoImage": "logo.png"
}
```

### POST /uploadSignature

Description: Uploads a signature image.

Request Body: Multipart form data containing the signature file.

Response:

```json
{
	"image": "signature.png"
}
```

## PDF Generation

The makeInvoicePdf function generates the invoice PDF using pdfmake. It accepts the following parameters:

logoImage: Path to the logo image file.

sellerDetails, billingDetails, shippingDetails: Objects containing relevant details.

orderDetails, invoiceDetails: Objects containing order and invoice details.

reverseChange: String indicating if reverse charge is applicable.

Items: Array of item objects, each containing description, unitPrice, quantity, and discount.

signatureImage: Path to the signature image file.

The generated PDF is saved in the invoices_pdf directory with the filename format: <invoiceNo>.pdf.

#### Example Invoice Pdf:

![InvoiceExample_page](https://github.com/MishraTanishq619/InvoiceGenerator/assets/127047332/91d8223f-2ce8-4009-88aa-68cfaaa3b1d3)

## License

This project is licensed under the MIT License.

## Contact

For any questions or support, please contact [@MishraTanishq619].
