export interface OrderItem {
  name: string;
  quantity: number;
  specialInstructions?: string;
}

export interface OrderRequest {
  items: OrderItem[];
  customerName?: string;
  deliveryAddress?: string;
}

export interface OrderResponse {
  success: boolean;
  orderNumber?: string;
  items?: OrderItem[];
  customerName?: string;
  deliveryAddress?: string;
  estimatedTime?: string;
  message?: string;
  error?: string;
}
