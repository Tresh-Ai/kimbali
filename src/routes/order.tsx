import { createFileRoute, Link } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { StudioContactOptions } from '@/components/studio-contact-options';

export const Route = createFileRoute('/order')({
  head: () =>
    pageHead(
      'Begin a Conversation',
      'Prepare your KÍMBÀLÌ order message and share your bag designs and custom requests directly with our Nigerian studio.'
    ),
  component: Order,
});

function Order() {
  const cart = useCart();

  return (
    <div className="container page">
      <h1 className="page-title">Let’s make it yours.</h1>
      <p className="page-intro muted">We’ll confirm the details and pricing together.</p>
      <div className="actions max-w-sm flex flex-col gap-3">
        <StudioContactOptions items={cart.items} triggerLabel="Talk to the studio" variant="studio" className="w-full" />
        <Button variant="text" asChild>
          <Link to={cart.items.length ? '/bag' : '/archive'}>
            {cart.items.length ? 'Review your bag' : 'Explore the Archive'}
          </Link>
        </Button>
      </div>
    </div>
  );
}
