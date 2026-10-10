import siteData from './data.json';
import atelierEditorial from '@/assets/atelier-editorial.jpg';
import materialEditorial from '@/assets/material-editorial.jpg';
import toteStudy from '@/assets/tote-study.jpg';
import messengerStudy from '@/assets/messenger-study.jpg';
import leatherStudy from '@/assets/leather-study.jpg';

export interface VisualStudy {
  title: string;
  image: string;
  alt: string;
}

const images = [leatherStudy, atelierEditorial, toteStudy, messengerStudy];

export const editorial = {
  shoulder: leatherStudy,
  atelier: atelierEditorial,
  material: materialEditorial,
  tote: toteStudy,
  messenger: messengerStudy,
  leather: leatherStudy,
};

export const visualStudies: VisualStudy[] = siteData.visualStudies.map((item, index) => ({
  title: item.title,
  alt: item.alt,
  image: images[index] || leatherStudy,
}));
