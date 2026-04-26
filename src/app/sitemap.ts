import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  type Item = { slug: string; updatedAt: Date };

  // Fetch dynamic routes
  let services: Item[] = [];
  let projects: Item[] = [];
  let blogs: Item[] = [];
  try {
    [services, projects, blogs] = await Promise.all([
      prisma.service.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.project.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.blog.findMany({ select: { slug: true, updatedAt: true } }),
    ]);
  } catch (error) {
    console.error('Sitemap DB error:', error);
  }

  // Helper for safe date
  const getDate = (date: Date | null | undefined) =>
    date ? new Date(date) : new Date();

  // Services
  const serviceUrls = services.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: getDate(service.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    }));

  // Case Studies
  const projectUrls = projects.map((project) => ({
    url: `${baseUrl}/case-studies/${project.slug}`,
    lastModified: getDate(project.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blogs
  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blogs/${blog.slug}`,
    lastModified: getDate(blog.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Static routes with better priorities
  type ChangeFreq = 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  
  const staticRoutes = ([
    { path: '', priority: 1.0, changeFrequency: 'weekly' as ChangeFreq },
    { path: '/services', priority: 0.9 },
    { path: '/case-studies', priority: 0.8 },
    { path: '/blogs', priority: 0.8 },
    { path: '/about-us', priority: 0.7 },
    { path: '/contact-us', priority: 0.7 },
    { path: '/faqs', priority: 0.6 },
    { path: '/privacy-policy', priority: 0.4 },
    { path: '/terms-and-conditions', priority: 0.4 },
    { path: '/refund-policy', priority: 0.4 },
  ]).map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: new Date('2026-01-01'),
    changeFrequency: (route.changeFrequency ?? 'monthly') as ChangeFreq,
    priority: route.priority,
  }));

  return [
    ...staticRoutes,
    ...serviceUrls,
    ...projectUrls,
    ...blogUrls,
  ];
}
