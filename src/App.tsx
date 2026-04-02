/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Search, 
  Menu, 
  X, 
  ChevronRight, 
  Clock, 
  Calendar, 
  ArrowRight,
  TrendingUp,
  Zap,
  Shield,
  BookOpen,
  Globe
} from 'lucide-react';
import { BLOG_POSTS, CATEGORIES, SEO_KEYWORDS, BlogPost } from './constants';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.content.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPost(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-gray-100 font-sans selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-[#0a0a0c]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => {setSelectedCategory(null); setSearchQuery('');}}>
              <div className="p-2 bg-blue-600 rounded-lg">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tighter text-white">AI MACHINE</span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {CATEGORIES.slice(0, 3).map(cat => (
                <button 
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm font-medium transition-colors hover:text-blue-400 ${selectedCategory === cat ? 'text-blue-400' : 'text-gray-400'}`}
                >
                  {cat}
                </button>
              ))}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text"
                  placeholder="Search insights..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 w-48 transition-all focus:w-64"
                />
              </div>
            </div>

            {/* Mobile Menu Toggle */}
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-[#0a0a0c] pt-20 px-6"
          >
            <div className="flex flex-col gap-6">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => {setSelectedCategory(cat); setIsMenuOpen(false);}}
                  className="text-2xl font-bold text-left hover:text-blue-400"
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      {!selectedCategory && !searchQuery && (
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold mb-6">
                <TrendingUp className="w-3 h-3" />
                <span>THE FUTURE IS INTELLIGENT</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
                Decoding the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">AI Revolution</span>
              </h1>
              <p className="text-lg text-gray-400 mb-10 leading-relaxed">
                Your ultimate guide to the future of intelligence. We explore the latest in AI tools, 
                machine learning breakthroughs, and how automation is reshaping our world.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-blue-600/20">
                  Explore Latest <ChevronRight className="w-4 h-4" />
                </button>
                <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all border border-white/10">
                  Join Newsletter
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-white/5 pb-8">
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            >
              All Posts
            </button>
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredPosts.length} insights
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all hover:shadow-2xl hover:shadow-blue-500/10 cursor-pointer flex flex-col"
              onClick={() => setSelectedPost(post)}
            >
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={`https://picsum.photos/seed/${post.id}/800/450`} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-blue-400 text-[10px] font-bold uppercase tracking-widest rounded-full border border-blue-500/30">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                  {post.content[0]}
                </p>
                <div className="flex items-center text-blue-400 text-sm font-bold group-hover:gap-2 transition-all">
                  Read Insight <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <Cpu className="w-16 h-16 text-gray-700 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No insights found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </main>

      {/* Footer / SEO Section */}
      <footer className="bg-[#050507] border-t border-white/5 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold tracking-tighter text-white">AI MACHINE</span>
              </div>
              <p className="text-gray-400 max-w-md mb-8">
                The leading source for artificial intelligence news, analysis, and future trends. 
                Empowering humanity through intelligent insights.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                {[Globe, Zap, Shield, BookOpen].map((Icon, i) => (
                  <a key={i} href="#" className="p-3 bg-white/5 rounded-xl hover:bg-blue-600 transition-all text-gray-400 hover:text-white">
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Categories</h4>
              <ul className="space-y-4">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button onClick={() => setSelectedCategory(cat)} className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">SEO Keywords</h4>
              <div className="flex flex-wrap gap-2">
                {SEO_KEYWORDS.map(word => (
                  <span key={word} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-gray-500 uppercase tracking-wider">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2026 AI MACHINE. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Post Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setSelectedPost(null)} />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-[#0a0a0c] border border-white/10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"
            >
              <button 
                onClick={() => setSelectedPost(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-video w-full">
                <img 
                  src={`https://picsum.photos/seed/${selectedPost.id}/1200/675`} 
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4 inline-block">
                    {selectedPost.category}
                  </span>
                  <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                    {selectedPost.title}
                  </h2>
                </div>
              </div>

              <div className="p-8 md:p-12">
                <div className="flex items-center gap-6 text-sm text-gray-500 mb-10 border-b border-white/5 pb-6">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {selectedPost.date}</span>
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4" /> {selectedPost.readTime}</span>
                  <span className="flex items-center gap-2 text-blue-400"><Cpu className="w-4 h-4" /> AI MACHINE Editorial</span>
                </div>

                <div className="prose prose-invert max-w-none">
                  {selectedPost.content.map((para, i) => (
                    <p key={i} className="text-gray-300 text-lg leading-relaxed mb-8">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-12 p-8 bg-blue-600/5 border border-blue-500/20 rounded-2xl">
                  <h4 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> AI Image Generation Prompt
                  </h4>
                  <p className="text-gray-400 italic text-sm leading-relaxed">
                    "{selectedPost.imagePrompt}"
                  </p>
                </div>

                <div className="mt-12 flex justify-between items-center pt-8 border-t border-white/5">
                  <div className="flex gap-4">
                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all">
                      Share Insight
                    </button>
                    <button className="px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-all">
                      Save for Later
                    </button>
                  </div>
                  <button 
                    onClick={() => setSelectedPost(null)}
                    className="text-blue-400 font-bold hover:underline"
                  >
                    Back to Feed
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
