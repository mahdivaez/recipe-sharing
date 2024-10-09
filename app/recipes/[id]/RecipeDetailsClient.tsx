'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, Users, ChefHat, Utensils, Coffee, Sun, Heart, Share2, Printer, AlertTriangle, ArrowRight, ChevronDown, ChevronUp, CheckCircle, Star, Wine, DollarSign, Calendar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import confetti from 'canvas-confetti';

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

interface NutritionalInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
}

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
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
  nutritionalInfo: NutritionalInfo;
  reviews: Review[];
  winePairings: string[];
  estimatedCost: number;
}

interface Props {
  recipe: Recipe;
}

export default function RecipeDetailsClient({ recipe }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [openStep, setOpenStep] = useState<number | null>(null);
  const [cookingTimer, setCookingTimer] = useState(recipe.cookingTime * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [servingMultiplier, setServingMultiplier] = useState(1);
  const [newReview, setNewReview] = useState({ rating: 0, comment: '' });
  const [isAddedToMealPlan, setIsAddedToMealPlan] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const toggleStepCompletion = (index: number) => {
    setCompletedSteps(prev => 
      prev.includes(index) 
        ? prev.filter(step => step !== index)
        : [...prev, index]
    );
    if (!completedSteps.includes(index)) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 }
      });
    }
  };

  const toggleStep = (index: number) => {
    setOpenStep(openStep === index ? null : index);
  };

  const instructionSteps = recipe.instructions.split('\n').filter(step => step.trim() !== '');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && cookingTimer > 0) {
      interval = setInterval(() => {
        setCookingTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (cookingTimer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, cookingTimer]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const adjustServings = (multiplier: number) => {
    setServingMultiplier(multiplier);
  };

  const handleAddReview = () => {
    // In a real application, this would send the review to the server
    console.log('New review:', newReview);
    setNewReview({ rating: 0, comment: '' });
  };

  const handleAddToMealPlan = () => {
    // In a real application, this would integrate with a meal planning system
    setIsAddedToMealPlan(true);
    setTimeout(() => setIsAddedToMealPlan(false), 3000);
  };

  return (
    <div className="container mt-20 mx-auto px-4 py-8 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-blue-100 to-purple-100">
          <CardContent className="p-6">
            <h1 className="text-4xl font-bold mb-4 text-primary">{recipe.title}</h1>
            <p className="text-gray-600 text-lg mb-6">{recipe.description}</p>
            <div className="flex flex-wrap gap-4 mb-6">
              {recipe.mealType && (
                <Badge variant="outline" className="text-lg py-2 px-4 bg-blue-200 text-blue-800">
                  {mealTypeIcons[recipe.mealType]}
                  <span className="ml-2">{recipe.mealType}</span>
                </Badge>
              )}
              <Badge variant="outline" className="text-lg py-2 px-4 bg-green-200 text-green-800">
                <Clock className="w-5 h-5 mr-2" />
                {recipe.cookingTime} mins
              </Badge>
              <Badge variant="outline" className="text-lg py-2 px-4 bg-yellow-200 text-yellow-800">
                <Users className="w-5 h-5 mr-2" />
                {recipe.servings} servings
              </Badge>
              <Badge variant="outline" className="text-lg py-2 px-4 bg-red-200 text-red-800">
                <ChefHat className="w-5 h-5 mr-2" />
                {recipe.difficulty}
              </Badge>
              <Badge variant="outline" className="text-lg py-2 px-4 bg-purple-200 text-purple-800">
                <DollarSign className="w-5 h-5 mr-2" />
                ${recipe.estimatedCost}
              </Badge>
            </div>
            <div className="flex gap-4">
              <Button onClick={handleLike} variant={isLiked ? "default" : "outline"} size="lg" className="flex-1 transition-all duration-300 ease-in-out transform hover:scale-105 bg-pink-500 hover:bg-pink-600 text-white">
                <Heart className={`mr-2 h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                {isLiked ? "Liked" : "Like"}
              </Button>
              <Button variant="outline" size="lg" className="flex-1 transition-all duration-300 ease-in-out transform hover:scale-105 bg-blue-500 hover:bg-blue-600 text-white">
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
              <Button variant="outline" size="lg" className="flex-1 transition-all duration-300 ease-in-out transform hover:scale-105 bg-green-500 hover:bg-green-600 text-white">
                <Printer className="mr-2 h-5 w-5" />
                Print
              </Button>
              <Button onClick={handleAddToMealPlan} variant="outline" size="lg" className="flex-1 transition-all duration-300 ease-in-out transform hover:scale-105 bg-orange-500 hover:bg-orange-600 text-white">
                <Calendar className="mr-2 h-5 w-5" />
                {isAddedToMealPlan ? "Added!" : "Add to Meal Plan"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-yellow-100 to-orange-100">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Cooking Timer</h2>
            <div className="text-4xl font-bold mb-4">{formatTime(cookingTimer)}</div>
            <div className="flex gap-4">
              <Button onClick={() => setIsTimerRunning(!isTimerRunning)} variant="outline" size="lg" className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                {isTimerRunning ? 'Pause' : 'Start'} Timer
              </Button>
              <Button onClick={() => setCookingTimer(recipe.cookingTime * 60)} variant="outline" size="lg" className="flex-1 bg-red-500 hover:bg-red-600 text-white">
                Reset Timer
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-green-100 to-teal-100">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Adjust Servings</h2>
            <div className="flex gap-4">
              <Button onClick={() => adjustServings(0.5)} variant="outline" size="lg" className="flex-1 bg-teal-500 hover:bg-teal-600 text-white">
                Half
              </Button>
              <Button onClick={() => adjustServings(1)} variant="outline" size="lg" className="flex-1 bg-green-500 hover:bg-green-600 text-white">
                Original
              </Button>
              <Button onClick={() => adjustServings(2)} variant="outline" size="lg" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">
                Double
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-red-100 to-pink-100">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Nutritional Information</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="text-lg font-semibold">{recipe.nutritionalInfo.calories * servingMultiplier}</p>
                <p className="text-sm text-gray-600">Calories</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="text-lg font-semibold">{(recipe.nutritionalInfo.protein * servingMultiplier).toFixed(1)}g</p>
                <p className="text-sm text-gray-600">Protein</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="text-lg font-semibold">{(recipe.nutritionalInfo.carbs * servingMultiplier).toFixed(1)}g</p>
                <p className="text-sm text-gray-600">Carbs</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="text-lg font-semibold">{(recipe.nutritionalInfo.fat * servingMultiplier).toFixed(1)}g</p>
                <p className="text-sm text-gray-600">Fat</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md text-center">
                <p className="text-lg font-semibold">{(recipe.nutritionalInfo.fiber * servingMultiplier).toFixed(1)}g</p>
                <p className="text-sm text-gray-600">Fiber</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="ingredients" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="ingredients" className="text-lg py-3 bg-purple-200 text-purple-800">Ingredients</TabsTrigger>
            <TabsTrigger value="instructions" className="text-lg py-3 bg-indigo-200 text-indigo-800">Instructions</TabsTrigger>
          </TabsList>
          <TabsContent value="ingredients">
            <Card className="bg-gradient-to-r from-purple-100 to-pink-100">
              <CardContent className="p-6">
                <ul className="space-y-4">
                  {recipe.ingredients.map((ingredient) => (
                    <motion.li 
                      key={ingredient.id} 
                      className="flex items-center text-lg bg-white p-3 rounded-lg shadow-md"
                      whileHover={{ scale: 1.02, rotate: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                        {ingredient.id}
                      </span>
                      <span className="font-medium">{(parseFloat(ingredient.amount) * servingMultiplier).toFixed(2)} {ingredient.unit}</span>
                      <span className="ml-2">{ingredient.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="instructions">
            <Card className="bg-gradient-to-r from-indigo-100 to-blue-100">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {instructionSteps.map((step, index) => (
                    <motion.div 
                      key={index} 
                      className="border  border-gray-200 rounded-lg overflow-hidden shadow-md"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <button
                        onClick={() => toggleStep(index)}
                        className="w-full flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors duration-200"
                      >
                        <span className="flex items-center text-lg font-medium">
                          <span className="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                            {index + 1}
                          </span>
                          Step {index + 1}
                        </span>
                        {openStep === index ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </button>
                      <AnimatePresence>
                        {openStep === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="p-4 bg-white"
                          >
                            <p className="text-lg mb-4">{step}</p>
                            <Button
                              variant={completedSteps.includes(index) ? "default" : "outline"}
                              size="sm"
                              onClick={() => toggleStepCompletion(index)}
                              className="mt-2 transition-all duration-300 ease-in-out transform hover:scale-105 bg-green-500 hover:bg-green-600 text-white"
                            >
                              <AnimatePresence>
                                {completedSteps.includes(index) && (
                                  <motion.span
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    exit={{ scale: 0 }}
                                    className="mr-2"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </motion.span>
                                )}
                              </AnimatePresence>
                              {completedSteps.includes(index) ? "Completed" : "Mark as completed"}
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
                <Progress 
                  value={(completedSteps.length / instructionSteps.length) * 100} 
                  className="mt-8" 
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-purple-100 to-indigo-100">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Wine className="mr-2 h-6 w-6 text-purple-500" />
              Wine Pairing Suggestions
            </h2>
            <ul className="space-y-2">
              {recipe.winePairings.map((wine, index) => (
                <li key={index} className="flex items-center bg-white p-3 rounded-lg shadow-md">
                  <span className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center mr-4 font-bold">
                    {index + 1}
                  </span>
                  {wine}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-yellow-100 to-amber-100">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4">User Reviews and Ratings</h2>
            <div className="space-y-4">
              {recipe.reviews.map((review) => (
                <div key={review.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="font-semibold">{review.user}</span>
                  </div>
                  <p>{review.comment}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Add Your Review</h3>
              <div className="flex mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 cursor-pointer ${i < newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
                  />
                ))}
              </div>
              <Textarea
                placeholder="Write your review here..."
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="mb-2"
              />
              <Button onClick={handleAddReview} className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                Submit Review
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8 overflow-hidden bg-gradient-to-r from-red-100 to-yellow-100">
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-6 w-6 text-red-500" />
              Chef's Tips
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center bg-white p-3 rounded-lg shadow-md">
                <ArrowRight className="mr-2 h-5 w-5 text-red-500" />
                Prepare all ingredients before starting to cook for a smoother process.
              </li>
              <li className="flex items-center bg-white p-3 rounded-lg shadow-md">
                <ArrowRight className="mr-2 h-5 w-5 text-red-500" />
                Adjust seasoning to your taste preferences.
              </li>
              <li className="flex items-center bg-white p-3 rounded-lg shadow-md">
                <ArrowRight className="mr-2 h-5 w-5 text-red-500" />
                Don't forget to let the dish rest before serving for optimal flavor.
              </li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}