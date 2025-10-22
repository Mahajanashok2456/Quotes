/**
 * Quote Model
 * Defines the structure for quote documents in MongoDB
 */
class Quote {
  constructor(data) {
    this._id = data._id;
    this.text = data.text;
    this.author = data.author;
    this.font_family = data.font_family || 'Arial';
    this.font_color = data.font_color || '#000000';
    this.likes = data.likes || 0;
    this.is_pinned = data.is_pinned || false;
    this.created_at = data.created_at || new Date();
  }

  /**
   * Validates the quote data
   * @returns {Object} Validation result with isValid boolean and errors array
   */
  validate() {
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

    if (typeof this.likes !== 'number') {
      errors.push('Likes must be a number');
    }

    if (this.created_at && !(this.created_at instanceof Date)) {
      errors.push('Created at must be a valid date');
    }

    if (typeof this.is_pinned !== 'boolean') {
      errors.push('Is pinned must be a boolean');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Converts the quote to a plain object for database storage
   * @returns {Object} Plain object representation
   */
  toObject() {
    const obj = {
      text: this.text,
      author: this.author,
      font_family: this.font_family,
      font_color: this.font_color,
      likes: this.likes,
      is_pinned: this.is_pinned,
      created_at: this.created_at
    };

    // Include _id if it exists
    if (this._id) {
      obj._id = this._id;
    }

    return obj;
  }

  /**
   * Creates a Quote instance from database document
   * @param {Object} doc - Database document
   * @returns {Quote} Quote instance
   */
  static fromDocument(doc) {
    return new Quote({
      _id: doc._id,
      text: doc.text,
      author: doc.author,
      font_family: doc.font_family,
      font_color: doc.font_color,
      likes: doc.likes,
      is_pinned: doc.is_pinned,
      created_at: doc.created_at
    });
  }
}

export default Quote;