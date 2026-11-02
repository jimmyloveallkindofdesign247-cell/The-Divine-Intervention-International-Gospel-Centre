import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, Sparkles, X, Share2 } from 'lucide-react';
import { BLOG_POSTS } from '../data/churchData';
import { BlogPost } from '../types/church';
import { filterBlogPosts } from '../utils/church';

export const BlogSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);
  const [sharedToast, setSharedToast] = useState(false);

  const categories = ['All', 'Spiritual Growth', 'Teachings', 'Faith & Miracles', 'Announcements'];
  const filteredPosts = filterBlogPosts(BLOG_POSTS, selectedCategory);

  const handleSharePost = (post: BlogPost) => {
    navigator.clipboard?.writeText(window.location.href);
    setSharedToast(true);
    setTimeout(() => setSharedToast(false), 2500);
  };

  return (
    <section id="blog" className="py-24 lg:py-32 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-sky-600 mb-3">
            <Sparkles className="w-4 h-4 text-sky-500" />
            <span>WORDS OF FAITH & EDIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#070e1e] tracking-tight">
            Church Blog & Insights
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 font-light">
            Inspirational teachings, biblical counsel, and testimonies written to encourage your spirit and equip you for daily victorious Christian living.
          </p>
        </div>

        {/* Categories Tabs (Clean segmented control, anti-slop compliant) */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-all ${
                selectedCategory === cat
                  ? 'bg-[#070e1e] text-white shadow'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                {/* Post Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  
                  {/* Category overlay */}
                  <div className="absolute top-3 left-3 bg-[#070e1e]/90 text-sky-300 text-[11px] font-semibold px-2.5 py-0.5 rounded border border-sky-800/40">
                    {post.category}
                  </div>
                </div>

                {/* Post Card Content */}
                <div className="p-5">
                  {/* Metadata with Typographic Separator */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{post.readTime}</span>
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{post.date}</span>
                  </div>

                  <h3 className="font-serif font-bold text-base sm:text-lg text-[#070e1e] group-hover:text-sky-700 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed font-light">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-medium truncate max-w-[150px]">
                  {post.author}
                </span>
                <span className="font-bold text-[#070e1e] group-hover:text-sky-600 flex items-center gap-1 transition-colors">
                  <span>Read</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Full Article Reader Modal */}
      {activePost && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-reader-title"
          className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative border border-slate-100 my-8">
            <button
              onClick={() => setActivePost(null)}
              aria-label="Close article reader"
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Category and Read Time */}
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-600 uppercase tracking-wider mb-2">
              <span>{activePost.category}</span>
              <span aria-hidden="true">·</span>
              <span>{activePost.readTime}</span>
              <span aria-hidden="true">·</span>
              <span>{activePost.date}</span>
            </div>

            <h3 id="article-reader-title" className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#070e1e] leading-tight">
              {activePost.title}
            </h3>

            <div className="flex items-center gap-2 mt-3 pb-6 border-b border-slate-100 text-xs text-slate-500">
              <User className="w-4 h-4 text-sky-700" />
              <span>Written by <strong className="text-slate-800">{activePost.author}</strong></span>
            </div>

            {/* Article Image */}
            <div className="my-6 rounded-xl overflow-hidden aspect-[16/9] shadow-md">
              <img
                src={activePost.imageUrl}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Prose Content */}
            <div className="space-y-4 max-h-[45vh] overflow-y-auto pr-2 text-slate-700 text-sm sm:text-base leading-relaxed font-light">
              {activePost.content.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}

              {/* Concluding Blessing */}
              <div className="mt-6 p-4 rounded-xl bg-sky-50 border border-sky-100 text-sky-950 font-serif italic text-sm">
                “May the Lord bless you and keep you; may the Lord make His face shine upon you and be gracious to you.” — Numbers 6:24-25
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
              {sharedToast ? (
                <span className="text-xs text-emerald-600 font-semibold">Article link copied!</span>
              ) : (
                <button
                  onClick={() => handleSharePost(activePost)}
                  className="text-xs font-medium text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Article</span>
                </button>
              )}

              <button
                onClick={() => setActivePost(null)}
                className="px-5 py-2.5 bg-[#070e1e] text-white text-xs font-semibold rounded-lg hover:bg-sky-950 transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
