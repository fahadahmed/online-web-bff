export function convertToSegment(customerSegment: string) {
  if (customerSegment === 'Business') {
    return 'business';
  }

  return 'personal';
}
