'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  BarChart3,
  Building2,
  FileText,
  Images,
  Layout,
  Layers,
  ListChecks,
  LogOut,
  MessageSquare,
  Sparkles,
  Users,
  Video,
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import {
  getAllBlogPosts,
  getAllFloorPlans,
  getAllGalleryImages,
  getAllTestimonials,
  getAmenities,
  getBanks,
  getEnquiries,
  getSpecifications,
} from '@/lib/firestore';

type DashboardStats = {
  enquiries: number;
  gallery: number;
  blog: number;
  testimonials: number;
  banks: number;
  amenities: number;
  floorplans: number;
  specifications: number;
};

const EMPTY_STATS: DashboardStats = {
  enquiries: 0,
  gallery: 0,
  blog: 0,
  testimonials: 0,
  banks: 0,
  amenities: 0,
  floorplans: 0,
  specifications: 0,
};

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>(EMPTY_STATS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const [enquiries, gallery, blog, testimonials, banks, amenities, floorplans, specifications] =
          await Promise.all([
            getEnquiries(),
            getAllGalleryImages(),
            getAllBlogPosts(),
            getAllTestimonials(),
            getBanks(),
            getAmenities(),
            getAllFloorPlans(),
            getSpecifications(),
          ]);

        setStats({
          enquiries: enquiries.length,
          gallery: gallery.length,
          blog: blog.length,
          testimonials: testimonials.length,
          banks: banks.length,
          amenities: amenities.length,
          floorplans: floorplans.length,
          specifications: specifications.length,
        });
      } finally {
        setLoading(false);
      }
    };

    void loadStats();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  const modules = [
    {
      id: 'enquiries',
      title: 'Enquiries',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
      count: stats.enquiries,
      href: '/admin/enquiries',
      description: 'Review inbound sales leads',
    },
    {
      id: 'landing',
      title: 'Landing',
      icon: Layout,
      color: 'from-rose-500 to-rose-600',
      count: undefined,
      href: '/admin/landing',
      description: 'Homepage hero video, emotional image, and curated cards',
    },
    {
      id: 'hero',
      title: 'Project Hero',
      icon: Video,
      color: 'from-fuchsia-500 to-fuchsia-600',
      count: undefined,
      href: '/admin/hero',
      description: 'Project page video hero and poster',
    },
    {
      id: 'gallery',
      title: 'Gallery',
      icon: Images,
      color: 'from-emerald-500 to-emerald-600',
      count: stats.gallery,
      href: '/admin/gallery',
      description: 'Track visual assets and categories',
    },
    {
      id: 'blog',
      title: 'Blog',
      icon: FileText,
      color: 'from-violet-500 to-violet-600',
      count: stats.blog,
      href: '/admin/blog',
      description: 'Create and edit published content',
    },
    {
      id: 'testimonials',
      title: 'Testimonials',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      count: stats.testimonials,
      href: '/admin/testimonials',
      description: 'Manage resident stories and ratings',
    },
    {
      id: 'banks',
      title: 'Banks',
      icon: Building2,
      color: 'from-cyan-500 to-cyan-600',
      count: stats.banks,
      href: '/admin/banks',
      description: 'Update partner bank and loan data',
    },
    {
      id: 'pricing',
      title: 'Pricing',
      icon: BarChart3,
      color: 'from-amber-500 to-amber-600',
      count: undefined,
      href: '/admin/pricing',
      description: 'Maintain rates, taxes, and defaults',
    },
    {
      id: 'amenities',
      title: 'Amenities',
      icon: Sparkles,
      color: 'from-teal-500 to-teal-600',
      count: stats.amenities,
      href: '/admin/amenities',
      description: 'Manage amenity cards and descriptions',
    },
    {
      id: 'floorplans',
      title: 'Floor Plans',
      icon: Layers,
      color: 'from-indigo-500 to-indigo-600',
      count: stats.floorplans,
      href: '/admin/floorplans',
      description: '2BHK and 3BHK plans with pricing',
    },
    {
      id: 'specifications',
      title: 'Specifications',
      icon: ListChecks,
      color: 'from-slate-500 to-slate-600',
      count: stats.specifications,
      href: '/admin/specifications',
      description: 'Construction and finish specifications',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <div className="border-b border-[var(--border)] bg-[var(--bg-card)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">
              Admin Dashboard
            </h1>
            <p className="mt-1 text-[var(--text-secondary)]">
              Content, lead, and pricing controls for the website.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-semibold text-red-400 transition-colors hover:bg-red-500/20"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--gold)]">
            Overview
          </p>
          <h2 className="mt-3 font-cormorant text-3xl font-semibold text-[var(--text-primary)]">
            {loading ? 'Loading dashboard metrics...' : 'Current content snapshot'}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module, index) => {
            const Icon = module.icon;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                className={`rounded-3xl bg-gradient-to-br p-px ${module.color}`}
              >
                <div className="flex h-full flex-col rounded-[calc(1.5rem-1px)] bg-[var(--bg-card)] p-6">
                  <div className="flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${module.color}`}
                    >
                      <Icon size={22} className="text-white" />
                    </div>
                    {module.count !== undefined && !loading && (
                      <span className="text-3xl font-bold text-[var(--gold)]">
                        {module.count}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-5 text-xl font-semibold text-[var(--text-primary)]">
                    {module.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-[var(--text-secondary)]">
                    {module.description}
                  </p>

                  <Link
                    href={module.href}
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--gold)] transition-colors hover:text-[var(--gold-light)]"
                  >
                    Open module
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
