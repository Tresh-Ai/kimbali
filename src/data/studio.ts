import siteData from './data.json';

export interface StudioInfo {
  name: string;
  tagline: string;
  whatsappNumber: string;
  phoneNumber: string;
  email: string;
  pinterestUrl: string;
}

export const studio: StudioInfo = siteData.studio;
export const materialRequests: string[] = siteData.options.materialRequests;
export const colorRequests: string[] = siteData.options.colorRequests;
export const bagTypes: string[] = siteData.options.bagTypes;
