export interface Product {
  id: string; name: string; slug: string; description: string; image: string | null;
  images: string[]; category: string; materials: string[]; colors: string[];
  hardwareOptions: string[]; customizable: boolean; notes: string; availability: string;
}
const references: [string, string, string][] = [
  ['Vintage Shoulder Bag','Shoulder bags','Exquisitely crafted vintage leather shoulder bag with intricate stitching and patterns.'],
  ['Minimalist Totes','Totes','Two elegant leather tote bags, tan and white, showcasing minimalistic style.'],
  ['Adjustable Crossbody','Crossbody','Brown leather crossbody bag with adjustable strap.'],
  ['Button Clutch','Clutches','Sleek and contemporary brown leather clutch with button accents.'],
  ['Cream Purse','Handbags','Cream leather purse with sleek design and metal detailing.'],
  ['Leather Messenger 06','Messenger bags','Brown leather messenger bag.'],
  ['Leather Handbag 07','Handbags','Stylish brown leather handbag being unveiled.'],
  ['Leather Messenger 08','Messenger bags','Brown leather messenger bag.'],
  ['Leather Handbag 09','Handbags','High-quality brown leather handbag.'],
  ['Brown Purse','Handbags','Sophisticated brown leather purse.'],
  ['Leather Briefcase','Briefcases','Brown leather briefcase.'],
  ['Leather Handbag 12','Handbags','Elegant brown leather handbag.'],
  ['Orange Handbag','Handbags','Stylish orange handbag.'],
  ['Leather Backpack','Backpacks','Sleek leather backpack.'],
  ['Leather Bag 15','Other','Stylish brown leather bag.'],
  ['Leather Carry Case','Other','Handmade leather carry case.'],
  ['Ostrich Handbag','Handbags','Ostrich leather handbag.'],
  ['Vintage Leather Bag','Other','Vintage leather bag.'],
  ['Chain Bag','Handbags','Brown leather bag with gold chain.'],
  ['Ruched Bag','Handbags','Ruched leather bag.'],
  ['Showroom Handbag','Handbags','Leather handbag presented in a showroom setting.'],
  ['Camera-side Handbag','Handbags','Brown leather handbag with vintage camera.'],
];
// Names are descriptive labels derived from the supplied references, not additional specifications.
// Replace image:null and images:[] with verified catalogue assets when supplied.
export const products: Product[] = references.map(([name, category, description], index) => ({
  id: `KMB-${String(index + 1).padStart(2,'0')}`, name, category, description,
  slug: `${String(index + 1).padStart(2,'0')}-${name.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,
  image: null, images: [], materials: [index === 16 ? 'Ostrich leather' : 'Leather'],
  colors: index === 1 ? ['Tan','White'] : index === 4 ? ['Cream'] : index === 12 ? ['Orange'] : description.toLowerCase().includes('brown') ? ['Brown'] : [],
  hardwareOptions: [], customizable: true, notes: 'Material, colour and detail requests are confirmed with the studio before an order is agreed.',
  availability: 'Enquire with the studio',
}));