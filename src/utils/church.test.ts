import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterSermons,
  filterBlogPosts,
  validateContactForm,
  calculateTimeRemaining,
  validateGivingAmount,
} from './church';
import { Sermon, BlogPost } from '../types/church';

const mockSermons: Sermon[] = [
  {
    id: 's-1',
    title: 'Walking in Divine Dominion and Purpose',
    speaker: 'Rev. Dr. Emmanuel Adeyemi',
    date: 'Oct 26, 2026',
    category: 'Purpose',
    scripture: 'Romans 8:28-30',
    duration: '48 mins',
    thumbnailUrl: 'https://images.unsplash.com/photo-1543702404-5e8394469792',
    audioDurationSec: 2880,
    summary: 'Discovering how God orchestrates every season of your life toward His glorious design.',
    fullNotes: ['Point 1: The Call of God', 'Point 2: Purpose Over Circumstance'],
  },
  {
    id: 's-2',
    title: 'Unshakable Faith in Shaking Times',
    speaker: 'Rev. Dr. Emmanuel Adeyemi',
    date: 'Oct 19, 2026',
    category: 'Faith',
    scripture: 'Hebrews 11:1-6',
    duration: '52 mins',
    thumbnailUrl: 'https://images.unsplash.com/photo-1438232992991-995b7058bbb3',
    audioDurationSec: 3120,
    summary: 'Standing firm on God promises when storms rage around you.',
    fullNotes: ['Faith is the substance of things hoped for.'],
  },
  {
    id: 's-3',
    title: 'Grace That Defies Human Logic',
    speaker: 'Pastor Grace Adeyemi',
    date: 'Oct 12, 2026',
    category: 'Grace',
    scripture: 'Ephesians 2:8-10',
    duration: '42 mins',
    thumbnailUrl: 'https://images.unsplash.com/photo-1519817650390-64a93db51149',
    audioDurationSec: 2520,
    summary: 'How unmerited favor unlocks doors that human effort could never open.',
    fullNotes: ['Grace is God at work.'],
  },
];

const mockPosts: BlogPost[] = [
  {
    id: 'b-1',
    title: 'Finding Peace in Life Storms: 5 Biblical Pillars',
    author: 'Rev. Dr. Emmanuel Adeyemi',
    date: 'Oct 28, 2026',
    readTime: '6 min read',
    category: 'Spiritual Growth',
    summary: 'Five practical scriptural habits to cultivate inner peace when external pressures mount.',
    content: ['Paragraph 1', 'Paragraph 2'],
    imageUrl: 'https://images.unsplash.com/photo-1507692049790-de58290a4334',
  },
  {
    id: 'b-2',
    title: 'The Power of Persistent Prayer',
    author: 'Pastor Grace Adeyemi',
    date: 'Oct 21, 2026',
    readTime: '5 min read',
    category: 'Faith & Miracles',
    summary: 'Testimonies and biblical insights on what happens when believers refuse to stop knocking.',
    content: ['Knocking until heaven responds.'],
    imageUrl: 'https://images.unsplash.com/photo-1445445290350-18a3b86e0b5b',
  },
];

test('filterSermons filters by category correctly', () => {
  const result = filterSermons(mockSermons, 'Faith');
  assert.equal(result.length, 1);
  assert.equal(result[0].id, 's-2');

  const all = filterSermons(mockSermons, 'All');
  assert.equal(all.length, 3);
});

test('filterSermons matches search query in title, scripture, or speaker', () => {
  const queryResult = filterSermons(mockSermons, 'All', 'Ephesians');
  assert.equal(queryResult.length, 1);
  assert.equal(queryResult[0].id, 's-3');

  const speakerResult = filterSermons(mockSermons, 'All', 'Grace Adeyemi');
  assert.equal(speakerResult.length, 1);
});

test('filterBlogPosts filters accurately', () => {
  const growth = filterBlogPosts(mockPosts, 'Spiritual Growth');
  assert.equal(growth.length, 1);
  assert.equal(growth[0].id, 'b-1');

  const search = filterBlogPosts(mockPosts, 'All', 'prayer');
  assert.equal(search.length, 1);
  assert.equal(search[0].id, 'b-2');
});

test('validateContactForm checks required fields and formats', () => {
  const invalid = validateContactForm({
    fullName: '',
    email: 'bad-email',
    message: 'short',
  });
  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.fullName);
  assert.ok(invalid.errors.email);
  assert.ok(invalid.errors.message);

  const valid = validateContactForm({
    fullName: 'Ruth Johnson',
    email: 'ruth.johnson@example.com',
    phone: '+1 555-019-2831',
    message: 'Please pray for my mother healing in the hospital.',
    category: 'Prayer Request',
  });
  assert.equal(valid.isValid, true);
  assert.equal(Object.keys(valid.errors).length, 0);
});

test('calculateTimeRemaining returns remaining breakdown', () => {
  const now = 1000000;
  const target = now + 1000 * 60 * 60 * 25 + 1000 * 60 * 30 + 15000; // 1 day, 1 hour, 30 min, 15 sec
  const countdown = calculateTimeRemaining(target, now);
  assert.equal(countdown.isPast, false);
  assert.equal(countdown.days, 1);
  assert.equal(countdown.hours, 1);
  assert.equal(countdown.minutes, 30);
  assert.equal(countdown.seconds, 15);

  const past = calculateTimeRemaining(now - 1000, now);
  assert.equal(past.isPast, true);
});

test('validateGivingAmount validates positive gift numbers', () => {
  assert.equal(validateGivingAmount(0).isValid, false);
  assert.equal(validateGivingAmount(-50).isValid, false);
  assert.equal(validateGivingAmount(100).isValid, true);
  assert.equal(validateGivingAmount(500000).isValid, false);
});
