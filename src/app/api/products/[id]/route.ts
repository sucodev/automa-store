import { GetProductByIdUseCase } from '@/infra/useCases/GetProductByIdUseCase';
import { ProductServiceImpl } from '@/infra/services/impl/ProductServiceImpl';
import { NextRequest, NextResponse } from 'next/server';
import { DeleteProductUseCase } from '@/infra/useCases/DeleteProductUseCase';
import { UpdateProductUseCase } from '@/infra/useCases/UpdateProductUseCase';

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Retorna um produto pelo ID
 *     description: Endpoint para buscar um produto específico pelo ID.
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do produto
 *                 name:
 *                   type: string
 *                   description: Nome do produto
 *                 price:
 *                   type: number
 *                   format: float
 *                   description: Preço do produto
 *                 stock:
 *                   type: integer
 *                   description: Quantidade em estoque
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Data de criação do produto
 *       400:
 *         description: ID inválido fornecido
 *       404:
 *         description: Produto não encontrado
 */

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const productId = parseInt((await params).id);

  if (isNaN(productId)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  const productService = new ProductServiceImpl();

  const getProductByIdUseCase = new GetProductByIdUseCase(productService);

  try {
    const product = await getProductByIdUseCase.execute(productId);

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Product not found' },
      { status: 404 },
    );
  }
}

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Deleta um produto pelo ID
 *     description: Endpoint para deletar um produto específico pelo ID.
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       400:
 *         description: ID inválido fornecido
 *       404:
 *         description: Produto não encontrado
 *       500:
 *         description: Erro interno ao tentar deletar o produto
 */

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const productId = parseInt((await params).id);

  if (isNaN(productId)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  const productService = new ProductServiceImpl();

  const deleteProductUseCase = new DeleteProductUseCase(productService);

  try {
    await deleteProductUseCase.execute(productId);

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error(`Error delete product:`, error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'The product could not be deleted.',
      },
      { status: 400 },
    );
  }
}

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Atualiza um produto existente
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do produto a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       400:
 *         description: Erro ao atualizar o produto
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const productId = parseInt((await params).id);

  if (isNaN(productId)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 });
  }

  const body = await request.json();

  const productService = new ProductServiceImpl();
  const updateProductUseCase = new UpdateProductUseCase(productService);

  try {
    const updatedProduct = await updateProductUseCase.execute(productId, body);

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error(`Error updating product:`, error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'The product could not be updated.',
      },
      { status: 400 },
    );
  }
}
