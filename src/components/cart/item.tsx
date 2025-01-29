import { Cart } from '@/store/cartStore';
import { CartItemQuantity } from './item-quantity';

type Props = {
  item: Cart;
};

export const CartItem = ({ item }: Props) => {
  return (
    <div className="flex items-center gap-5">
      <div className="flex-1">
        <p className="text-md">{item.product.name}</p>
        <p className="text-xs opacity-50">R$ {item.product.price.toFixed(2)}</p>
      </div>
      <div>
        <CartItemQuantity cartItem={item} />
      </div>
    </div>
  );
};
