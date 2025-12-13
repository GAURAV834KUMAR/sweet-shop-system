import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SweetCard from './SweetCard';
import { Sweet } from '../types';

describe('SweetCard Component', () => {
  const mockSweet: Sweet = {
    id: '1',
    name: 'Chocolate Bar',
    category: 'Chocolate',
    price: 2.5,
    quantity: 10,
    description: 'Delicious chocolate bar',
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  };

  const mockOnPurchase = jest.fn();
  const mockOnViewDetails = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders sweet card with correct information', () => {
    render(
      <SweetCard 
        sweet={mockSweet} 
        onPurchase={mockOnPurchase}
        onViewDetails={mockOnViewDetails}
      />
    );

    expect(screen.getByText('Chocolate Bar')).toBeInTheDocument();
    expect(screen.getByText('Chocolate')).toBeInTheDocument();
    expect(screen.getByText('$2.50')).toBeInTheDocument();
  });

  test('calls onPurchase when Quick Buy button is clicked', () => {
    render(
      <SweetCard 
        sweet={mockSweet} 
        onPurchase={mockOnPurchase}
        onViewDetails={mockOnViewDetails}
      />
    );

    const quickBuyButton = screen.getByText(/Quick Buy/i);
    fireEvent.click(quickBuyButton);

    expect(mockOnPurchase).toHaveBeenCalledWith(mockSweet);
  });

  test('calls onViewDetails when View Details button is clicked', () => {
    render(
      <SweetCard 
        sweet={mockSweet} 
        onPurchase={mockOnPurchase}
        onViewDetails={mockOnViewDetails}
      />
    );

    const viewDetailsButton = screen.getByText(/View Details/i);
    fireEvent.click(viewDetailsButton);

    expect(mockOnViewDetails).toHaveBeenCalledWith(mockSweet);
  });

  test('disables purchase button when out of stock', () => {
    const outOfStockSweet = { ...mockSweet, quantity: 0 };
    
    render(
      <SweetCard 
        sweet={outOfStockSweet} 
        onPurchase={mockOnPurchase}
        onViewDetails={mockOnViewDetails}
      />
    );

    const purchaseButton = screen.getByRole('button', { name: /Out of Stock/i });
    expect(purchaseButton).toBeDisabled();
  });
});
