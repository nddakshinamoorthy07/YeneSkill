import Dexie, { Table } from 'dexie';

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  langs: string[];
  tags: string[];
  thumbnailUrl: string;
  mentorId: string;
  modules?: Module[];
  publishedAt: Date;
  isFeatured: boolean;
  sizeMB?: number;
  downloadedAt?: Date;
}

export interface Module {
  title: string;
  durationMin: number;
  videoUrl?: string;
  transcriptUrl?: string;
}

export interface Mentor {
  id: string;
  name: string;
  bio: string;
  expertise: string[];
  languages: string[];
  rating: number;
  avatarUrl: string;
  sessions?: number;
}

export interface Message {
  id: string;
  threadId: string;
  fromUid: string;
  toUid: string;
  body: string;
  createdAt: Date;
  synced: boolean;
}

export interface PendingWrite {
  id?: number;
  collection: string;
  operation: 'create' | 'update' | 'delete';
  data: any;
  timestamp: Date;
  synced: boolean;
}

export interface UserProgress {
  userId: string;
  courseId: string;
  completed: boolean;
  percent: number;
  lastViewedAt: Date;
}

class OfflineDatabase extends Dexie {
  courses!: Table<Course, string>;
  mentors!: Table<Mentor, string>;
  messages!: Table<Message, string>;
  pendingWrites!: Table<PendingWrite, number>;
  userProgress!: Table<UserProgress, string>;

  constructor() {
    super('YeneSkillDB');
    
    this.version(1).stores({
      courses: 'id, category, level, isFeatured, downloadedAt',
      mentors: 'id, expertise, rating',
      messages: 'id, threadId, fromUid, toUid, createdAt, synced',
      pendingWrites: '++id, collection, synced, timestamp',
      userProgress: '[userId+courseId], userId, courseId, lastViewedAt',
    });
  }

  async clearSyncedWrites() {
    await this.pendingWrites.where('synced').equals(1).delete();
  }

  async getPendingWrites() {
    return await this.pendingWrites.where('synced').equals(0).toArray();
  }

  async addPendingWrite(write: Omit<PendingWrite, 'id' | 'timestamp' | 'synced'>) {
    await this.pendingWrites.add({
      ...write,
      timestamp: new Date(),
      synced: false,
    });
  }

  async markWriteSynced(id: number) {
    await this.pendingWrites.update(id, { synced: true });
  }
}

export const db = new OfflineDatabase();

export async function syncWithFirestore() {
  if (!navigator.onLine) return;

  const pendingWrites = await db.getPendingWrites();
  
  for (const write of pendingWrites) {
    try {
      console.log('Syncing pending write:', write);
      await db.markWriteSynced(write.id!);
    } catch (error) {
      console.error('Failed to sync write:', error);
    }
  }

  await db.clearSyncedWrites();
}

if (typeof window !== 'undefined') {
  window.addEventListener('online', syncWithFirestore);
}

export default db;
