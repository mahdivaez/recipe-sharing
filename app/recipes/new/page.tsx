"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2, ChefHat, Zap } from "lucide-react"
import { useRouter } from "next/navigation"
import { SparklesCore } from "@/components/ui/sparkles";

type Ingredient = {
  name: string
  amount: string
  unit: string
}

type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER'

type Recipe = {
  title: string
  description: string
  ingredients: Ingredient[]
  instructions: string
  cookingTime: number
  servings: number
  difficulty: string
  mealType: MealType | ''
  image: File | null
}

export default function CreateRecipe() {
  const router = useRouter()

  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    description: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    instructions: "",
    cookingTime: 0,
    servings: 1,
    difficulty: "",
    mealType: "",
    image: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setRecipe((prev) => ({ ...prev, [name]: value }))
  }

  const handleIngredientChange = (index: number, field: keyof Ingredient, value: string) => {
    const updatedIngredients = recipe.ingredients.map((ingredient, i) => {
      if (i === index) {
        return { ...ingredient, [field]: value }
      }
      return ingredient
    })
    setRecipe((prev) => ({ ...prev, ingredients: updatedIngredients }))
  }

  const addIngredient = () => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: "", amount: "", unit: "" }],
    }))
  }

  const removeIngredient = (index: number) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setRecipe((prev) => ({ ...prev, image: file }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Prepare form data
    const formData = new FormData()
    formData.append('title', recipe.title)
    formData.append('description', recipe.description)
    formData.append('instructions', recipe.instructions)
    formData.append('cookingTime', recipe.cookingTime.toString())
    formData.append('servings', recipe.servings.toString())
    formData.append('difficulty', recipe.difficulty)
    formData.append('mealType', recipe.mealType)
    formData.append('ingredients', JSON.stringify(recipe.ingredients))
    if (recipe.image) {
      formData.append('image', recipe.image)
    }

    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const result = await response.json()
      console.log('Recipe submitted successfully:', result)
      router.push('/recipes/explore') // Navigate after successful submission
    } catch (error) {
      console.error('Error submitting recipe:', error)
      alert('There was an error submitting your recipe. Please try again.')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container  mt-10 mx-auto py-8"
    >
          {/* <SparklesCore
            id="sparkles"
            className="absolute top-0 left-0 w-full h-f"
            background="transparent"
            minSize={3}
            maxSize={3}
            speed={0.5}
            particleColor="rgb(255, 255, 255)"
            particleDensity={100}
          /> */}
      
      <Card className="w-full max-w-4xl mx-auto overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        {/* <SparklesCore
            id="sparkles"
            className="absolute top-0 left-0 w-full h-full"
            background="transparent"
            minSize={3}
            maxSize={3}
            speed={0.5}
            particleColor="rgb(255, 255, 255)"
            particleDensity={100}
          /> */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CardTitle className="text-3xl font-bold flex items-center justify-center">
              <ChefHat className="mr-2" /> Create Your Culinary Masterpiece
            </CardTitle>
          </motion.div>
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="title">Recipe Title</Label>
              <Input
                id="title"
                name="title"
                value={recipe.title}
                onChange={handleInputChange}
                required
                placeholder="Enter your recipe's name"
                className="text-lg"
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={recipe.description}
                onChange={handleInputChange}
                placeholder="Describe your culinary creation"
                className="min-h-[100px]"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="space-y-2"
            >
              <Label>Ingredients</Label>
              <AnimatePresence>
                {recipe.ingredients.map((ingredient, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center space-x-2 mb-2"
                  >
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
                    <Button type="button" onClick={() => removeIngredient(index)}>
                      <Trash2 />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button type="button" onClick={addIngredient} variant="outline">
                <PlusCircle className="mr-2" />
                Add Ingredient
              </Button>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                name="instructions"
                value={recipe.instructions}
                onChange={handleInputChange}
                placeholder="Step-by-step instructions"
                className="min-h-[150px]"
              />
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="space-y-2"
            >
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
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="space-y-2"
            >
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
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="difficulty">Difficulty</Label>
              <Select
                value={recipe.difficulty}
                onValueChange={(value) => setRecipe((prev) => ({ ...prev, difficulty: value }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select difficulty" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="mealType">Meal Type</Label>
              <Select
                value={recipe.mealType}
                onValueChange={(value) => setRecipe((prev) => ({ ...prev, mealType: value as MealType }))}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select meal type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BREAKFAST">Breakfast</SelectItem>
                  <SelectItem value="LUNCH">Lunch</SelectItem>
                  <SelectItem value="DINNER">Dinner</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="image">Recipe Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </motion.div>

            <Button type="submit" className="w-full">
              <Zap className="mr-2" />
              Submit Recipe
            </Button>
          </form>
        </CardContent>
  
      </Card>
    </motion.div>
  )
}