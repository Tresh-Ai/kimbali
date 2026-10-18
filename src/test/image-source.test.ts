import { describe, expect, it } from 'vitest';
import { driveThumbnail } from '@/lib/image-source';
describe('Google Drive images', () => {
  it('converts share links to thumbnails', () => {
    expect(driveThumbnail('https://drive.google.com/file/d/1AbCdEfGhIjKlMn/view?usp=sharing')).toBe('https://drive.google.com/thumbnail?id=1AbCdEfGhIjKlMn&sz=w1600');
    expect(driveThumbnail('https://drive.google.com/open?id=1AbCdEfGhIjKlMn', 800)).toBe('https://drive.google.com/thumbnail?id=1AbCdEfGhIjKlMn&sz=w800');
  });
  it('leaves other URLs unchanged', () => {
    expect(driveThumbnail('https://example.com/a.jpg')).toBe('https://example.com/a.jpg');
  });
});
