import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../index.css";
import Providers from "@/components/providers";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
});
export const metadata: Metadata = {
	title: "TabX - Premium Game Store",
	description: "Discover and download the best games for your devices. Premium game store with curated collections and exclusive titles.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${poppins.variable} antialiased`}
				suppressHydrationWarning={true}
			>
				<Providers>
					<div>
						<Header />
						{children}
						<Footer />
					</div>
				</Providers>
			</body>
		</html>
	);
}
