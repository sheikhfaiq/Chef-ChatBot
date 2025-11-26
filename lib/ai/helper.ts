import { OrderItem } from './types';


export function formatOrderItems(items: OrderItem[]): string {
  return items.map(item => {
    const instructions = item.specialInstructions
      ? ` (${item.specialInstructions})`
      : '';
    return `${item.quantity}x ${item.name}${instructions}`;
  }).join(', ');
}


export function calculateOrderTotal(items: OrderItem[]): number {

  return items.reduce((total, item) => total + (item.quantity * 10), 0);
}


export function validateOrder(items: OrderItem[]): { valid: boolean; error?: string } {
  if (!items || items.length === 0) {
    return { valid: false, error: 'Order must contain at least one item' };
  }

  for (const item of items) {
    if (!item.name || item.name.trim() === '') {
      return { valid: false, error: 'Item name is required' };
    }
    if (!item.quantity || item.quantity < 1) {
      return { valid: false, error: 'Item quantity must be at least 1' };
    }
  }

  return { valid: true };
}
