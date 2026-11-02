export interface ChurchService {
  id: string;
  title: string;
  day: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  streamAvailable: boolean;
  tag: string;
}

export interface Sermon {
  id: string;
  title: string;
  speaker: string;
  date: string;
  category: 'Faith' | 'Purpose' | 'Grace' | 'Prayer' | 'Holy Spirit';
  scripture: string;
  duration: string;
  thumbnailUrl: string;
  audioDurationSec: number;
  summary: string;
  fullNotes: string[];
}

export interface ChurchEvent {
  id: string;
  title: string;
  date: string; // ISO date or formatted
  targetTimestamp: number;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
  highlights: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  category: 'Spiritual Growth' | 'Teachings' | 'Faith & Miracles' | 'Announcements';
  summary: string;
  content: string[];
  imageUrl: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  category: 'General Inquiry' | 'Prayer Request' | 'Counseling' | 'Testimony';
  message: string;
}

export interface GivingOption {
  fund: 'Tithes' | 'General Offering' | 'Missions & Outreach' | 'Church Building Project';
  amount: number;
  frequency: 'one-time' | 'weekly' | 'monthly';
}
