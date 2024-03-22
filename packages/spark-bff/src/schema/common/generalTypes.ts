import { objectType } from 'nexus';

export const LabelStringValuePair = objectType({
  name: 'LabelStringValuePair',
  definition(t) {
    t.string('label');
    t.string('value');
  },
});

export const LabelIntegerValuePair = objectType({
  name: 'LabelIntegerValuePair',
  definition(t) {
    t.string('label');
    t.int('value');
  },
});

export const LabelFloatValuePair = objectType({
  name: 'LabelFloatValuePair',
  definition(t) {
    t.string('label');
    t.float('value');
  },
});

export const KeyStringValuePair = objectType({
  name: 'KeyStingValuePair',
  definition(t) {
    t.string('key');
    t.string('value');
  },
});

export const KeyIntegerValuePair = objectType({
  name: 'KeyIntegerValuePair',
  definition(t) {
    t.string('key');
    t.int('value');
  },
});

export const KeyFloatValuePair = objectType({
  name: 'KeyFloatValuePair',
  definition(t) {
    t.string('key');
    t.float('value');
  },
});
