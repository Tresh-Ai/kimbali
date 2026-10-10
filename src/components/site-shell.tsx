import { useEffect, useState, type ReactNode } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { PinterestLink } from './studio-links';
import { generateOrder, whatsappUrl } from '@/lib/order';
import { KimbaliLogo } from '@/components/kimbali-logo';

export function SiteShell({children}: {children:ReactNode}) {
  const [open,setOpen] = useState(false); const cart = useCart();
  const pathname = useRouterState({select: state => state.location.pathname});
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), {threshold: 0.08});
    const observed = new WeakSet<Element>();
    const observeReveals = () => document.querySelectorAll('.reveal').forEach(element => {
      if (observed.has(element)) return;
      observed.add(element);
      element.classList.add('reveal-ready');
      observer.observe(element);
    });
    observeReveals();
    const mutations = new MutationObserver(observeReveals);
    mutations.observe(document.getElementById('main') || document.body, {childList:true,subtree:true});
    return () => { mutations.disconnect(); observer.disconnect(); };
  }, [pathname]);
  const links = <><Link to="/archive" onClick={() => setOpen(false)}>Archive</Link><Link to="/custom-order" onClick={() => setOpen(false)}>Custom order</Link><Link to="/studio" onClick={() => setOpen(false)}>About</Link></>;
  return <><a href="#main" className="skip-link">Skip to content</a><header className="site-nav"><div className="container nav-inner"><Link to="/" className="wordmark" aria-label="KÍMBÀLÌ home"><KimbaliLogo className="h-8 w-8 text-foreground shrink-0" /><span>KÍMBÀLÌ</span></Link><nav aria-label="Main navigation" className="nav-links">{links}</nav><div className="nav-tools"><Button variant="text" asChild><Link to="/bag" aria-label={`Your bag, ${cart.items.reduce((sum,item) => sum+item.quantity,0)} items`}>Your bag <span className="cart-count">{cart.items.reduce((sum,item) => sum+item.quantity,0)}</span></Link></Button><Button className="menu-toggle" variant="text" size="icon" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div></div>{open && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{links}<Link to="/bag" onClick={() => setOpen(false)}>Your bag</Link></nav>}</header>
  {cart.storageError && <p className="container notice" role="status">Your browser could not save your bag. Keep this page open until you have copied your order.</p>}
  <main id="main">{children}</main>
   <footer className="site-footer"><div className="container"><div className="footer-brand"><Link to="/" className="wordmark" aria-label="KÍMBÀLÌ home"><KimbaliLogo className="h-12 w-12 text-foreground shrink-0" /><span>KÍMBÀLÌ</span></Link><p className="eyebrow muted mb-1">Made in Nigeria</p><p className="eyebrow muted">Custom Leather Bag Design Studio</p></div><div className="footer-links"><div><Link to="/archive">Archive</Link><Link to="/studio">About KÍMBÀLÌ</Link><PinterestLink/></div><div><Link to="/custom-order">Custom order</Link><Link to="/bag">Your bag</Link><a href={whatsappUrl('Hello KÍMBÀLÌ, I’d like to discuss a bag.') || undefined} target="_blank" rel="noopener noreferrer">Contact ↗</a></div></div><div className="footer-bottom"><span className="muted">© 2026 KÍMBÀLÌ</span><a href="#main">Back to top ↑</a></div></div></footer>
  <a href={whatsappUrl(cart.items.length ? generateOrder(cart.items) : 'Hello KÍMBÀLÌ, I’d like to discuss a bag.') || undefined} target="_blank" rel="noopener noreferrer" className="floating-chat" aria-label="Chat with KÍMBÀLÌ"><MessageCircle size={23}/></a></>;
}