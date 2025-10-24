import mongoose from 'mongoose';

/**
 * Quote Schema
 * Defines the structure for quote documents in MongoDB
 */
const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  font_family: {
    type: String,
    default: 'Arial'
  },
  font_color: {
    type: String,
    default: '#000000'
  },
  likes: {
    type: Number,
    default: 0
  },
  is_pinned: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Add validation method to the schema
quoteSchema.methods.validateQuote = function() {
  const errors = [];

  if (!this.text || typeof this.text !== 'string' || this.text.trim().length === 0) {
    errors.push('Text is required and must be a non-empty string');
  }

  if (!this.author || typeof this.author !== 'string' || this.author.trim().length === 0) {
    errors.push('Author is required and must be a non-empty string');
  }

  if (this.font_family && typeof this.font_family !== 'string') {
    errors.push('Font family must be a string');
  }

  if (this.font_color && typeof this.font_color !== 'string') {
    errors.push('Font color must be a string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// Create the model
const Quote = mongoose.models.Quote || mongoose.model('Quote', quoteSchema);

export default Quote;