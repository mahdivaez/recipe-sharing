"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2, ChefHat, ArrowDown, ArrowUp } from "lucide-react"
import { useRouter } from 'next/navigation'

type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER'

type Ingredient = {
  name: string
  amount: string
  unit: string
}

type Step = {
  instruction: string
}

type NutritionalInfo = {
  calories: number
  protein: number
  carbs: number
  fat: number
  fiber: number
}

type Recipe = {
  title: string
  description: string
  mealType: MealType | ''
  cookingTime: number
  servings: number
  difficulty: string
  ingredients: Ingredient[]
  steps: Step[]
  nutritionalInfo: NutritionalInfo
  winePairings: string[]
  estimatedCost: number
  image: File | null
  chefTips: string[]
}

export default function CreateRecipeForm() {
  const router = useRouter()
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    description: "",
    mealType: "",
    cookingTime: 0,
    servings: 1,
    difficulty: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    steps: [{ instruction: "" }],
    nutritionalInfo: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0, 
      fiber: 0
    },
    winePairings: [""],
    estimatedCost: 0,
    image: null,
    chefTips: [""]
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRecipe(prev => ({ ...prev, [name]: value }))
  }

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const updatedIngredients = recipe.ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value }
      }
      return ingredient
    })
    setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }))
  }

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", amount: "", unit: "" }]
    }))
  }

  const removeIngredient = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }))
  }

  const handleStepChange = (index: number, value: string) => {
    const updatedSteps = recipe.steps.map((step, i) => {
      if (i === index) {
        return { ...step, instruction: value }
      }
      return step
    })
    setRecipe(prev => ({ ...prev, steps: updatedSteps }))
  }

  const addStep = () => {
    setRecipe(prev => ({
      ...prev,
      steps: [...prev.steps, { instruction: "" }]
    }))
  }

  const removeStep = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index)
    }))
  }

  const moveStep = (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1
    if (newIndex < 0 || newIndex >= recipe.steps.length) return
    const updatedSteps = [...recipe.steps]
    const [movedStep] = updatedSteps.splice(index, 1)
    updatedSteps.splice(newIndex, 0, movedStep)
    setRecipe(prev => ({ ...prev, steps: updatedSteps }))
  }

  const handleNutritionalInfoChange = (field: keyof NutritionalInfo, value: string) => {
    setRecipe(prev => ({
      ...prev,
      nutritionalInfo: { ...prev.nutritionalInfo, [field]: parseFloat(value) || 0 }
    }))
  }

  const handleWinePairingChange = (index: number, value: string) => {
    const updatedWinePairings = recipe.winePairings.map((pairing, i) => {
      if (i === index) {
        return value
      }
      return pairing
    })
    setRecipe(prev => ({ ...prev, winePairings: updatedWinePairings }))
  }

  const addWinePairing = () => {
    setRecipe(prev => ({
      ...prev,
      winePairings: [...prev.winePairings, ""]
    }))
  }

  const removeWinePairing = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      winePairings: prev.winePairings.filter((_, i) => i !== index)
    }))
  }

  const handleChefTipChange = (index: number, value: string) => {
    const updatedChefTips = recipe.chefTips.map((tip, i) => {
      if (i === index) {
        return value
      }
      return tip
    })
    setRecipe(prev => ({ ...prev, chefTips: updatedChefTips }))
  }

  const addChefTip = () => {
    setRecipe(prev => ({
      ...prev,
      chefTips: [...prev.chefTips, ""]
    }))
  }

  const removeChefTip = (index: number) => {
    setRecipe(prev => ({
      ...prev,
      chefTips: prev.chefTips.filter((_, i) => i !== index)
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setRecipe(prev => ({ ...prev, image: file }))
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    // Append simple fields
    formData.append('title', recipe.title);
    formData.append('description', recipe.description);
    formData.append('cookingTime', recipe.cookingTime.toString());
    formData.append('servings', recipe.servings.toString());
    formData.append('difficulty', recipe.difficulty);
    formData.append('mealType', recipe.mealType);
    formData.append('estimatedCost', recipe.estimatedCost.toString());

    // Convert complex objects to JSON and append
    formData.append('ingredients', JSON.stringify(recipe.ingredients));
    formData.append('steps', JSON.stringify(recipe.steps));
    formData.append('nutritionalInfo', JSON.stringify(recipe.nutritionalInfo));
    formData.append('winePairings', JSON.stringify(recipe.winePairings));
    formData.append('chefTips', JSON.stringify(recipe.chefTips));

    // Append image if it exists
    if (recipe.image) {
      formData.append('image', recipe.image);
    }

    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Recipe created successfully:', result);
        router.push('/recipes/explore'); // Navigate to recipes/explore after success
      } else {
        const errorData = await response.json();
        console.error('Failed to create recipe:', errorData);
        alert('There was an error submitting your recipe. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the recipe:', error);
      alert('There was a network error. Please check your connection and try again.');
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mt-10 mx-auto py-8"
    >
      <Card className="w-full max-w-4xl mx-auto overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          <CardTitle className="text-3xl font-bold flex items-center justify-center">
            <ChefHat className="mr-2" /> Create Your Recipe
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Recipe Title</Label>
              <Input
                id="title"
                name="title"
                value={recipe.title}
                onChange={handleInputChange}
                required
                placeholder="Enter your recipe's name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={recipe.description}
                onChange={handleInputChange}
                placeholder="Describe your culinary creation"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="mealType">Meal Type</Label>
              <Select
                value={recipe.mealType}
                onValueChange={(value) => setRecipe(prev => ({ ...prev, mealType: value as MealType }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BREAKFAST">Breakfast</SelectItem>
                  <SelectItem value="LUNCH">Lunch</SelectItem>
                  <SelectItem value="DINNER">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="cookingTime">Cooking Time (minutes)</Label>
              <Input
                id="cookingTime"
                name="cookingTime"
                type="number"
                value={recipe.cookingTime}
                onChange={handleInputChange}
                required
                min={0}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="servings">Servings</Label>
              <Input
                id="servings"
                name="servings"
                type="number"
                value={recipe.servings}
                onChange={handleInputChange}
                required
                min={1}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={recipe.difficulty}
                onValueChange={(value) => setRecipe(prev => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Ingredients</Label>
              {recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                    placeholder="Ingredient name"
                    className="flex-grow"
                  />
                  <Input
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                    placeholder="Amount"
                    className="w-20"
                  />
                  <Select
                    value={ingredient.unit}
                    onValueChange={(value) => handleIngredientChange(index, "unit", value)}
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="g">grams</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="cups">cups</SelectItem>
                      <SelectItem value="tbsp">tablespoons</SelectItem>
                      <SelectItem value="tsp">teaspoons</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={() => removeIngredient(index)} variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addIngredient} variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Ingredient
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Instructions</Label>
              {recipe.steps.map((step, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <span className="font-semibold">{index + 1}.</span>
                  <Textarea
                    value={step.instruction}
                    onChange={(e) => handleStepChange(index, e.target.value)}
                    placeholder={`Step ${index + 1}`}
                    className="flex-grow"
                  />
                  <div className="flex flex-col">
                    <Button type="button" onClick={() => moveStep(index, 'up')} variant="outline" size="icon" className="mb-1">
                      <ArrowUp className="h-4 w-4" />
                    </Button>
                    <Button type="button" onClick={() => moveStep(index, 'down')} variant="outline" size="icon">
                      <ArrowDown className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button type="button" onClick={() => removeStep(index)} variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addStep} variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Step
              </Button>
            </div>

            <div className="space-y-2">
              <Label>Nutritional Information</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Calories"
                  type="number"
                  value={recipe.nutritionalInfo.calories}
                  onChange={(e) => handleNutritionalInfoChange('calories', e.target.value)}
                  min={0}
                />
                <Input
                  placeholder="Protein (g)"
                  type="number"
                  value={recipe.nutritionalInfo.protein}
                  onChange={(e) => handleNutritionalInfoChange('protein', e.target.value)}
                  min={0}
                  step={0.1}
                />
                <Input
                  placeholder="Carbs (g)"
                  type="number"
                  value={recipe.nutritionalInfo.carbs}
                  onChange={(e) => handleNutritionalInfoChange('carbs', e.target.value)}
                  min={0}
                  step={0.1}
                />
                <Input
                  placeholder="Fat (g)"
                  type="number"
                  value={recipe.nutritionalInfo.fat}
                  onChange={(e) => handleNutritionalInfoChange('fat', e.target.value)}
                  min={0}
                  step={0.1}
                />
                <Input
                  placeholder="Fiber (g)"
                  type="number"
                  
                  value={recipe.nutritionalInfo.fiber}
                  onChange={(e) => handleNutritionalInfoChange('fiber', e.target.value)}
                  min={0}
                  step={0.1}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Wine Pairings</Label>
              {recipe.winePairings.map((pairing, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={pairing}
                    onChange={(e) => handleWinePairingChange(index, e.target.value)}
                    placeholder="Wine pairing"
                    className="flex-grow"
                  />
                  <Button type="button" onClick={() => removeWinePairing(index)} variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addWinePairing} variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Wine Pairing
              </Button>
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimatedCost">Estimated Cost</Label>
              <Input
                id="estimatedCost"
                name="estimatedCost"
                type="number"
                value={recipe.estimatedCost}
                onChange={handleInputChange}
                required
                min={0}
                step={0.01}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Recipe Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            <div className="space-y-2">
              <Label>Chef's Tips</Label>
              {recipe.chefTips.map((tip, index) => (
                <div key={index} className="flex items-center space-x-2 mb-2">
                  <Input
                    value={tip}
                    onChange={(e) => handleChefTipChange(index, e.target.value)}
                    placeholder="Chef's tip"
                    className="flex-grow"
                  />
                  <Button type="button" onClick={() => removeChefTip(index)} variant="destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addChefTip} variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Chef's Tip
              </Button>
            </div>

            <Button type="submit" className="w-full">
              Submit Recipe
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}