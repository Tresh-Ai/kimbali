import { createFileRoute, Link } from '@tanstack/react-router';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { pageHead } from '@/lib/seo';
import { useCart } from '@/lib/cart';
import { products } from '@/data/products';
import { ProductArt } from '@/components/product-art';
import { Button } from '@/components/ui/button';
import { StudioContactOptions } from '@/components/studio-contact-options';

export const Route = createFileRoute('/bag')({
  head: () => pageHead('Your Bag', 'Review and edit your KÍMBÀLÌ bag designs, custom colours and personal requests before preparing your order with our studio.'),
  component: Bag,
});

function Bag() {
  const cart = useCart();
  const count = cart.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="container page">
      <p className="eyebrow muted">Your selections / Made personal</p>
      <h1 className="page-title">
        Your bag<span className="text-primary">.</span>
      </h1>
      {!cart.ready ? (
        <p role="status">Opening your bag…</p>
      ) : !cart.items.length ? (
        <div className="empty">
          <h2>A starting point awaits.</h2>
          <p className="muted">Choose an archive design or bring an idea of your own.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Button variant="studio" asChild>
              <Link to="/archive">Explore the archive ↗</Link>
            </Button>
            <Button variant="frame" asChild>
              <Link to="/custom-order">Start a commission ↗</Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="cart-layout">
          <div>
            {cart.items.map(item => {
              const product = products.find(p => p.id === item.productId);
              return (
                <article className="cart-item" key={item.key}>
                  <div>
                    {product ? (
                      <ProductArt product={product} />
                    ) : item.referenceData ? (
                      <img src={item.referenceData} alt="Your custom bag reference" />
                    ) : (
                      <div className="product-art">
                        <span className="eyebrow muted">Your idea</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="eyebrow muted">{item.productId || 'Custom commission'}</p>
                    <h2>{item.name}</h2>
                    <div className="item-options">
                      <span>
                        Material: {item.material}
                        {item.otherMaterial && ` - ${item.otherMaterial}`}
                      </span>
                      <span>
                        Colour: {item.color}
                        {item.customColor && ` - ${item.customColor}`}
                      </span>
                      {item.hardware && <span>Hardware: {item.hardware}</span>}
                      {item.customization && <span>Customization: {item.customization}</span>}
                      {item.description && <span>Design: {item.description}</span>}
                      {item.notes && <span>Notes: {item.notes}</span>}
                    </div>
                    <div className="item-controls">
                      <div className="quantity">
                        <Button
                          variant="choice"
                          size="icon"
                          aria-label={`Decrease quantity for ${item.name}`}
                          disabled={item.quantity === 1}
                          onClick={() => cart.quantity(item.key, item.quantity - 1)}
                        >
                          <Minus size={14} />
                        </Button>
                        <span aria-label="Quantity">{item.quantity}</span>
                        <Button
                          variant="choice"
                          size="icon"
                          aria-label={`Increase quantity for ${item.name}`}
                          disabled={item.quantity === 99}
                          onClick={() => cart.quantity(item.key, item.quantity + 1)}
                        >
                          <Plus size={14} />
                        </Button>
                      </div>
                      {item.custom ? (
                        <Button variant="text" asChild>
                          <Link to="/custom-order" search={{ edit: item.key }}>
                            Edit
                          </Link>
                        </Button>
                      ) : (
                        item.productSlug && (
                          <Button variant="text" asChild>
                            <Link to="/archive/$slug" params={{ slug: item.productSlug }} search={{ edit: item.key }}>
                              Edit
                            </Link>
                          </Button>
                        )
                      )}
                      <Button
                        variant="text"
                        size="icon"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => cart.remove(item.key)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
            <div className="flex justify-between gap-4 mt-6">
              <Button variant="text" asChild>
                <Link to="/archive">← Continue browsing</Link>
              </Button>
              <Button
                variant="text"
                onClick={() => {
                  if (window.confirm('Clear all items from your bag?')) cart.clear();
                }}
              >
                Clear your bag
              </Button>
            </div>
          </div>
          <aside className="order-summary">
            <h2 className="text-3xl">Make it yours.</h2>
            <p>
              {count} {count === 1 ? 'bag' : 'bags'} / {cart.items.length} {cart.items.length === 1 ? 'design' : 'designs'}
            </p>
            <p className="muted">We’ll confirm your details and pricing together.</p>
            <StudioContactOptions items={cart.items} triggerLabel="Talk to the studio" variant="clay" className="w-full" />
          </aside>
        </div>
      )}
    </div>
  );
}
