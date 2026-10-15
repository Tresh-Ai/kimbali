// Draft content for the founder to revise. No prices, timelines or guarantees.
export const archiveGroups = ['Male bags', 'Female bags', 'Purses', 'Tote bags', 'Other'] as const;

const groupMap: Record<string, (typeof archiveGroups)[number]> = {
  'Messenger bags': 'Male bags', Briefcases: 'Male bags', Backpacks: 'Male bags',
  'Shoulder bags': 'Female bags', Handbags: 'Female bags', Crossbody: 'Female bags',
  Clutches: 'Purses', Totes: 'Tote bags',
};
export const groupFor = (category: string) => groupMap[category] ?? 'Other';

export const sets = [
  { name: 'The Weekender Set', pieces: ['Leather duffel', 'Matching cardholder'], note: 'For travel, coordinated in one leather and colour.' },
  { name: 'The Office Set', pieces: ['Briefcase', 'Laptop sleeve', 'Card wallet'], note: 'A working wardrobe that reads as one.' },
  { name: 'The Evening Set', pieces: ['Clutch', 'Matching footwear accent'], note: 'Bag and shoe details made to match.' },
  { name: 'The Gift Set', pieces: ['Tote', 'Purse', 'Keyholder'], note: 'Coordinated pieces made to be given.' },
];
