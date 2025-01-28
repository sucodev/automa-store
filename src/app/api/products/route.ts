import { CreateProductUseCase } from '@/infra/useCases/CreateProductUseCase';
import { ListProductsUseCase } from '@/infra/useCases/ListProductsUseCase';
import { ProductServiceImpl } from '@/infra/services/impl/ProductServiceImpl';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Retorna a lista de produtos
 *     description: Endpoint para buscar a lista de produtos com suporte a paginação, ordenação e filtro.
 *     tags:
 *        - Produtos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página (inicia em 1).
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Quantidade de produtos por página.
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *           enum: [name, price, createdAt, updatedAt]
 *         description: Campo pelo qual os produtos serão ordenados.
 *       - in: query
 *         name: direction
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: Direção da ordenação (ascendente ou descendente).
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: Produto A
 *                   price:
 *                     type: number
 *                     example: 99.99
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-01-01T12:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-01-02T12:00:00Z"
 *       400:
 *         description: Erro nos parâmetros da requisição
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid query parameters"
 */

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const orderByField = searchParams.get('orderBy') || 'createdAt';
  const orderByDirection = searchParams.get('direction') || 'desc';

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filters: { [key: string]: any } = {};
  searchParams.forEach((value, key) => {
    if (
      key !== 'page' &&
      key !== 'pageSize' &&
      key !== 'orderBy' &&
      key !== 'direction'
    ) {
      filters[key] = value;
    }
  });

  const productService = new ProductServiceImpl();
  const listProductsUseCase = new ListProductsUseCase(productService);

  try {
    const { products, total } = await listProductsUseCase.execute(
      page,
      pageSize,
      {
        field: orderByField,
        direction: orderByDirection as 'asc' | 'desc',
      },
      filters,
    );

    return NextResponse.json({
      data: products,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch products',
      },
      { status: 400 },
    );
  }
}

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Cria um novo produto
 *     description: Endpoint para criar um novo produto com os dados fornecidos.
 *     tags:
 *       - Produtos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - price
 *               - stock
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do produto
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Preço do produto
 *               stock:
 *                 type: integer
 *                 description: Quantidade em estoque do produto
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: ID do produto recém-criado
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
 *         description: Dados inválidos
 *       404:
 *         description: Falha ao criar o produto
 *       500:
 *         description: Erro interno do servidor
 */

export async function POST(request: NextRequest) {
  const body = await request.json();

  const productService = new ProductServiceImpl();
  const createProductUseCase = new CreateProductUseCase(productService);

  try {
    const newProduct = await createProductUseCase.execute(body);

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error fetching product:', error);

    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to create product',
      },
      { status: 404 },
    );
  }
}
