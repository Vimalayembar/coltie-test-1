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

export const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'Mid-term Examination Schedule',
    subtitle: 'Important Update',
    description: 'The mid-term examinations will commence from next week. Please check the detailed schedule attached. All students are required to bring their ID cards and hall tickets.',
    category: 'Academics',
    dateTime: '2024-04-26T10:00:00',
    hasAttachment: true,
    isUnread: true,
  },
  {
    id: '2',
    title: 'Library Maintenance Notice',
    description: 'The central library will be under maintenance this weekend. All services will be temporarily unavailable.',
    category: 'Academics',
    dateTime: '2024-04-25T15:30:00',
    hasAttachment: false,
    isUnread: false,
  },
  {
    id: '3',
    title: 'Sports Day Event',
    subtitle: 'Annual Sports Meet',
    description: 'Join us for the annual sports day celebration. Various sports competitions will be held throughout the day.',
    category: 'Events',
    dateTime: '2024-04-24T09:00:00',
    hasAttachment: true,
    isUnread: true,
  },
  {
    id: '4',
    title: 'Fee Payment Deadline',
    description: 'Last date for fee payment is approaching. Please ensure timely payment to avoid any inconvenience.',
    category: 'Finance',
    dateTime: '2024-04-23T14:00:00',
    hasAttachment: false,
    isUnread: true,
  },
  {
    id: '5',
    title: 'New Course Registration',
    subtitle: 'Open for All Students',
    description: 'Registration for new elective courses is now open. Please visit the academic portal to register.',
    category: 'Academics',
    dateTime: '2024-04-22T11:00:00',
    hasAttachment: true,
    isUnread: false,
  },
]; 