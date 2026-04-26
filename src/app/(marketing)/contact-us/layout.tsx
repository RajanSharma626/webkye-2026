import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Partner with Webkye",
  description: "Ready to transform your vision into reality? Get in touch with our team of professional engineers and designers today.",
  alternates: {
    canonical: "/contact-us",
  },
  openGraph: {
    title: "Contact Webkye | Start Your Project",
    description: "Get in touch with our team to discuss your next digital engineering project.",
    url: "/contact-us",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Contact Webkye | Start Your Project",
    description: "Ready to transform your vision? Get in touch with our team today.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
