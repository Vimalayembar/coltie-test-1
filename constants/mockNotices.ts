export interface Notice {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  category: string;
  dateTime: string;
  hasAttachment: boolean;
  isUnread: boolean;
}

// Import the JSON mock data
import mockNoticesJson from './mockNotices.json';

// Map the JSON data to Notice[]
export const mockNotices: Notice[] = mockNoticesJson as Notice[];
