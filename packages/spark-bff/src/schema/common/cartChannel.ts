import { enumType } from 'nexus';

const channelMembers = ['personalshop', 'personalss', 'businessshop'];

export const CartChannel = enumType({
  name: 'CartChannel',
  members: channelMembers,
  description: 'Channel to be used, defaults to personalshop',
});

export const Segment = enumType({
  name: 'Segment',
  members: ['personal', 'business'],
});
