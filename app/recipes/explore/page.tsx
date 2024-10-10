'use client'

import { useState, useEffect } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, ChefHat, Utensils, Coffee, Sun, DollarSign, Star, Search, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import confetti from 'canvas-confetti';

type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER'

const mealTypeColors: Record<MealType, string> = {
  BREAKFAST: 'from-yellow-200 to-orange-200',
  LUNCH: 'from-blue-200 to-cyan-200',
  DINNER: 'from-purple-200 to-pink-200',
};

const mealTypeIcons: Record<MealType, React.ReactNode> = {
  BREAKFAST: <Coffee className="w-6 h-6" />,
  LUNCH: <Sun className="w-6 h-6" />,
  DINNER: <Utensils className="w-6 h-6" />,
};

type Recipe = {
  id: number;
  title: string;
  description: string;
  mealType: MealType;
  cookingTime: number;
  servings: number;
  difficulty: string;
  estimatedCost: number;
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
  };
  reviews: { rating: number }[];
  chefTips: string[];
};

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [mealTypeFilter, setMealTypeFilter] = useState<MealType | 'ALL'>('ALL');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('ALL');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch('/api/recipe');
        if (!response.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await response.json();
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
        // Handle error (e.g., show error message to user)
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter(recipe => 
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (mealTypeFilter === 'ALL' || recipe.mealType === mealTypeFilter) &&
      (difficultyFilter === 'ALL' || recipe.difficulty === difficultyFilter)
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, mealTypeFilter, difficultyFilter, recipes]);

  const handleLike = (id: number) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="container mt-20 mx-auto py-8">
      <motion.h1 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-8 text-center text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500"
      >
        Explore Culinary Masterpieces
      </motion.h1>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-center"
      >
        <div className="relative w-full md:w-1/3">
          <Input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <Select value={mealTypeFilter} onValueChange={(value) => setMealTypeFilter(value as MealType | 'ALL')}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by meal" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Meals</SelectItem>
            <SelectItem value="BREAKFAST">Breakfast</SelectItem>
            <SelectItem value="LUNCH">Lunch</SelectItem>
            <SelectItem value="DINNER">Dinner</SelectItem>
          </SelectContent>
        </Select>
        <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </motion.div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRecipes.map((recipe) => {
              const avgRating = recipe.reviews.length > 0
                ? recipe.reviews.reduce((sum, review) => sum + review.rating, 0) / recipe.reviews.length
                : 0;

              return (
                <motion.div
                  key={recipe.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <Card className={`h-full flex flex-col overflow-hidden`}>
                    <CardHeader className={`relative bg-gradient-to-r ${mealTypeColors[recipe.mealType]} p-6`}>
                      <div className="absolute top-2 right-2 bg-white rounded-full p-2">
                        {mealTypeIcons[recipe.mealType]}
                      </div>
                      <CardTitle className="text-2xl font-bold text-gray-800">
                        {recipe.title}
                      </CardTitle>
                      <Badge variant="outline" className="mt-2 bg-white bg-opacity-50">
                        {recipe.mealType}
                      </Badge>
                    </CardHeader>
                    <CardContent className="flex-grow p-6">
                      <p className="text-gray-600 mb-4 line-clamp-3 overflow-hidden text-ellipsis">
                        {recipe.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500 mb-4">
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
                        <span className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          ${recipe.estimatedCost.toFixed(2)}
                        </span>
                      </div>
                      {recipe.nutritionalInfo && (
                        <div className="bg-white p-2 rounded-md shadow-sm mb-4">
                          <h3 className="text-sm font-semibold mb-1">Nutrition (per serving):</h3>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <span>Calories: {recipe.nutritionalInfo.calories}</span>
                            <span>Protein: {recipe.nutritionalInfo.protein}g</span>
                            <span>Carbs: {recipe.nutritionalInfo.carbs}g</span>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-sm text-gray-600">
                            {avgRating.toFixed(1)} ({recipe.reviews.length} reviews)
                          </span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleLike(recipe.id)}
                          className="transition-colors duration-300 hover:bg-pink-100 hover:text-pink-600"
                        >
                          Like
                        </Button>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center border-t pt-4">
                      <p className="text-sm text-gray-500">
                        {recipe.chefTips && recipe.chefTips.length > 0 ? `${recipe.chefTips.length} Chef Tips` : 'No Chef Tips'}
                      </p>
                      <Link href={`/recipes/${recipe.id}`}>
                        <Button variant="outline" size="sm" className="transition-colors duration-300 hover:bg-purple-100 hover:text-purple-600">
                          View Recipe
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}

      {filteredRecipes.length === 0 && !isLoading && (
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center text-gray-500 mt-8 text-xl"
        >
          No recipes found. Try adjusting your filters or be the first to add one!
        </motion.p>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-12 text-center"
      >
        <Link href="/recipes/new">
          <Button size="lg" className="font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white transition-all duration-300 hover:from-purple-600 hover:to-pink-600 hover:shadow-lg">
            Create New Recipe
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}