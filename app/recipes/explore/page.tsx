import { PrismaClient } from "@prisma/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, ChefHat, Utensils, Coffee, Sun } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const prisma = new PrismaClient();

type MealType = 'LUNCH' | 'DINNER' | 'BREAKFAST' 

const mealTypeColors: Record<MealType, string> = {
  BREAKFAST: 'bg-yellow-100',
  LUNCH: 'bg-blue-100',
  DINNER: 'bg-purple-100',
};

const mealTypeIcons: Record<MealType, React.ReactNode> = {
  BREAKFAST: <Coffee className="w-6 h-6" />,
  LUNCH: <Sun className="w-6 h-6" />,
  DINNER: <Utensils className="w-6 h-6" />,
};

export default async function RecipeList() {
  const recipes = await prisma.recipe.findMany({
  });

  return (
    <div className="container mt-20 mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Explore Culinary Masterpieces
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <Card 
            key={recipe.id} 
            className={`h-full flex flex-col transition-all duration-300 hover:shadow-xl ${mealTypeColors[recipe.mealType as MealType]}`}
          >
            <CardHeader className="relative">
              <div className="absolute top-2 right-2">
                {mealTypeIcons[recipe.mealType as MealType]}
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                {recipe.title}
              </CardTitle>
              <Badge variant="outline" className="mt-2">
                {recipe.mealType}
              </Badge>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-gray-600 mb-4 line-clamp-3 overflow-hidden text-ellipsis">
                {recipe.description}
              </p>
              <div className="grid grid-cols-3 gap-2 text-sm text-gray-500">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {recipe.cookingTime} mins
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {recipe.servings} servings
                </span>
                <span className="flex items-center">
                  <ChefHat className="w-4 h-4 mr-1" />
                  {recipe.difficulty}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between items-center border-t pt-4">
              <p className="text-sm text-gray-500">By Chef</p>
              <Link href={`/recipes/${recipe.id}`}>
                <Button variant="outline" size="sm">View Recipe</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      {recipes.length === 0 && (
        <p className="text-center text-gray-500 mt-8 text-xl">No recipes found. Be the first to add one!</p>
      )}

      <div className="mt-12 text-center">
        <Link href="/recipes/new">
          <Button size="lg" className="font-semibold">
            Create New Recipe
          </Button>
        </Link>
      </div>
    </div>
  );
}