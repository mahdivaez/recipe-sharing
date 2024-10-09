import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { MealType } from '@prisma/client';

export async function POST(request: NextRequest) {
  const body = await request.formData();

  try {
    // Parse ingredients from JSON string
    const ingredients = JSON.parse(body.get('ingredients') as string);

    const image = body.get('image');

    // Validate mealType
    const mealType = body.get('mealType') as string;
    if (!Object.values(MealType).includes(mealType as MealType)) {
      return NextResponse.json({ error: 'Invalid meal type' }, { status: 400 });
    }

    const newRecipe = await prisma.recipe.create({
      data: {
        title: body.get('title') as string,
        description: body.get('description') as string,
        instructions: body.get('instructions') as string,
        cookingTime: Number(body.get('cookingTime')),
        servings: Number(body.get('servings')),
        difficulty: body.get('difficulty') as string,
        mealType: mealType as MealType,
        image: image instanceof File ? image.name : null,
        ingredients: {
          create: ingredients.map((ingredient: any) => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
          })),
        },
      },
      include: {
        ingredients: true,
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json({ error: 'Error creating recipe' }, { status: 500 });
  }
}