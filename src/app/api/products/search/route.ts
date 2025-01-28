import { ProductServiceImpl } from '@/infra/services/impl/ProductServiceImpl';
import { ListProductsUseCase } from '@/infra/useCases/ListProductsUseCase';
import redis from '@/lib/redis';
import { NextRequest, NextResponse } from 'next/server';

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Retorna uma lista de produtos com filtros e paginação
 *     description: Endpoint para buscar uma lista de produtos com base no nome, paginação e ordenação.
 *     tags:
 *       - Produtos
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: Nome do produto a ser buscado (opcional)
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página (opcional, padrão é 1)
 *       - in: query
 *         name: pageSize
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Tamanho da página (opcional, padrão é 10)
 *       - in: query
 *         name: orderBy
 *         required: false
 *         schema:
 *           type: string
 *           enum: [name, price]
 *         description: Campo para ordenar os resultados (opcional)
 *       - in: query
 *         name: direction
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Direção da ordenação (opcional)
 *     responses:
 *       200:
 *         description: Lista de produtos com paginação
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       price:
 *                         type: number
 *                         format: float
 *                       stock:
 *                         type: integer
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *       500:
 *         description: Erro ao buscar os produtos
 */

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);

  const cacheKey = `products:search:${name}:page=${page}:pageSize=${pageSize}`;

  const cachedData = await redis.get(cacheKey);

  if (cachedData) {
    return NextResponse.json(JSON.parse(cachedData));
  }

  const productService = new ProductServiceImpl();
  const listProductsUseCase = new ListProductsUseCase(productService);

  try {
    const { products, total } = await listProductsUseCase.execute(
      page,
      pageSize,
      { field: 'name', direction: 'asc' },
      { name: { contains: name, mode: 'insensitive' } },
    );

    const responseData = {
      data: products,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };

    const expirationTime =
      process.env.NODE_ENV === 'development' ? 15 : 45 * 60;

    await redis.set(
      cacheKey,
      JSON.stringify(responseData),
      'EX',
      expirationTime,
    );

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : 'Failed to fetch products',
      },
      { status: 500 },
    );
  }
}
