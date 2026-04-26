import Hero from "@/components/sections/hero";
import AboutSection from "@/components/sections/about-section";
import ServicesPreview from "@/components/sections/services-preview";
import CaseStudiesPreview from "@/components/sections/case-studies-preview";
import Testimonials from "@/components/sections/testimonials";
import BlogPreview from "@/components/sections/blog-preview";
import CTA from "@/components/sections/cta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Webkye | Modern Digital Agency for Web & Mobile Solutions",
  description: "Webkye builds the next generation of digital experiences. From web development to UI/UX design, we deliver innovative, fast, and visually stunning solutions.",
  keywords: "web development, mobile apps, ui/ux design, cloud solutions, digital agency, next.js, react, webkye",
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ServicesPreview />
      <CaseStudiesPreview />
      <Testimonials />
      <BlogPreview />
      <CTA />
    </>
  );
}
