'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  getEnquiries,
  getGalleryImages,
  getBlogPosts,
  getTestimonials,
} from '@/lib/firestore';
import {
  MessageSquare,
  Images,
  FileText,
  Users,
  Settings,
  LogOut,
  BarChart3,
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState({
    enquiries: 0,
    gallery: 0,
    blog: 0,
    testimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const [enquiries, gallery, blog, testimonials] = await Promise.all([
          getEnquiries(),
          getGalleryImages(),
          getBlogPosts(),
          getTestimonials(),
        ]);

        setStats({
          enquiries: enquiries.length,
          gallery: gallery.length,
          blog: blog.length,
          testimonials: testimonials.length,
        });
      } catch (error) {
        console.error('Error loading stats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/admin/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const modules = [
    {
      id: 'enquiries',
      title: 'Enquiries',
      icon: MessageSquare,
      color: 'from-blue-500 to-blue-600',
      count: stats.enquiries,
      href: '/admin/enquiries',
      description: 'Manage visitor enquiries',
    },
    {
      id: 'gallery',
      title: 'Gallery',
      icon: Images,
      color: 'from-purple-500 to-purple-600',
      count: stats.gallery,
      href: '/admin/gallery',
      description: 'Manage property images',
    },
    {
      id: 'blog',
      title: 'Blog Posts',
      icon: FileText,
      color: 'from-green-500 to-green-600',
      count: stats.blog,
      href: '/admin/blog',
      description: 'Create and edit articles',
    },
    {
      id: 'testimonials',
      title: 'Testimonials',
      icon: Users,
      color: 'from-orange-500 to-orange-600',
      count: stats.testimonials,
      href: '/admin/testimonials',
      description: 'Manage resident reviews',
    },
    {
      id: 'pricing',
      title: 'Pricing',
      icon: BarChart3,
      color: 'from-yellow-500 to-yellow-600',
      href: '/admin/pricing',
      description: 'Update pricing settings',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--bg-card)] border-b border-[var(--border)]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-cormorant text-3xl font-bold text-[var(--gold)]">
              Admin Dashboard
            </h1>
            <p className="text-[var(--text-secondary)] mt-1">Manage your property</p>
          </div>

          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg hover:bg-red-500/20 transition-colors font-inter font-semibold text-sm"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {modules.map((module, idx) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`group relative overflow-hidden rounded-lg border border-[var(--border)] bg-gradient-to-br ${module.color} p-0.5`}
              >
                <div className="bg-[var(--bg-card)] rounded-lg p-6 relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${module.color} flex items-center justify-center`}
                    >
                      <Icon size={24} className="text-white" />
                    </div>
                    {module.count !== undefined && (
                      <span className="text-2xl font-bold text-[var(--gold)]">{module.count}</span>
                    )}
                  </div>
                  <h3 className="font-inter font-bold text-[var(--text-primary)] mb-1">
                    {module.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm mb-4">{module.description}</p>
                  <Link
                    href={module.href}
                    className="inline-flex items-center gap-2 text-[var(--gold)] hover:text-[var(--gold-light)] font-semibold text-sm"
                  >
                    Manage →
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-[var(--bg-card)] rounded-lg border border-[var(--border)] p-8"
        >
          <h2 className="font-cormorant text-2xl font-bold text-[var(--text-primary)] mb-6">
            Quick Actions
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/admin/blog"
              className="p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)] hover:border-[var(--gold)] transition-colors"
            >
              <p className="font-inter font-bold text-[var(--text-primary)]">📝 Create New Blog Post</p>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                Add a new article to share insights
              </p>
            </Link>

            <Link
              href="/admin/enquiries"
              className="p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)] hover:border-[var(--gold)] transition-colors"
            >
              <p className="font-inter font-bold text-[var(--text-primary)]">💬 View Enquiries</p>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                Check new visitor enquiries
              </p>
            </Link>

            <Link
              href="/admin/pricing"
              className="p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)] hover:border-[var(--gold)] transition-colors"
            >
              <p className="font-inter font-bold text-[var(--text-primary)]">💰 Update Pricing</p>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                Adjust rates and EMI settings
              </p>
            </Link>

            <Link
              href="/admin/gallery"
              className="p-4 bg-[var(--bg-primary)] rounded-lg border border-[var(--border)] hover:border-[var(--gold)] transition-colors"
            >
              <p className="font-inter font-bold text-[var(--text-primary)]">🖼️ Upload Gallery</p>
              <p className="text-[var(--text-secondary)] text-sm mt-1">
                Add property images
              </p>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
