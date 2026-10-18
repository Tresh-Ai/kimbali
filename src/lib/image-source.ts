import atelierEditorial from '@/assets/atelier-editorial.jpg';
import materialEditorial from '@/assets/material-editorial.jpg';
import toteStudy from '@/assets/tote-study.jpg';
import messengerStudy from '@/assets/messenger-study.jpg';
import leatherStudy from '@/assets/leather-study.jpg';
import weekender from '@/assets/complimentary-weekender.jpg';
import office from '@/assets/complimentary-office.jpg';
import evening from '@/assets/complimentary-evening.jpg';
import gift from '@/assets/complimentary-gift.jpg';

const assetMap: Record<string, string> = {
  '@/assets/atelier-editorial.jpg': atelierEditorial,
  '@/assets/material-editorial.jpg': materialEditorial,
  '@/assets/tote-study.jpg': toteStudy,
  '@/assets/messenger-study.jpg': messengerStudy,
  '@/assets/leather-study.jpg': leatherStudy,
  '@/assets/complimentary-weekender.jpg': weekender,
  '@/assets/complimentary-office.jpg': office,
  '@/assets/complimentary-evening.jpg': evening,
  '@/assets/complimentary-gift.jpg': gift,
};

/** Extracts the file id from any common Google Drive link format. */
export function googleDriveId(url: string): string | null {
  if (!/(drive|docs)\.google\.com|googleusercontent\.com/.test(url)) return null;
  const match = url.match(/\/d\/([\w-]{10,})/) ?? url.match(/[?&]id=([\w-]{10,})/);
  return match?.[1] ?? null;
}

/** Converts a Google Drive share link into a displayable thumbnail URL. */
export function driveThumbnail(url: string, width = 1600): string {
  const id = googleDriveId(url);
  return id ? `https://drive.google.com/thumbnail?id=${id}&sz=w${width}` : url;
}

/** Resolves an image entry from the JSON files: asset key, Drive link or direct URL. */
export function resolveImage(src: string | null | undefined, width = 1600): string | null {
  const value = src?.trim();
  if (!value) return null;
  if (value.startsWith('@/assets/')) return assetMap[value] ?? null;
  return driveThumbnail(value, width);
}
