import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Initiate Dialogue | Contact Studio",
    description: "Connect with Canvas Space. Based in Chandigarh, India, we are open for premium architectural and interior design collaborations globally.",
    openGraph: {
        title: "Contact Canvas Space Studio",
        description: "Start a dialogue with Pankaj Sharma and the Canvas Space studio team.",
        url: "https://canvasspace.in/contact",
    },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
