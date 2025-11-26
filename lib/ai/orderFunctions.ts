import { FunctionDeclaration, SchemaType } from '@google/generative-ai';
import { OrderResponse, OrderRequest } from './types';

export const orderFunctionDeclarations: FunctionDeclaration[] = [
  {
    name: 'place_order',
    description: 'Places a food order for the customer with specified items and quantities',
    parameters: {
      type: SchemaType.OBJECT,
      properties: {
        items: {
          type: SchemaType.ARRAY,
          description: 'List of items to order',
          items: {
            type: SchemaType.OBJECT,
            properties: {
              name: {
                type: SchemaType.STRING,
                description: 'Name of the dish or item'
              },
              quantity: {
                type: SchemaType.NUMBER,
                description: 'Quantity of the item'
              },
              specialInstructions: {
                type: SchemaType.STRING,
                description: 'Any special instructions for this item (optional)'
              }
            },
            required: ['name', 'quantity']
          }
        },
        customerName: {
          type: SchemaType.STRING,
          description: 'Customer name (optional)'
        },
        deliveryAddress: {
          type: SchemaType.STRING,
          description: 'Delivery address (optional)'
        }
      },
      required: ['items']
    }
  }
];

export async function placeOrder(args: unknown): Promise<OrderResponse> {
  try {
    if (!args || typeof args !== 'object' || !('items' in args)) {
      return {
        success: false,
        error: 'Invalid order data'
      };
    }

    const { items, customerName, deliveryAddress } = args as OrderRequest;

    const orderNumber = `ORD-${Date.now()}`;

    console.log('Processing order:', {
      orderNumber,
      items,
      customerName,
      deliveryAddress,
      timestamp: new Date().toISOString()
    });

    return {
      success: true,
      orderNumber,
      items,
      customerName,
      deliveryAddress,
      estimatedTime: '30-45 minutes',
      message: 'Order placed successfully!'
    };
  } catch (error) {
    console.error('Error placing order:', error);
    return {
      success: false,
      error: 'Failed to place order. Please try again.'
    };
  }
}
