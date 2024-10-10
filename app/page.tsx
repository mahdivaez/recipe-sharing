"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { ChefHat, Search, Users, Clock, Star, UtensilsCrossed, ArrowRight, Zap, Award, TrendingUp, ArrowDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import chef3 from "@/public/chef3.jpg"
import chef1 from "@/public/chef1.jpg"
import chef2 from "@/public/chef2.jpg"


import { SparklesCore } from "@/components/ui/sparkles";

const typewriterWords = [
  "Delicious Recipes",
  "Culinary Adventures",
  "Tasty Creations",
  "Flavorful Dishes",
]

const MotionLink = motion(Link)

const GradientBackground = () => (
  <div className="absolute inset-0 bg-gradient-to-br from-purple-700 via-pink-500 to-red-500 opacity-75" />
)

const TypewriterEffect = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const typingInterval = setInterval(() => {
      const currentWord = typewriterWords[currentWordIndex]

      if (!isDeleting && currentText === currentWord) {
        setTimeout(() => setIsDeleting(true), 1500)
        return
      }

      if (isDeleting && currentText === "") {
        setIsDeleting(false)
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % typewriterWords.length)
        return
      }

      setCurrentText((prevText) =>
        isDeleting ? prevText.slice(0, -1) : currentWord.slice(0, prevText.length + 1)
      )
    }, isDeleting ? 50 : 150)

    return () => clearInterval(typingInterval)
  }, [currentWordIndex, isDeleting, currentText])

  return (
    <motion.h1
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6"
    >
      Discover{" "}
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
        {currentText}
      </span>
      <span className="animate-blink">|</span>
    </motion.h1>
  )
}

const StatComponent = ({ icon: Icon, value, label, color }: { icon: React.ElementType; value: string; label: string; color: string }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={`flex flex-col items-center p-6 ${color} rounded-lg shadow-xl`}
  >
    <Icon className="w-10 h-10 text-white mb-3" />
    <span className="text-3xl font-bold text-white mb-1">{value}</span>
    <span className="text-sm text-white">{label}</span>
  </motion.div>
)

const StatGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    <StatComponent icon={Users} value="10k+" label="Active Users" color="bg-gradient-to-br from-pink-500 to-red-500" />
    <StatComponent icon={Clock} value="30min" label="Avg. Cooking Time" color="bg-gradient-to-br from-purple-500 to-indigo-500" />
    <StatComponent icon={Star} value="4.8" label="Average Rating" color="bg-gradient-to-br from-yellow-400 to-orange-500" />
    <StatComponent icon={UtensilsCrossed} value="1000+" label="Recipes" color="bg-gradient-to-br from-green-400 to-teal-500" />
  </div>
)
const NewsletterSection = () => (
  <section className="bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 py-20">
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Subscribe to Our Newsletter</h2>
        <p className="text-white mb-8">Get the latest recipes and cooking tips delivered straight to your inbox!</p>
        <form className="flex flex-col sm:flex-row gap-4">
          <Input type="email" placeholder="Enter your email" className="flex-grow" />
          <Button type="submit" className="bg-white text-pink-500 hover:bg-gray-100">Subscribe</Button>
        </form>
      </div>
    </div>
  </section>
)
const RecipeCard = ({ image, title, description }: { image: string; title: string; description: string }) => (
  <motion.div
    whileHover={{ y: -10 }}
    className="bg-white rounded-xl shadow-lg overflow-hidden"
  >
    <Image src={image} alt={title} width={400} height={300} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      
      <Button variant="outline" className="w-full">View Recipe</Button>
    </div>
  </motion.div>
)
const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
  <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardContent className="p-6">
      <Icon className="w-12 h-12 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
)

const TestimonialCard = ({ text, author, image }: { text: string; author: string; image: string }) => (
  <Card className="w-80 flex-shrink-0 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
    <CardContent className="p-6">
      <div className="flex items-center mb-4">
        <Image src={image} alt={author} width={50} height={50} className="rounded-full mr-4" />
        <div>
          <p className="font-semibold">{author}</p>
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 italic">{text}</p>
    </CardContent>
  </Card>
)

const TestimonialMarquee = () => {
  const testimonials = [
    { id: 1, text: "This website changed my cooking game!", author: "Sarah L.", Image: {chef3} },
    { id: 2, text: "I've discovered so many new recipes here.", author: "Mike T.", Image: {chef2}},
    { id: 3, text: "The community here is amazing and supportive.", author: "Emily R.", Image: {chef1} },
    { id: 4, text: "I love how easy it is to find new recipes.", author: "David M.", Image: {chef1}},
    { id: 5, text: "The step-by-step instructions are so helpful.", author: "Lisa K.", Image: {chef2} },
  ]
  const testimonialsImages = [
    { id: 1, text: "Chef 1", Image: {chef1} },
    { id: 2, text: "Chef 2", Image: {chef2} },
    { id: 3, text: "Chef 3", Image: {chef3} },
  ]

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-16 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="flex space-x-8"
          animate={{ x: ["0%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {testimonials.concat(testimonials).map((testimonial, index) => (
            <TestimonialCard key={index} text={testimonial.text} author={testimonial.author} image={chef2}/>
          ))}
        </motion.div>
      </div>
    </div>
  )
}


