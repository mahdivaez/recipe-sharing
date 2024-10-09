'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, ChefHat, Utensils, Coffee, Sun, Heart, Share2, Printer, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER';

const mealTypeIcons: Record<MealType, React.ReactNode> = {
  BREAKFAST: <Coffee className="w-6 h-6" />,
  LUNCH: <Sun className="w-6 h-6" />,
  DINNER: <Utensils className="w-6 h-6" />,
};

interface Ingredient {
  id: number;
  name: string;
  amount: string;
  unit: string;
}

interface Recipe {
  id: number;
  title: string;
  description: string;
  mealType: MealType | null;
  cookingTime: number;
  servings: number;
  difficulty: string;
  ingredients: Ingredient[];
  instructions: string;
  image: string | null;
}

interface Props {
  recipe: Recipe;
}

export default function RecipeDetailsClient({ recipe }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleLike = () => setIsLiked(!isLiked);

  const toggleStepCompletion = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(step => step !== index)
        : [...prev, index]
    );
  };

  const instructionSteps = recipe.instructions.split('\n').filter(step => step.trim() !== '');

  return (
    <div className="container mt-20 px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
            <p className="text-gray-600 mb-6">{recipe.description}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              {recipe.mealType && (
                <Badge variant="secondary" className="text-lg py-1 px-3">
                  {mealTypeIcons[recipe.mealType]}
                  <span className="ml-2">{recipe.mealType}</span>
                </Badge>
              )}
              <Badge variant="secondary" className="text-lg py-1 px-3">
                <Clock className="w-5 h-5 mr-2" />
                {recipe.cookingTime} mins
              </Badge>
              <Badge variant="secondary" className="text-lg py-1 px-3">
                <Users className="w-5 h-5 mr-2" />
                {recipe.servings} servings
              </Badge>
              <Badge variant="secondary" className="text-lg py-1 px-3">
                <ChefHat className="w-5 h-5 mr-2" />
                {recipe.difficulty}
              </Badge>
            </div>
            <div className="flex gap-4 mb-8">
              <Button onClick={handleLike} variant={isLiked ? "default" : "outline"}>
                <Heart className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button variant="outline">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
            </div>
          </div>
          <div className="md:w-1/3">
            {recipe.image && (
              <img src={recipe.image} alt={recipe.title} className="w-full h-auto rounded-lg shadow-lg mb-6" />
            )}
            <div className="bg-gray-100 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Recipe Rating</h2>
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-lg font-semibold">4.8</span>
              </div>
              <p className="text-gray-600">Based on 120 reviews</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="ingredients" className="mt-12">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions">Instructions</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients">
            <ul className="list-disc pl-5 space-y-2">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id} className="text-lg">
                  {ingredient.amount} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="instructions">
            <ol className="space-y-6">
              {instructionSteps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-primary text-primary-foreground rounded-full mr-4 font-bold">
                    {index + 1}
                  </span>
                  <div className="flex-grow">
                    <p className="text-lg">{step}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => toggleStepCompletion(index)}
                    >
                      {completedSteps.includes(index) ? "Completed" : "Mark as completed"}
                    </Button>
                  </div>
                </motion.li>
              ))}
            </ol>
            <Progress 
              value={(completedSteps.length / instructionSteps.length) * 100} 
              className="mt-8" 
            />
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}