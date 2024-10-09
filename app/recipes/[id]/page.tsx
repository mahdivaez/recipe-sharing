import { PrismaClient } from "@prisma/client";
import RecipeDetailsClient from './RecipeDetailsClient';
import { notFound } from 'next/navigation';

const prisma = new PrismaClient();

interface Props {
  params: {
    id: string
  }
}

export default async function DetailsRecipePage({ params }: Props) {
  const recipeId = parseInt(params.id, 10);

  if (isNaN(recipeId)) {
    notFound();
  }

  const recipe = await prisma.recipe.findUnique({
    where: { id: recipeId },
    include: {
      ingredients: true,
    },
  });

  if (!recipe) {
    notFound();
  }

  return <RecipeDetailsClient recipe={recipe} />;
}