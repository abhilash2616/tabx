import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Subscriptions - TabX",
    description: "Subscribe to TabX and get unlimited access to premium games. Enjoy exclusive benefits and early access to new releases.",
};

export default function SubscriptionsLayout({
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
