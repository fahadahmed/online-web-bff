import { enumType } from 'nexus';

export const A2PShortcodeType = enumType({
  name: 'A2PShortcodeType',
  members: ['STANDARD', 'ZERO_RATED'],
  description: 'Shortcode type',
});
