import { useState, type ReactNode } from 'react';
import { Link } from '@tanstack/react-router';
import { Menu, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/lib/cart';
import { PinterestLink } from './studio-links';
export function SiteShell({children}: {children:ReactNode}) {
  const [open,setOpen] = useState(false); const cart = useCart();
  const links = <><Link to="/archive" onClick={() => setOpen(false)}>The Archive</Link><Link to="/custom-order" onClick={() => setOpen(false)}>Custom Order</Link><Link to="/studio" onClick={() => setOpen(false)}>The Studio</Link></>;
  return <><a href="#main" className="skip-link">Skip to content</a><header className="site-nav"><div className="container nav-inner"><Link to="/" className="wordmark" aria-label="KÍMBÀLÌ home">KÍMBÀLÌ</Link><nav aria-label="Main navigation" className="nav-links">{links}</nav><div className="nav-tools"><Button variant="text" asChild><Link to="/bag" aria-label={`Your bag, ${cart.items.reduce((sum,item) => sum+item.quantity,0)} items`}>Your bag <span className="cart-count">{cart.items.reduce((sum,item) => sum+item.quantity,0)}</span></Link></Button><Button className="menu-toggle" variant="text" size="icon" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</Button></div></div>{open && <nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile navigation">{links}<Link to="/order" onClick={() => setOpen(false)}>Begin a conversation</Link></nav>}</header>
  {cart.storageError && <p className="container notice" role="status">Your browser could not save your bag. Keep this page open until you have copied your order.</p>}
  <main id="main">{children}</main>
  <footer className="site-footer"><div className="container"><div className="footer-brand"><Link to="/" className="wordmark">KÍMBÀLÌ</Link><p className="eyebrow muted mb-1">Made in Nigeria</p><p className="eyebrow muted">Custom Leather Bag Design Studio</p></div><div className="footer-links"><div><Link to="/archive">The Archive</Link><Link to="/studio">The Studio</Link><PinterestLink/></div><div><Link to="/custom-order">Made for your idea</Link><Link to="/bag">Your Bag</Link><Link to="/order">Begin a conversation ↗</Link></div></div><div className="footer-bottom"><span className="muted">© 2026 KÍMBÀLÌ</span><a href="#main">Back to top ↑</a></div></div></footer>
  <Link to="/order" className="floating-chat" aria-label="Prepare an order for WhatsApp"><MessageCircle size={23}/></Link></>;
}