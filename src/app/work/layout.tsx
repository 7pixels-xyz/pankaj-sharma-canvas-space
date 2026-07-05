import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Curated Works & Projects",
    description: "Explore the realized and conceptual architectural portfolio of Canvas Space. Brutalist designs, premium interiors, and structural innovations.",
    openGraph: {
        title: "Canvas Space | Architectural Portfolio & Case Studies",
        description: "Explore our archive of premium architectural designs and brutalist environments.",
        url: "https://canvasspace.in/work",
    },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
