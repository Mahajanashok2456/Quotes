import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Blog title is required.'],
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Blog slug is required.'],
    unique: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Blog excerpt is required.'],
    trim: true,
  },
  content: {
    type: String,
    required: [true, 'Blog content is required.'],
  },
  heroQuote: {
    type: String,
    trim: true,
  },
  heroAuthor: {
    type: String,
    trim: true,
  },
  publishDate: {
    type: String,
    required: [true, 'Publish date is required.'],
  },
  readTime: {
    type: String,
    required: [true, 'Read time is required.'],
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  metaTitle: {
    type: String,
    trim: true,
  },
  metaDescription: {
    type: String,
    trim: true,
  },
  featuredImage: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Index for better query performance (remove duplicate slug index)
BlogSchema.index({ isPublished: 1, publishDate: -1 });

export default mongoose.models.Blog || mongoose.model('Blog', BlogSchema);