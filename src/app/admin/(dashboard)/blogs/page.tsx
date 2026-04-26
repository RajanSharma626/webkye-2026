import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus, Edit2, Calendar, User, Tag } from "lucide-react";
import DeleteButton from "@/components/admin/DeleteButton";
import Image from "next/image";

export default async function AdminBlogsPage() {
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog Posts</h1>
          <p className="text-muted-foreground">Manage your articles and insights.</p>
        </div>
        <Link 
          href="/admin/blogs/new" 
          className="btn-primary space-x-2"
        >
          <Plus size={18} />
          <span>New Post</span>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-secondary/50 border-b border-border">
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Article</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Category</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Author</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Date</th>
                <th className="px-8 py-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-muted-foreground italic">
                    No blog posts found.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-10 rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={blog.image} alt={blog.title} fill className="object-cover" />
                        </div>
                        <span className="font-bold line-clamp-1">{blog.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="inline-flex items-center px-3 py-1 bg-secondary rounded-full text-xs font-bold text-primary uppercase">
                        <Tag size={12} className="mr-1" />
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-sm">
                      <div className="flex items-center space-x-2">
                        <User size={14} className="text-muted-foreground" />
                        <span>{blog.author}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-sm text-muted-foreground">
                       <div className="flex items-center space-x-2">
                        <Calendar size={14} />
                        <span>{new Date(blog.date).toLocaleDateString()}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center space-x-3">
                        <Link href={`/admin/blogs/edit/${blog.id}`} className="text-primary hover:text-primary/80">
                          <Edit2 size={18} />
                        </Link>
                        <DeleteButton 
                          id={blog.id} 
                          endpoint="/api/blogs" 
                          className="text-red-500 hover:text-red-400" 
                          iconSize={18} 
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

