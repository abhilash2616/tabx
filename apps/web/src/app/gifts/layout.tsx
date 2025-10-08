import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Gift Cards - TabX",
    description: "Perfect gifts for gamers. Browse our gift cards and special game packages for your friends and family.",
};

export default function GiftsLayout({
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
