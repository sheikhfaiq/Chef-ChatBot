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


export interface ChatMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
