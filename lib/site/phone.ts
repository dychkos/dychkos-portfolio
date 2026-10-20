export const PHONE_RAW = '+380734042536';
export const EMAIL = 'dychkos@proton.me';

export type PhoneGroup = { text: string; egg?: string };

export const PHONE_GROUPS: PhoneGroup[] = [
  { text: '+380' },
  { text: '73' },
  { text: '404', egg: 'not found' },
  { text: '25', egg: '5²' },
  { text: '36', egg: '6²' },
];
