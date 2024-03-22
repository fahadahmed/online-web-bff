import { enumType } from 'nexus';

export const A2PShortcodeStatus = enumType({
  name: 'A2PShortcodeStatus',
  members: ['PENDING', 'ACTIVE', 'SUSPENDED', 'INACTIVE'],
  description: 'Shortcode status',
});
