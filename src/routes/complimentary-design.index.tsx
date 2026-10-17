import { createFileRoute } from '@tanstack/react-router';
import { editorial } from '@/data/visual-studies';
import { pageHead } from '@/lib/seo';
import { ArchiveCover } from '@/components/archive-cover';
import { ComplimentaryCollection } from '@/components/pillar-collections';
export const Route = createFileRoute('/complimentary-design/')({
  head: () => pageHead('Complimentary Design', 'Discover coordinated KÍMBÀLÌ leather pieces, designed to belong together.', '/complimentary-design'),
  component: Complimentary,
});
function Complimentary() {
  return <><ArchiveCover title="Complimentary Design" description="Separate pieces. Made to belong together." image={editorial.atelier} alt="Conceptual leather studio material study"/><ComplimentaryCollection/></>;
}
