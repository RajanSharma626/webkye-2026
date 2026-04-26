import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Webkye | Web Development & Software Solutions",
  description: "Learn about Webkye, a modern tech agency focused on building high-performance websites and scalable software solutions.",
  alternates: {
    canonical: "/about-us",
  },
  openGraph: {
    title: "About Webkye | Professional Tech Agency",
    description: "Discover our mission to empower businesses with high-performance digital engineering.",
    url: "/about-us",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Webkye | Professional Tech Agency",
    description: "Learn about our mission to build fast, scalable digital products.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
