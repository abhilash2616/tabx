import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Authentication - TabX",
    description: "Login or register to access your TabX account and manage your game library.",
};

export default function AuthLayout({
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
