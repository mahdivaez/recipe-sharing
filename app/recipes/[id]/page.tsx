import { notFound } from 'next/navigation'
import { MealType } from "@prisma/client"
import RecipeDetailsClient from "./RecipeDetailsClient"
import prisma from '@/prisma/client'

interface Props {
  params: {
    id: string
  }
}

export default async function DetailsRecipePage({ params }: Props) {
  const recipeId = parseInt(params.id, 10)

  if (isNaN(recipeId)) {
    notFound()
  }

  try {
    const recipe = await prisma.recipe.findUnique({
      where: { id: recipeId },
      include: {
        ingredients: true,
        steps: {
          orderBy: {
            order: 'asc'
          }
        },
        nutritionalInfo: true,
        winePairings: true,
        chefTips: true,
        reviews: true,
      },
    })

    if (!recipe) {
      notFound()
    }

    // Transform the data to match the expected format
    const transformedRecipe = {
      id: recipe.id,
      title: recipe.title,
      description: recipe.description,
      mealType: recipe.mealType,
      cookingTime: recipe.cookingTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty,
      ingredients: recipe.ingredients.map(ingredient => ({
        id: ingredient.id,
        name: ingredient.name,
        amount: ingredient.amount,
        unit: ingredient.unit,
      })),
      instructions: recipe.steps.map(step => step.instruction).join('\n'),
      nutritionalInfo: recipe.nutritionalInfo ? {
        calories: recipe.nutritionalInfo.calories,
        protein: recipe.nutritionalInfo.protein,
        carbs: recipe.nutritionalInfo.carbs,
        fat: recipe.nutritionalInfo.fat,
        fiber: recipe.nutritionalInfo.fiber,
      } : null,
      reviews: recipe.reviews.map(review => ({
        id: review.id,
        user: review.user,
        rating: review.rating,
        comment: review.comment,
      })),
      winePairings: recipe.winePairings.map(pairing => pairing.wineName),
      estimatedCost: recipe.estimatedCost,
      image: recipe.image,
      chefTips: recipe.chefTips.map(tip => tip.tip),
    }

    return <RecipeDetailsClient recipe={transformedRecipe} />
  } catch (error) {
    console.error('Error fetching recipe:', error)
    throw new Error('Failed to fetch recipe')
  }
}