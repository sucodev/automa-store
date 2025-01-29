import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cartStore';
import { CartItem } from './item';
import { ShoppingBagIcon } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { API } from '@/constants/api';

export const CartSidebar = () => {
  const { cart, resetCart } = useCartStore(state => state);

  let subtotal = 0;
  for (const item of cart) {
    subtotal += item.quantity * item.product.price;
  }

  const handleCheckout = async () => {
    const items = cart.map(item => ({
      productId: item.product.id,
      quantity: item.quantity,
    }));

    try {
      const response = await fetch(API.CHECKOUT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: 'Success!',
          description: data.message || 'Checkout completed successfully.',
        });
        resetCart();
      } else {
        toast({
          title: 'Error!',
          description: data.error || 'Something went wrong.',
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error!',
        description: 'Failed to connect to the server.',
      });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <li className="relative font-bold rounded-full min-h-10 px-2 flex items-center cursor-pointer ">
          <ShoppingBagIcon
            className="text-purple-200 flex items-center gap-2"
            size={24}
          />
          {cart.length > 0 && (
            <div className="absolute top-1 left-0 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              {cart.length}
            </div>
          )}
        </li>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Carrinho</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-5 my-3">
          {cart.map(item => (
            <CartItem key={item.product.id} item={item} />
          ))}
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-center text-xs">
          <div>Subtotal:</div>
          <div>R$ {subtotal.toFixed(2)}</div>
        </div>

        <Separator className="my-4" />

        <div className="text-center">
          <Button
            className="w-full bg-black hover:bg-black/50"
            disabled={cart.length === 0}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
