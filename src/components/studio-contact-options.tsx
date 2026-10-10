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
      <DialogContent className="sm:max-w-md bg-background border border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-serif">Contact the Studio</DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            Choose how you would like to share your bag details or begin a conversation with our Nigerian studio.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 py-2">
          {waUrl && (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">WhatsApp</p>
                  <p className="text-xs text-muted-foreground">Direct messaging on {studio.whatsappNumber}</p>
                </div>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            </a>
          )}

          <a
            href={mailtoUrl}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">Email Studio</p>
                <p className="text-xs text-muted-foreground">{studio.email}</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>

          <a
            href={telUrl}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium text-sm">Phone Call</p>
                <p className="text-xs text-muted-foreground">{studio.phoneNumber}</p>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent hover:text-accent-foreground transition-colors text-left group w-full"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </div>
              <div>
                <p className="font-medium text-sm">Copy Details to Clipboard</p>
                <p className="text-xs text-muted-foreground">Paste into any messaging app or email</p>
              </div>
            </div>
            {copied ? (
              <span className="text-xs font-medium text-emerald-600">Copied!</span>
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            )}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
