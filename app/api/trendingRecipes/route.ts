import { NextResponse } from 'next/server';
import prisma from '@/prisma/client'; // Import your Prisma client

export async function GET() {
  try {
    const trendingRecipes = await prisma.recipe.findMany({
      take: 6,
      orderBy: [
        { reviews: { _count: 'desc' } }, // Sort by number of reviews
        { createdAt: 'desc' }
      ],
      select: {
        id: true,
        title: true,
        image: true,
        cookingTime: true,
        servings: true,
        difficulty: true,
        reviews: { select: { rating: true } }
      }
    });

    return NextResponse.json(trendingRecipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Failed to fetch trending recipes' }, { status: 500 });
  }
}
