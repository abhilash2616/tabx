import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - TabX",
    description: "Get in touch with TabX. Contact us for game support, technical issues, and customer service.",
};

export default function ContactLayout({
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
