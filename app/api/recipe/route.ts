import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { MealType } from '@prisma/client';

export async function POST(request: NextRequest) {
  const body = await request.formData();

  try {
    // Parse JSON strings
    const ingredients = JSON.parse(body.get('ingredients') as string);
    const steps = JSON.parse(body.get('steps') as string);
    const nutritionalInfo = JSON.parse(body.get('nutritionalInfo') as string);
    const winePairings = JSON.parse(body.get('winePairings') as string);
    const chefTips = JSON.parse(body.get('chefTips') as string);

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
        cookingTime: Number(body.get('cookingTime')),
        servings: Number(body.get('servings')),
        difficulty: body.get('difficulty') as string,
        mealType: mealType as MealType,
        estimatedCost: parseFloat(body.get('estimatedCost') as string),
        image: image instanceof File ? image.name : null,
        ingredients: {
          create: ingredients.map((ingredient: any) => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
          })),
        },
        steps: {
          create: steps.map((step: any, index: number) => ({
            instruction: step.instruction,
            order: index + 1,
          })),
        },
        nutritionalInfo: {
          create: {
            calories: nutritionalInfo.calories,
            protein: nutritionalInfo.protein,
            carbs: nutritionalInfo.carbs,
            fat: nutritionalInfo.fat,
            fiber: nutritionalInfo.fiber,
          },
        },
        winePairings: {
          create: winePairings.map((pairing: string) => ({
            wineName: pairing,
          })),
        },
        chefTips: {
          create: chefTips.map((tip: string) => ({
            tip: tip,
          })),
        },
      },
      include: {
        ingredients: true,
        steps: true,
        nutritionalInfo: true,
        winePairings: true,
        chefTips: true,
      },
    });

    return NextResponse.json(newRecipe, { status: 201 });
  } catch (error) {
    console.error('Error creating recipe:', error);
    return NextResponse.json({ error: 'Error creating recipe' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: true,
        steps: true,
        nutritionalInfo: true,
        winePairings: true,
        chefTips: true,
        reviews: true,
      },
    });

    return NextResponse.json(recipes);
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return NextResponse.json({ error: 'Error fetching recipes' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const body = await request.formData();
  const id = Number(body.get('id'));

  try {
    // Parse JSON strings
    const ingredients = JSON.parse(body.get('ingredients') as string);
    const steps = JSON.parse(body.get('steps') as string);
    const nutritionalInfo = JSON.parse(body.get('nutritionalInfo') as string);
    const winePairings = JSON.parse(body.get('winePairings') as string);
    const chefTips = JSON.parse(body.get('chefTips') as string);

    const image = body.get('image');

    // Validate mealType
    const mealType = body.get('mealType') as string;
    if (!Object.values(MealType).includes(mealType as MealType)) {
      return NextResponse.json({ error: 'Invalid meal type' }, { status: 400 });
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        title: body.get('title') as string,
        description: body.get('description') as string,
        cookingTime: Number(body.get('cookingTime')),
        servings: Number(body.get('servings')),
        difficulty: body.get('difficulty') as string,
        mealType: mealType as MealType,
        estimatedCost: parseFloat(body.get('estimatedCost') as string),
        image: image instanceof File ? image.name : undefined,
        ingredients: {
          deleteMany: {},
          create: ingredients.map((ingredient: any) => ({
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
          })),
        },
        steps: {
          deleteMany: {},
          create: steps.map((step: any, index: number) => ({
            instruction: step.instruction,
            order: index + 1,
          })),
        },
        nutritionalInfo: {
          upsert: {
            create: {
              calories: nutritionalInfo.calories,
              protein: nutritionalInfo.protein,
              carbs: nutritionalInfo.carbs,
              fat: nutritionalInfo.fat,
              fiber: nutritionalInfo.fiber,
            },
            update: {
              calories: nutritionalInfo.calories,
              protein: nutritionalInfo.protein,
              carbs: nutritionalInfo.carbs,
              fat: nutritionalInfo.fat,
              fiber: nutritionalInfo.fiber,
            },
          },
        },
        winePairings: {
          deleteMany: {},
          create: winePairings.map((pairing: string) => ({
            wineName: pairing,
          })),
        },
        chefTips: {
          deleteMany: {},
          create: chefTips.map((tip: string) => ({
            tip: tip,
          })),
        },
      },
      include: {
        ingredients: true,
        steps: true,
        nutritionalInfo: true,
        winePairings: true,
        chefTips: true,
      },
    });

    return NextResponse.json(updatedRecipe);
  } catch (error) {
    console.error('Error updating recipe:', error);
    return NextResponse.json({ error: 'Error updating recipe' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get('id'));

  try {
    await prisma.recipe.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error('Error deleting recipe:', error);
    return NextResponse.json({ error: 'Error deleting recipe' }, { status: 500 });
  }
}