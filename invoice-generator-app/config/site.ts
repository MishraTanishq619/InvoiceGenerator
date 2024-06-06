export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "InvoiceGenerator",
	description:
		"Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Generate Invoice",
			href: "/",
		},
		{
			label: "View Invoices",
			href: "/viewInvoices",
		},
		// {
		// 	label: "Pricing",
		// 	href: "/pricing",
		// },
		// {
		// 	label: "Blog",
		// 	href: "/blog",
		// },
		// {
		// 	label: "About",
		// 	href: "/about",
		// },
	],
	navMenuItems: [
		{
			label: "Profile",
			href: "/profile",
		},
		{
			label: "Dashboard",
			href: "/dashboard",
		},
		{
			label: "Projects",
			href: "/projects",
		},
		{
			label: "Team",
			href: "/team",
		},
		{
			label: "Calendar",
			href: "/calendar",
		},
		{
			label: "Settings",
			href: "/settings",
		},
		{
			label: "Help & Feedback",
			href: "/help-feedback",
		},
		{
			label: "Logout",
			href: "/logout",
		},
	],
	links: {
		github: "https://github.com/MishraTanishq619",
		twitter: "https://twitter.com/Mi_Tanishq_619",
		linkedin: "https://www.linkedin.com/in/tanishq-mishra-495541255/",
	},
};
