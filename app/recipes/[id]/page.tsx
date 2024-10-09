import { MealType } from ".prisma/client";
import RecipeDetailsClient from "./RecipeDetailsClient";

interface Props {
    params: {
      id: string;
    };
  }
  
  // Fake data for testing
  const fakeRecipe = {
    id: 1,
    title: "Mock Recipe Title",
    description: "This is a mock description for the recipe.",
    mealType: "DINNER" as MealType,  // Explicitly cast to MealType
    cookingTime: 45,
    servings: 4,
    difficulty: "Medium",
    ingredients: [
      { id: 1, name: "Sugar", amount: "100", unit: "g" },
      { id: 2, name: "Flour", amount: "200", unit: "g" },
      { id: 3, name: "Butter", amount: "50", unit: "g" },
    ],
    instructions: "Mix all ingredients and bake for 45 minutes.",
    nutritionalInfo: {
      calories: 350,
      protein: 10,
      carbs: 50,
      fat: 15,
      fiber: 5,
    },
    reviews: [
      { id: 1, user: "John Doe", rating: 5, comment: "Great recipe!" },
      { id: 2, user: "Jane Doe", rating: 4, comment: "Tastes good, but a bit too sweet." },
    ],
    winePairings: ["Red wine", "White wine"],
    estimatedCost: 15.5,
  };
  
  export default async function DetailsRecipePage({ params }: Props) {
    // Simulate the recipe coming from Prisma for testing
    return <RecipeDetailsClient recipe={fakeRecipe} />;
  }
  