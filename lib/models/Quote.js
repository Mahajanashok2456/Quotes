import mongoose from 'mongoose'

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'Quote text is required'],
    trim: true,
    maxlength: [500, 'Quote text cannot exceed 500 characters']
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true,
    maxlength: [100, 'Author name cannot exceed 100 characters']
  },
  fontFamily: {
    type: String,
    required: [true, 'Font family is required'],
    enum: {
      values: ['Montserrat', 'Playfair Display', 'Lora', 'Roboto', 'Open Sans'],
      message: 'Font family must be one of: Montserrat, Playfair Display, Lora, Roboto, Open Sans'
    },
    default: 'Montserrat'
  },
  color: {
    type: String,
    required: [true, 'Color is required'],
    match: [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Color must be a valid hex color'],
    default: '#ffffff'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

// Update the updatedAt field before saving
quoteSchema.pre('save', function(next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.models.Quote || mongoose.model('Quote', quoteSchema)