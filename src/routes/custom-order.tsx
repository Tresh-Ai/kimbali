import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { ConfigurationForm } from '@/components/configuration-form';
import { editorial } from '@/data/visual-studies';
import { useCart } from '@/lib/cart';

export const Route = createFileRoute('/custom-order')({
  validateSearch: (search: Record<string, unknown>): { edit?: string | undefined } => ({ edit: typeof search['edit'] === 'string' ? search['edit'] : undefined }),
  head: () => pageHead('Custom Order | Made for Your Idea', 'Choose your material, colour and details for a custom KÍMBÀLÌ bag.'),
  component: CustomOrder,
});

function CustomOrder() {
  const { edit } = Route.useSearch(); const cart = useCart();
  const initial = cart.items.find(item => item.key === edit && item.custom);
  return <div className="workspace">
    <div className="workspace-media"><img src={editorial.tote} alt="Tan leather tote" width={736} height={912} fetchPriority="high"/><h1 className="reveal">Made for<br/>your <em>idea.</em></h1></div>
    <div className="workspace-panel">
      <p className="eyebrow muted reveal">{initial ? 'Edit your order' : 'Custom order'}</p>
      <p className="lede muted reveal reveal-delay">Tell us what you have in mind.</p>
      <div className="reveal">
        <ConfigurationForm initial={initial}/>
      </div>
    </div>
  </div>;
}
