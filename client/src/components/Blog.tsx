import React, { useState } from 'react';
import { Search, Calendar, Clock, User, Tag, ChevronRight } from 'lucide-react';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts', count: 12 },
    { id: 'web-dev', name: 'Web Development', count: 4 },
    { id: 'mobile', name: 'Mobile Development', count: 3 },
    { id: 'design', name: 'UI/UX Design', count: 2 },
    { id: 'tech', name: 'Technology', count: 3 }
  ];

  const blogPosts = [
    {
      id: 1,
      title: "The Future of Web Development: What to Expect in 2025",
      excerpt: "Explore the upcoming trends in web development, from AI integration to advanced user interfaces...",
      category: "web-dev",
      author: "John Smith",
      date: "March 15, 2025",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072",
      tags: ["Web Development", "Future Tech", "AI"]
    },
    {
      id: 2,
      title: "Mobile App Development: Native vs Cross-Platform in 2025",
      excerpt: "A comprehensive comparison of native and cross-platform development approaches for modern mobile applications...",
      category: "mobile",
      author: "Sarah Johnson",
      date: "March 12, 2025",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=1974",
      tags: ["Mobile", "Cross-Platform", "Development"]
    },
    {
      id: 3,
      title: "Mastering UI/UX: Design Principles for Better User Experience",
      excerpt: "Learn the essential principles of UI/UX design that can transform your digital products...",
      category: "design",
      author: "Mike Wilson",
      date: "March 10, 2025",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&q=80&w=2000",
      tags: ["UI/UX", "Design", "User Experience"]
    },
    {
      id: 4,
      title: "The Impact of AI on Software Development",
      excerpt: "Discover how artificial intelligence is revolutionizing the software development process...",
      category: "tech",
      author: "Emily Brown",
      date: "March 8, 2025",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=2070",
      tags: ["AI", "Technology", "Software"]
    }
  ];

  const filteredPosts = blogPosts
    .filter(post => 
      (selectedCategory === 'all' || post.category === selectedCategory) &&
      (post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
       post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative h-[40vh] bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=2070"
            alt="Blog"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative h-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Blog</h1>
            <div className="w-24 h-1 bg-[#0FFCBE] mx-auto mb-6"></div>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto px-4">
              Stay updated with the latest insights, trends, and news in technology and software development
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content Area */}
          <div className="lg:w-2/3">
            {/* Search Bar */}
            <div className="relative mb-12">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-12 py-4 border border-gray-300 rounded-full focus:ring-2 focus:ring-[#0FFCBE] focus:border-[#0FFCBE] transition-all duration-200"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </div>

            {/* Blog Posts Grid */}
            <div className="grid gap-12">
              {filteredPosts.map(post => (
                <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-1/3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="md:w-2/3 p-8">
                      {/* Category */}
                      <div className="flex items-center gap-2 mb-4">
                        <Tag className="h-4 w-4 text-[#106EBE]" />
                        <span className="text-sm font-medium text-[#106EBE]">
                          {categories.find(cat => cat.id === post.category)?.name}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl font-bold text-gray-900 mb-4 hover:text-[#106EBE] transition-colors">
                        <a href={`/blog/${post.id}`}>{post.title}</a>
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-600 mb-6">{post.excerpt}</p>

                      {/* Meta Information */}
                      <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More Link */}
                      <a
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center text-[#106EBE] hover:text-[#0FFCBE] font-semibold mt-6 group"
                      >
                        Read More
                        <ChevronRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Categories */}
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Categories</h3>
              <div className="space-y-4">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-[#0FFCBE] text-gray-900'
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-100 px-2 py-1 rounded-full text-sm">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-[#106EBE] rounded-2xl shadow-lg p-8 text-white">
              <h3 className="text-xl font-bold mb-4">Subscribe to Our Newsletter</h3>
              <p className="text-gray-100 mb-6">
                Get the latest updates and insights delivered directly to your inbox.
              </p>
              <form className="space-y-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 placeholder-white/60 text-white focus:ring-2 focus:ring-[#0FFCBE] focus:border-[#0FFCBE] transition-all duration-200"
                />
                <button
                  type="submit"
                  className="w-full bg-[#0FFCBE] text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-white transition-colors duration-300"
                >
                  Subscribe Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;