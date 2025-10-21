/**
 * Formats a MongoDB ISO date string into a readable format
 * @param {string} dateString - The ISO date string from MongoDB
 * @returns {string} Formatted date and time string (e.g., "Oct 20, 2025, 10:30 AM")
 */
export function formatDate(dateString) {
  if (!dateString) return '';

  try {
    const date = new Date(dateString);

    // Check if date is valid
    if (isNaN(date.getTime())) return '';

    // Format as "Oct 20, 2025, 10:30 AM"
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
}