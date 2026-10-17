import { useState } from 'react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowUpRight, Check, ChevronDown, Search, X } from 'lucide-react';
import { products } from '@/data/products';
import { editorial } from '@/data/visual-studies';
import { groupFor } from '@/data/pillars';
import { ProductArt } from '@/components/product-art';
import { Button } from '@/components/ui/button';
import { pageHead } from '@/lib/seo';
import { ArchiveCover } from '@/components/archive-cover';
export const Route = createFileRoute('/archive/')({head:() => pageHead('The Archive','Browse 22 KÍMBÀLÌ bag references. Choose a design and request your own material, colour and details.'),component:Archive});
function Archive() {
  const [category,setCategory] = useState('All'); const [search,setSearch] = useState('');
  const [filtersOpen,setFiltersOpen] = useState(false);
  const filtered = products.filter(product => (category === 'All' || groupFor(product.category) === category) && `${product.name} ${product.description} ${product.id}`.toLowerCase().includes(search.toLowerCase()));
  return <>
    <ArchiveCover title="The Archive" description="A shape to start with. A bag to make yours." image={editorial.material} alt="Conceptual leather texture study"/>
    <div className="container archive-browser">
      <div className="archive-controls reveal">
        <div className="archive-filter">
          <Button variant="text" className="archive-filter-trigger" aria-expanded={filtersOpen} aria-controls="archive-types" onClick={() => setFiltersOpen(!filtersOpen)}> {category === 'All' ? 'All shapes' : category}<ChevronDown aria-hidden="true"/></Button>
          {filtersOpen && <><Button variant="ghost" className="filter-dismiss" tabIndex={-1} aria-label="Close shape filter" onClick={() => setFiltersOpen(false)}/><div id="archive-types" className="archive-filter-menu" role="group" aria-label="Filter by bag type" onKeyDown={event => {if (event.key === 'Escape') setFiltersOpen(false);}}>{['All',...new Set(products.map(product => groupFor(product.category)))].map(value => <Button variant="ghost" key={value} aria-pressed={category === value} onClick={() => {setCategory(value);setFiltersOpen(false);}}>{value === 'All' ? 'All shapes' : value}{category === value && <Check aria-hidden="true"/>}</Button>)}</div></>}
        </div>
        <div className="archive-search"><Search size={18} aria-hidden="true"/><label htmlFor="archive-search" className="sr-only">Search the Archive</label><input id="archive-search" type="search" value={search} onChange={event => setSearch(event.target.value)} placeholder="Search designs"/>{search && <Button variant="text" size="icon" aria-label="Clear search" onClick={() => setSearch('')}><X/></Button>}</div>
      </div>
      <div className="archive-result-line"><p className="muted" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'design' : 'designs'}</p>{category !== 'All' || search ? <Button variant="text" onClick={() => {setSearch('');setCategory('All');}}>Reset filters <X/></Button> : <p className="muted">Catalogue photography pending</p>}</div>
      <div className="catalogue-grid archive-designs">{filtered.map(product => <article key={product.id} className="product-card reveal"><Link to="/archive/$slug" params={{slug:product.slug}} aria-label={`View ${product.name}`}><ProductArt product={product}/></Link><div className="archive-card-title"><div><p className="muted">{product.id}</p><h2><Link to="/archive/$slug" params={{slug:product.slug}}>{product.name}</Link></h2></div><Button variant="text" size="icon" asChild><Link to="/archive/$slug" params={{slug:product.slug}} aria-label={`Customize ${product.name}`}><ArrowUpRight/></Link></Button></div></article>)}</div>
      {!filtered.length && <div className="empty reveal"><h2>No designs found</h2><Button variant="frame" onClick={() => {setSearch('');setCategory('All');}}>Show all designs</Button></div>}
      <div className="archive-custom reveal"><h2>Something entirely yours?</h2><Button variant="studio" asChild><Link to="/custom-order">Custom order <ArrowUpRight/></Link></Button></div>
    </div>
  </>;
}