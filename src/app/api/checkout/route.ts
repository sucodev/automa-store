import { CheckoutUseCase } from '@/infra/useCases/CheckoutUseCase';
import { ProductServiceImpl } from '@/infra/services/impl/ProductServiceImpl';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/**
 * @swagger
 * /api/checkout:
 *   post:
 *     summary: Finaliza o processo de checkout com os itens do carrinho
 *     description: Endpoint para realizar o checkout, onde os itens são passados no corpo da requisição para finalizar a compra.
 *     tags:
 *       - Checkout
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     productId:
 *                       type: integer
 *                       description: ID do produto
 *                     quantity:
 *                       type: integer
 *                       description: Quantidade do produto no carrinho
 *     responses:
 *       200:
 *         description: Checkout concluído com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Checkout completed successfully'
 *       400:
 *         description: Erro no processo de checkout ou corpo da requisição inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: 'Invalid request body'
 */

export async function POST(request: NextRequest) {
  const body = await request.json();

  if (!Array.isArray(body.items)) {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 },
    );
  }

  const productService = new ProductServiceImpl();
  const checkoutUseCase = new CheckoutUseCase(productService);

  try {
    await checkoutUseCase.execute(body.items);

    revalidateTag('products');
    revalidateTag('cart');

    return NextResponse.json(
      { message: 'Checkout completed successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 400 },
    );
  }
}
