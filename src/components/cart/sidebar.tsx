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
import { mutate } from 'swr';
import { signIn, useSession } from 'next-auth/react';

export const CartSidebar = () => {
  const { data: session } = useSession();
  const { cart, resetCart } = useCartStore(state => state);

  let subtotal = 0;
  for (const item of cart) {
    subtotal += item.quantity * item.product.price;
  }

  const handleCheckout = async () => {
    if (!session || !session.user) {
      toast({
        description: (
          <span className="text-gray-700">
            To purchase this product, please{' '}
            <button
              className="text-purple-600 underline font-bold hover:text-purple-700 transition-colors"
              onClick={() => signIn('github')}
            >
              login with GitHub
            </button>
          </span>
        ),
        title: (
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-purple-600  font-bold">
              Authentication Required
            </span>
          </div>
        ) as // eslint-disable-next-line @typescript-eslint/no-explicit-any
        any,
      });
      return;
    }

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
        mutate(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (key: any) =>
            key.startsWith(API.PRODUCT) || key.startsWith(API.SEARCH),
          undefined,
          { revalidate: true },
        );

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
          {typeof window !== 'undefined' && cart.length > 0 && (
            <div className="absolute -top-1 -right-2 md:top-0 md:left-5 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
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
