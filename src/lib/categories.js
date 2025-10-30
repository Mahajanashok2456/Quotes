export const categories = [
  {
    slug: 'motivation',
    name: 'Motivation',
    description: 'Quotes that ignite your inner fire and drive you to achieve your goals. Perfect for those moments when you need a push to keep going.',
    color: 'from-red-500 to-orange-500',
    previewImage: '/motivation-preview.jpg', // Placeholder
    relatedBlogs: ['finding-motivation-in-small-victories', 'building-resilience-through-challenges'],
  },
  {
    slug: 'love',
    name: 'Love',
    description: 'Beautiful expressions of love, romance, and the deep connections that make life meaningful. From romantic love to self-love.',
    color: 'from-pink-500 to-rose-500',
    previewImage: '/love-preview.jpg', // Placeholder
    relatedBlogs: ['embracing-imperfection'],
  },
  {
    slug: 'success',
    name: 'Success',
    description: 'Inspiring words about achievement, perseverance, and the mindset that leads to success in all areas of life.',
    color: 'from-green-500 to-emerald-500',
    previewImage: '/success-preview.jpg', // Placeholder
    relatedBlogs: ['finding-motivation-in-small-victories', 'building-resilience-through-challenges'],
  },
  {
    slug: 'wisdom',
    name: 'Wisdom',
    description: 'Timeless wisdom from great thinkers, offering insights into life, philosophy, and the human experience.',
    color: 'from-blue-500 to-indigo-500',
    previewImage: '/wisdom-preview.jpg', // Placeholder
    relatedBlogs: ['the-power-of-daily-reflection', 'the-art-of-mindful-living'],
  },
  {
    slug: 'friendship',
    name: 'Friendship',
    description: 'Celebrating the bonds of friendship, loyalty, and the joy of meaningful relationships with others.',
    color: 'from-yellow-500 to-amber-500',
    previewImage: '/friendship-preview.jpg', // Placeholder
    relatedBlogs: ['embracing-imperfection'],
  },
  {
    slug: 'inspiration',
    name: 'Inspiration',
    description: 'Quotes that spark creativity, imagination, and new ways of thinking about the world around us.',
    color: 'from-purple-500 to-violet-500',
    previewImage: '/inspiration-preview.jpg', // Placeholder
    relatedBlogs: ['the-art-of-mindful-living', 'finding-motivation-in-small-victories'],
  },
  {
    slug: 'personal-growth',
    name: 'Personal Growth',
    description: 'Guidance for self-improvement, learning, and becoming the best version of yourself through continuous growth.',
    color: 'from-teal-500 to-cyan-500',
    previewImage: '/personal-growth-preview.jpg', // Placeholder
    relatedBlogs: ['the-power-of-daily-reflection', 'building-resilience-through-challenges', 'embracing-imperfection'],
  },
  {
    slug: 'life-lessons',
    name: 'Life Lessons',
    description: 'Valuable lessons learned from life experiences, offering perspective and guidance for navigating challenges.',
    color: 'from-gray-500 to-slate-500',
    previewImage: '/life-lessons-preview.jpg', // Placeholder
    relatedBlogs: ['building-resilience-through-challenges', 'the-art-of-mindful-living'],
  },
];

export function getCategoryBySlug(slug) {
  return categories.find(cat => cat.slug === slug);
}

export function getRelatedBlogsForCategory(categorySlug) {
  const category = getCategoryBySlug(categorySlug);
  return category ? category.relatedBlogs : [];
}