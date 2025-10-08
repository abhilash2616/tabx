import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products - TabX",
    description: "Browse our products and special game packages for your friends and family.",
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white">
            {children}
        </div>
    );
}