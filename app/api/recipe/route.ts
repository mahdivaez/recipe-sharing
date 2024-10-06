import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function POST(request: NextRequest) {
  const body = await request.formData();

  try {
    // Assuming ingredients are sent as a JSON string
    const ingredients = JSON.parse(body.get('ingredients') as string);

    const image = body.get('image');

    const newRecipe = await prisma.recipe.create({
      data: {
        title: body.get('title') as string,
        description: body.get('description') as string,
        instructions: body.get('instructions') as string,
        cookingTime: Number(body.get('cookingTime')),
        servings: Number(body.get('servings')),
        difficulty: body.get('difficulty') as string,
        image: image instanceof File ? image.name : null, // Adjust as needed
        ingredients: {
          create: ingredients.map((ingredient: any) => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
          })),
        },
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json({ error: 'Error creating recipe' }, { status: 500 });
  }
}
