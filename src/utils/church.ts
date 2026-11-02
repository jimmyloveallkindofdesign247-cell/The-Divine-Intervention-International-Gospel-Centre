import { Sermon, BlogPost, ContactFormData } from '../types/church';

/**
 * Filter sermons by category and search keyword (title, speaker, scripture)
 */
export function filterSermons(
  sermons: Sermon[],
  category: string,
  searchQuery: string = ''
): Sermon[] {
  const query = searchQuery.trim().toLowerCase();
  return sermons.filter((sermon) => {
    const matchesCategory =
      category === 'All' || !category || sermon.category.toLowerCase() === category.toLowerCase();
    
    if (!matchesCategory) return false;
    if (!query) return true;

    return (
      sermon.title.toLowerCase().includes(query) ||
      sermon.speaker.toLowerCase().includes(query) ||
      sermon.scripture.toLowerCase().includes(query) ||
      sermon.summary.toLowerCase().includes(query)
    );
  });
}

/**
 * Filter blog posts by category and search query
 */
export function filterBlogPosts(
  posts: BlogPost[],
  category: string,
  searchQuery: string = ''
): BlogPost[] {
  const query = searchQuery.trim().toLowerCase();
  return posts.filter((post) => {
    const matchesCategory =
      category === 'All' || !category || post.category.toLowerCase() === category.toLowerCase();

    if (!matchesCategory) return false;
    if (!query) return true;

    return (
      post.title.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query)
    );
  });
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
}

/**
 * Validate Contact / Prayer Request Form
 */
export function validateContactForm(data: Partial<ContactFormData>): {
  isValid: boolean;
  errors: ValidationErrors;
} {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (minimum 2 characters)';
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailPattern.test(data.email.trim())) {
    errors.email = 'Please provide a valid email address';
  }

  if (data.phone && data.phone.trim().length > 0) {
    const cleanPhone = data.phone.replace(/[\s\-\(\)\+]/g, '');
    if (!/^\d{7,15}$/.test(cleanPhone)) {
      errors.phone = 'Please provide a valid phone number (or leave blank)';
    }
  }

  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Please provide a detailed message (minimum 10 characters)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Calculate countdown breakdown to a target timestamp
 */
export function calculateTimeRemaining(targetTimestamp: number, currentTimestamp: number = Date.now()): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
} {
  const diff = targetTimestamp - currentTimestamp;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false,
  };
}

/**
 * Validate donation / giving amounts
 */
export function validateGivingAmount(amount: number): { isValid: boolean; error?: string } {
  if (isNaN(amount) || amount <= 0) {
    return { isValid: false, error: 'Please enter a valid gift amount greater than $0' };
  }
  if (amount > 100000) {
    return { isValid: false, error: 'For gifts over $100,000, please contact our ministry office' };
  }
  return { isValid: true };
}
