import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  baseUrl,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-4 mt-16">
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="btn-secondary h-10 px-4"
          aria-label="Previous page"
        >
          <ChevronLeft size={16} className="mr-2" />
          Previous
        </Link>
      ) : (
        <button 
          disabled 
          className="btn-secondary h-10 px-4 opacity-50 cursor-not-allowed"
          aria-label="Previous page (disabled)"
        >
          <ChevronLeft size={16} className="mr-2" />
          Previous
        </button>
      )}

      <div className="hidden sm:flex items-center space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Link
            key={page}
            href={`${baseUrl}?page=${page}`}
            className={`h-10 w-10 flex items-center justify-center rounded-md text-sm font-medium transition-colors ${
              currentPage === page
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground border border-border hover:bg-accent"
            }`}
            aria-label={`Page ${page}`}
            aria-current={currentPage === page ? "page" : undefined}
          >
            {page}
          </Link>
        ))}
      </div>
      
      <div className="sm:hidden text-sm font-medium text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>

      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="btn-secondary h-10 px-4"
          aria-label="Next page"
        >
          Next
          <ChevronRight size={16} className="ml-2" />
        </Link>
      ) : (
        <button 
          disabled 
          className="btn-secondary h-10 px-4 opacity-50 cursor-not-allowed"
          aria-label="Next page (disabled)"
        >
          Next
          <ChevronRight size={16} className="ml-2" />
        </button>
      )}
    </div>
  );
}
