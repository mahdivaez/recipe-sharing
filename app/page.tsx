'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import food2 from "@/public/food2.jpg";
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import MainPageCards from "./components/MainPageCards";
import Chef from "@/public/chef.jpg";

export default function Home() {
  const [searchFocus, setSearchFocus] = useState(false)
  return (
    <div className="min-h-screen bg-white">
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-r from-black to-black  ">
    <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-7xl text-white font-bold mb-6">
              Discover Culinary Wonders
            </h1>
            <p className="text-xl text-white  mb-8">
              Explore a universe of flavors, one recipe at a time
            </p>
            <div className="search-container max-w-2xl bg-white rounded-full mx-auto relative">
              <Input 
                type="search" 
                placeholder="Search for recipes..." 
                className={`pl-12 pr-4 py-6 w-full bg-white rounded-full text-lg transition-all duration-300 ${searchFocus ? 'bg-white shadow-lg' : 'bg-white bg-opacity-80'}`}
         
              
              />
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${searchFocus ? 'text-purple-600' : 'text-gray-400'}`} size={24} />
            </div>
          </div>        
      </section> 
    
      <div className="flex flex-row justify-center"> {/* Use space-y to add vertical gap */}
        <div className="mr-10">
          <MainPageCards image="/food1.jpg" />
        </div>
        <div className="mr-10">
          <MainPageCards image="/food1.jpg" />
        </div>
        <div className="mr-10">
          <MainPageCards image="/food1.jpg" />
        </div>
      </div>
      <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Explore Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: "Breakfast", icon: "🍳", color: "bg-yellow-100 hover:bg-yellow-200" },
                { name: "Lunch", icon: "🥪", color: "bg-green-100 hover:bg-green-200" },
                { name: "Dinner", icon: "🍽️", color: "bg-blue-100 hover:bg-blue-200" },
                { name: "Desserts", icon: "🍰", color: "bg-pink-100 hover:bg-pink-200" }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link href={`/category/${category.name.toLowerCase()}`} className={`${category.color} rounded-xl p-6 text-center transition duration-300 block`}>
                    <span className="text-4xl mb-2 block">{category.icon}</span>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-16 bg-black text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h2 className="text-3xl font-bold mb-4">Share Your Culinary Creations</h2>
                <p className="text-xl mb-6">Join our community of food enthusiasts and showcase your best recipes to the world.</p>
                <Button className="bg-white text-black hover:bg-gray-100">Submit Your Recipe</Button>
              </div>
              <div className="md:w-1/2 md:pl-8">
                <Image src={food2} alt="Share your recipe" width={500} height={300} className="rounded-lg shadow-lg" />
              </div>
            </div>
          </div>
        </section>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Featured Chefs</h2>
            <div className="flex flex-wrap justify-center gap-8">
              {[
                { name: "Maria Rodriguez", specialty: "Mexican Fusion", avatar: {Chef} },
                { name: "Giovanni Rossi", specialty: "Modern Italian", avatar: {Chef} },
                { name: "Emma Thompson", specialty: "Vegan Desserts", avatar: {Chef}},
                { name: "Hiroshi Tanaka", specialty: "Japanese Street Food", avatar: {Chef}}
              ].map((chef, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <Avatar className="w-24 h-24 mb-3">
                    <AvatarImage src={"@/public/chef.jpg"} alt={chef.name} />
                    <AvatarFallback>{chef.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg text-gray-800">{chef.name}</h3>
                  <p className="text-sm text-gray-600">{chef.specialty}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About CulinaryCanvas</h3>
              <p className="text-gray-400">Discover and share extraordinary recipes from around the globe.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            © {new Date().getFullYear()} CulinaryCanvas. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
