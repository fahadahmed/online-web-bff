const fs = require('fs');

const filePath = process.argv[2];
const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
const { id: journeyId, fields } = content;

// eslint-disable-next-line no-console
console.log(`

Content for email

`);

// eslint-disable-next-line no-console
console.log(`Journey ID/fragment path: ${journeyId}`);

function Row(fieldKey, fieldValue, fieldUrl) {
  this.key = fieldKey;
  this.value = fieldValue;
  this.url = fieldUrl;
}

const rows = fields.map(({ fieldKey, fieldValue, fieldUrl = '' }) => {
  return new Row(fieldKey, fieldValue, fieldUrl);
});

// eslint-disable-next-line no-console
console.table(rows);

// eslint-disable-next-line no-console
console.log(`

 Content for default UI

`);

const defaultValues = fields.reduce(
  (accumulatedDefaultValues, { fieldKey, fieldValue, fieldUrl = '' }) => {
    return {
      ...accumulatedDefaultValues,
      [fieldKey]: {
        value: fieldValue,
        url: fieldUrl,
      },
    };
  },
  {},
);

// eslint-disable-next-line no-console
console.log(defaultValues);
