import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { pageHead } from '@/lib/seo';
import { useCart } from '@/lib/cart';
import { generateOrder, whatsappUrl } from '@/lib/order';
import { Button } from '@/components/ui/button';
export const Route = createFileRoute('/order')({head:() => pageHead('Begin a Conversation','Prepare your KÍMBÀLÌ order message and share your bag designs and custom requests directly through WhatsApp.'),component:Order});
function Order() {
  const cart = useCart();
  const url = whatsappUrl(cart.items.length ? generateOrder(cart.items) : 'Hello KÍMBÀLÌ, I’d like to discuss a bag.');
  return <div className="container page"><h1 className="page-title">Let’s make it yours.</h1><p className="page-intro muted">We’ll confirm the details and pricing together.</p><div className="actions max-w-sm"><Button variant="studio" disabled={!cart.ready} asChild><a href={cart.ready ? url || undefined : undefined} target="_blank" rel="noopener noreferrer">Talk to the studio <ArrowUpRight/></a></Button><Button variant="text" asChild><Link to={cart.items.length ? '/bag' : '/archive'}>{cart.items.length ? 'Review your bag' : 'Explore the Archive'}</Link></Button></div></div>;
}