import { IBreeds, ILocation } from './cow.interface';

export const ICities: ILocation[] = [
  'Dhaka',
  'Chattogram',
  'Barishal',
  'Rajshahi',
  'Sylhet',
  'Comilla',
  'Rangpur',
  'Mymensingh',
];

export const ICattleBreeds: IBreeds[] = [
  'Brahman',
  'Nellore',
  'Sahiwal',
  'Gir',
  'Indigenous',
  'Tharparkar',
  'Kankrej',
];

export const ICowLebel = ['for sale', 'sold out'];

export const ICowCategory = ['Dairy', 'Beef', 'Dual Purpose'];

export const cowFilterableFields = ['searchTerm', 'location'];

export const cowSearchableFields = ['location', 'breed', 'category'];
