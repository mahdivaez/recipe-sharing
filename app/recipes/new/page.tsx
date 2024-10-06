"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, Trash2, ChefHat, Clock, Users, Zap } from "lucide-react"

type Ingredient = {
  name: string
  amount: string
  unit: string
}

type Recipe = {
  title: string
  description: string
  ingredients: Ingredient[]
  instructions: string
  cookingTime: number
  servings: number
  difficulty: string
  image: File | null
}

export default function CreateRecipe() {
  const [recipe, setRecipe] = useState<Recipe>({
    title: "",
    description: "",
    ingredients: [{ name: "", amount: "", unit: "" }],
    instructions: "",
    cookingTime: 0,
    servings: 1,
    difficulty: "",
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
    e.preventDefault();
  
    // Prepare form data
    const formData = new FormData();
    formData.append('title', recipe.title);
    formData.append('description', recipe.description);
    formData.append('instructions', recipe.instructions);
    formData.append('cookingTime', recipe.cookingTime.toString());
    formData.append('servings', recipe.servings.toString());
    formData.append('difficulty', recipe.difficulty);
    formData.append('image', recipe.image!);
    formData.append('ingredients', JSON.stringify(recipe.ingredients)); 
    if (recipe.image) {
      formData.append('image', recipe.image);
    }
  
    try {
      const response = await fetch('/api/recipe', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Recipe submitted successfully:', result);
      // Optionally reset form or show success message
    } catch (error) {
      console.error('Error submitting recipe:', error);
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
                        <SelectItem value="tsp">tsp</SelectItem>
                        <SelectItem value="tbsp">tbsp</SelectItem>
                        <SelectItem value="cup">cup</SelectItem>
                        <SelectItem value="piece">piece</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => removeIngredient(index)}
                      className="text-red-500 hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </motion.div>
                ))}
              </AnimatePresence>
              <Button type="button" variant="outline" onClick={addIngredient} className="mt-2 w-full">
                <PlusCircle className="h-4 w-4 mr-2" /> Add Ingredient
              </Button>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="instructions">Cooking Instructions</Label>
              <Textarea
                id="instructions"
                name="instructions"
                value={recipe.instructions}
                onChange={handleInputChange}
                placeholder="Share your step-by-step cooking magic"
                className="min-h-[200px]"
              />
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="space-y-2">
                <Label htmlFor="cookingTime" className="flex items-center">
                  <Clock className="mr-2" /> Cooking Time (minutes)
                </Label>
                <Input
                  id="cookingTime"
                  name="cookingTime"
                  type="number"
                  value={recipe.cookingTime}
                  onChange={handleInputChange}
                  min="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="servings" className="flex items-center">
                  <Users className="mr-2" /> Servings
                </Label>
                <Input
                  id="servings"
                  name="servings"
                  type="number"
                  value={recipe.servings}
                  onChange={handleInputChange}
                  min="1"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="difficulty" className="flex items-center">
                  <Zap className="mr-2" /> Difficulty
                </Label>
                <Select
                  name="difficulty"
                  value={recipe.difficulty}
                  onValueChange={(value) => setRecipe((prev) => ({ ...prev, difficulty: value }))}
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
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="space-y-2"
            >
              <Label htmlFor="image">Recipe Image</Label>
              <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageUpload} />
            </motion.div>
          </form>
        </CardContent>
        <CardFooter className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full"
          >
            <Button
              type="submit"
              className="w-full bg-white text-purple-600 hover:bg-purple-100 transition-colors duration-300"
              onClick={handleSubmit}
            >
              Create Your Masterpiece
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}