import { useState } from 'react';
import { ArrowUpRight, Copy, Check, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui/dialog';
import { studio } from '@/data/studio';
import { generateOrder, whatsappUrl, type BagItem } from '@/lib/order';
import { KimbaliLogo } from '@/components/kimbali-logo';
import { toast } from 'sonner';

interface StudioContactOptionsProps {
  items?: BagItem[];
  customMessage?: string;
  triggerLabel?: string;
  variant?: 'clay' | 'studio' | 'frame' | 'default';
  className?: string;
}

export function StudioContactOptions({
  items,
  customMessage,
  triggerLabel = 'Talk to the studio',
  variant = 'clay',
  className = '',
}: StudioContactOptionsProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  const orderMessage =
    customMessage ||
    (items && items.length > 0
      ? generateOrder(items)
      : 'Hello KÍMBÀLÌ, I would like to enquire about a custom bag.');

  const waUrl = whatsappUrl(orderMessage);
  const emailSubject = encodeURIComponent('KÍMBÀLÌ Studio Order / Inquiry');
  const emailBody = encodeURIComponent(orderMessage);
  const mailtoUrl = `mailto:${studio.email}?subject=${emailSubject}&body=${emailBody}`;
  const telUrl = `tel:${studio.phoneNumber.replace(/[^0-9+]/g, '')}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopied(true);
      toast.success('Order details copied to clipboard!');
      setTimeout(() => setCopied(false), 2500);
    } catch {
      toast.error('Could not copy automatically. Please select and copy text.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={variant} className={className}>
          {triggerLabel} <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-background border border-border p-6 shadow-xl">
        <DialogHeader className="space-y-2 pb-2">
          <div className="flex items-center gap-2.5 text-foreground">
            <KimbaliLogo className="h-7 w-7 text-foreground shrink-0" />
            <span className="text-xs uppercase tracking-widest font-semibold text-muted-foreground">
              KÍMBÀLÌ Studio
            </span>
          </div>
          <DialogTitle className="text-2xl font-serif tracking-tight text-foreground">
            Talk to the studio
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            Choose how you would like to share your bag details or begin a conversation with our Nigerian studio.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2.5 pt-2">
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3.5 rounded-md border border-border/80 bg-card hover:bg-secondary/40 hover:border-foreground/30 transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-2 rounded bg-secondary text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium text-sm text-foreground">WhatsApp Direct</p>
                  <p className="text-xs text-muted-foreground">{studio.whatsappNumber}</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          )}

          <a
            href={mailtoUrl}
            className="flex items-center justify-between p-3.5 rounded-md border border-border/80 bg-card hover:bg-secondary/40 hover:border-foreground/30 transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 rounded bg-secondary text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">Email Studio</p>
                <p className="text-xs text-muted-foreground">{studio.email}</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>

          <a
            href={telUrl}
            className="flex items-center justify-between p-3.5 rounded-md border border-border/80 bg-card hover:bg-secondary/40 hover:border-foreground/30 transition-all group"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 rounded bg-secondary text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                <Phone className="h-4 w-4" />
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">Phone Call</p>
                <p className="text-xs text-muted-foreground">{studio.phoneNumber}</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-between p-3.5 rounded-md border border-border/80 bg-card hover:bg-secondary/40 hover:border-foreground/30 transition-all text-left group w-full"
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2 rounded bg-secondary text-foreground group-hover:bg-foreground group-hover:text-background transition-colors">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </div>
              <div>
                <p className="font-medium text-sm text-foreground">Copy Order Details</p>
                <p className="text-xs text-muted-foreground">Copy details to paste into any app</p>
              </div>
            </div>
            {copied ? (
              <span className="text-xs font-semibold tracking-wide uppercase text-foreground">Copied!</span>
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