export default function Home() {
  const [searchFocus, setSearchFocus] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
  
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      <section>
          <SparklesCore
            id="sparkles"
            className="absolute top-0 left-0 w-full h-full"
            background="transparent"
            minSize={3}
            maxSize={3}
            speed={0.5}
            particleColor="rgb(255, 255, 255)"
            particleDensity={100}
          />
        </section>
        <GradientBackground />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
                 <motion.div
        className="mb-20"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <ChefHat size={150} color="white" className="mx-auto mb-4" />
      </motion.div>
          </motion.div>
          <TypewriterEffect />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mt-6 mb-10"
          >
            Explore a universe of flavors, one recipe at a time
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="search-container max-w-3xl mx-auto relative"
          >
            <Input
              type="search"
              placeholder="Search for recipes..."
              className={`pl-12 pr-4 py-6 w-full bg-white bg-opacity-10 backdrop-blur-md rounded-full text-lg md:text-xl transition-all duration-300 text-white placeholder-gray-400 ${
                searchFocus ? "shadow-lg ring-2 ring-purple-300" : ""
              }`}
              onFocus={() => setSearchFocus(true)}
              onBlur={() => setSearchFocus(false)}
            />
            <Search
              className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                searchFocus ? "text-purple-500" : "text-gray-400"
              }`}
              size={28}
            />
            <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-8 py-3 hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
              Search
            </Button>
          </motion.div>
        </div>
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        >
          <ArrowDown className="text-white w-10 h-10" />
        </motion.div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center"
          >
            Our Impact
          </motion.h2>
          <StatGrid />
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center"
          >
            Featured Recipes
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <RecipeCard
              image="/food1.jpg"
              title="Spicy Thai Basil Chicken"
              description="A quick and flavorful dish perfect for weeknight dinners."
            />
            <RecipeCard
              image="/food2.jpg"
              title="Creamy Mushroom Risotto"
              description="A comforting Italian classic that's easier to make than you think."
            />
            <RecipeCard
              image="/food3.jpg"
              title="Chocolate Lava Cake"
              description="Indulge in this decadent dessert with a gooey chocolate center."
            />
          </div>
        </div>
      </section>
      <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
     
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            
            className="text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Explore Categories
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Breakfast", icon: "🍳", color: "from-yellow-400 to-orange-500" },
              { name: "Lunch", icon: "🥪", color: "from-green-400 to-emerald-500" },
              { name: "Dinner", icon: "🍽️", color: "from-blue-400 to-indigo-500" },
              { name: "Desserts", icon: "🍰", color: "from-pink-400 to-rose-500" },
            ].map((category, index) => (
              <MotionLink
                key={index}
                href={`/category/${category.name.toLowerCase()}`}
                className={`bg-gradient-to-br ${category.color} rounded-xl p-8 text-center transition duration-300 transform hover:scale-105`}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-5xl mb-4 block">{category.icon}</span>
                <h3 className="text-xl font-semibold text-white">{category.name}</h3>
              </MotionLink>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center"
          >
            Why Choose Us
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="Quick & Easy"
              description="Find recipes that fit your schedule, with easy-to-follow instructions."
            />
            <FeatureCard
              icon={Award}
              title="Quality Recipes"
              description="Curated recipes from professional chefs and passionate home cooks."
            />
            <FeatureCard
              icon={TrendingUp}
              title="Constantly Updated"
              description="New recipes added weekly, keeping up with the latest food trends."
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-purple-600 to-indigo-600 text-white relative overflow-hidden">
     
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 mb-10 md:mb-0"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Share Your Culinary Creations</h2>
              <p className="text-xl mb-8">
                Join our community of food enthusiasts and showcase your best recipes to the world.
              </p>
              <Link  href="/recipes/new">
                <Button className="bg-white text-purple-600 hover:bg-gray-100 transition-colors duration-300 text-lg px-8 py-3 rounded-full">
                  Submit Your Recipe
                </Button>
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:w-1/2 md:pl-8"
            >
              <Image
                src={chef3}
                alt="Chef cooking"
                width={400}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 opacity-75" />
      </section>

      <TestimonialMarquee />
      
      <TestimonialMarquee />
      <NewsletterSection />



      <footer className="bg-gray-900 text-white py-16">
        
        <div className="container mx-auto px-4">
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            <div>
              
              <h3 className="text-2xl font-semibold mb-6">CulinaryCanvas</h3>
              <p className="text-gray-400">Discover and share extraordinary recipes from around the globe.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} CulinaryCanvas. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}