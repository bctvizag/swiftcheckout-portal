import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Search, ShoppingCart, X } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  quantity: number;
}

const Sale = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();
  
  const products: Product[] = [
    { id: 1, name: "Product 1", price: 9.99 },
    { id: 2, name: "Product 2", price: 19.99 },
    { id: 3, name: "Product 3", price: 29.99 },
  ];

  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const completeSaleMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          total,
          status: 'Completed',
          items: cart,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to complete sale');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast.success('Sale completed successfully');
      setCart([]);
      navigate('/orders');
    },
    onError: () => {
      toast.error('Failed to complete sale');
    },
  });

  const handleCompleteSale = () => {
    if (cart.length === 0) {
      toast.error('Cart is empty');
      return;
    }
    completeSaleMutation.mutate();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input className="pl-10" placeholder="Search products..." />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Card
              key={product.id}
              className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => addToCart(product)}
            >
              <div className="text-lg font-semibold">{product.name}</div>
              <div className="text-2xl font-bold">${product.price}</div>
            </Card>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Current Sale</h2>
            <ShoppingCart className="h-6 w-6" />
          </div>

          <div className="space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-2 border-b"
              >
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-muted-foreground">
                    ${item.price} x {item.quantity}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="font-bold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <Button 
            className="w-full mt-6" 
            size="lg"
            onClick={handleCompleteSale}
            disabled={completeSaleMutation.isPending}
          >
            {completeSaleMutation.isPending ? 'Processing...' : 'Complete Sale'}
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Sale;