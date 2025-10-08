import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Game Bundles - TabX",
    description: "Save more with our curated game bundles. Get multiple games at discounted prices with our exclusive bundle deals.",
};

export default function BundlesLayout({
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
