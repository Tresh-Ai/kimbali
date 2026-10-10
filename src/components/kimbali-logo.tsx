import type { SVGProps } from 'react';

export function KimbaliLogo({ className = 'h-6 w-6', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      fill="currentColor"
      aria-hidden="true"
      className={className}
      {...props}
    >
      <rect x="275" y="180" width="27" height="600" />
      <rect x="326" y="180" width="27" height="600" />
      <path d="M378 180 V780 H405 V544 L451 611 L496 546 L646 780 H679 L499 497 L497 496 L450 560 L390 470 L453 378 L494 431 L667 180 H631 L493 382 L455 330 L405 397 V180 Z" />
      <path d="M701 180 L508 461 L708 780 H741 L540 461 L734 180 Z" />
      <path d="M452 422 L422 468 L451 514 L482 468 Z" />
    </svg>
  );
}
