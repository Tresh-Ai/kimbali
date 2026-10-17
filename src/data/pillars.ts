// Draft content for the founder to revise. No prices, timelines or guarantees.
export const archiveGroups = ['Male bags', 'Female bags', 'Purses', 'Tote bags', 'Other'] as const;

const groupMap: Record<string, (typeof archiveGroups)[number]> = {
  'Messenger bags': 'Male bags', Briefcases: 'Male bags', Backpacks: 'Male bags',
  'Shoulder bags': 'Female bags', Handbags: 'Female bags', Crossbody: 'Female bags',
  Clutches: 'Purses', Totes: 'Tote bags',
};
export const groupFor = (category: string) => groupMap[category] ?? 'Other';

export const sets = [
  { slug: 'weekender', name: 'The Weekender Set', pieces: ['Leather duffel', 'Matching cardholder'], note: 'For travel, coordinated in one leather and colour.' },
  { slug: 'office', name: 'The Office Set', pieces: ['Briefcase', 'Laptop sleeve', 'Card wallet'], note: 'A working wardrobe that reads as one.' },
  { slug: 'evening', name: 'The Evening Set', pieces: ['Clutch', 'Matching footwear accent'], note: 'Bag and shoe details made to match.' },
  { slug: 'gift', name: 'The Gift Set', pieces: ['Tote', 'Purse', 'Keyholder'], note: 'Coordinated pieces made to be given.' },
];

// Draft use cases for the founder to revise, not specifications or guarantees.
export const businessUses = [
  { imageKey: 'gift', title: 'Client & member gifts', note: 'Coordinated leather pieces for the people in your circle.' },
  { imageKey: 'office', title: 'Team & staff pieces', note: 'Briefcases, sleeves and everyday work essentials.' },
  { imageKey: 'weekender', title: 'Events & occasions', note: 'A considered gift for a conference, milestone or gathering.' },
  { imageKey: 'evening', title: 'Bulk & retail orders', note: 'A coordinated collection for your business.' },
] as const;
