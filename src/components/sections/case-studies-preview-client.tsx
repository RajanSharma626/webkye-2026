"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import CaseStudyCard from "@/components/ui/case-study-card";

interface Project {
  slug: string;
  title: string;
  category: string;
  image: string;
  description?: string;
  tags?: string;
}

export default function CaseStudiesPreviewClient({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
      {projects.map((project, index) => (
        <CaseStudyCard key={project.slug} project={project} index={index} />
      ))}
    </div>
  );
}
