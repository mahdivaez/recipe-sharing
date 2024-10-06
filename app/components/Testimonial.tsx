import React from "react";
import { motion } from "framer-motion";

const testimonials = [
    {
      name: "Gordon Ramsay",
      title: "Celebrity Chef",
      image: "https://pbs.twimg.com/profile_images/1276461929934942210/cqNhNk6v_400x400.jpg",
      quote: "\"A perfect recipe is one that brings people together.\"",
    },
    {
      name: "Ina Garten",
      title: "Host of Barefoot Contessa",
      image: "https://pbs.twimg.com/profile_images/1535420431766671360/Pwq-1eJc_400x400.jpg",
      quote: "\"Home cooking doesn’t have to be complicated; it just has to be delicious.\"",
    },
    {
      name: "Jamie Oliver",
      title: "Chef & Restaurateur",
      image: "https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg",
      quote: "\"Fresh ingredients and simple techniques make the best meals.\"",
    },
    {
      name: "Yotam Ottolenghi",
      title: "Chef & Author",
      image: "https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg",
      quote: "\"Sharing recipes is like sharing stories — it connects us across cultures.\"",
    },
    {
      name: "Martha Stewart",
      title: "Television Personality & Chef",
      image: "https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg",
      quote: "\"Every dish tells a story, and every meal brings joy.\"",
    },
    {
      name: "Nigella Lawson",
      title: "Food Writer & Chef",
      image: "https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg",
      quote: "\"Cooking is a way to express love. Recipes are just a medium for connection.\"",
    },
    {
      name: "Alice Waters",
      title: "Chef & Activist",
      image: "https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg",
      quote: "\"Farm-fresh ingredients turn any dish into a masterpiece.\"",
    },
    {
      name: "Anthony Bourdain",
      title: "Chef & Travel Writer",
      image: "https://pbs.twimg.com/profile_images/1375285353146327052/y6jeByyD_400x400.jpg",
      quote: "\"Food is the passport to understanding different cultures.\"",
    },
    

  ];
  
const Testimonial = () => {
  return (
    <section id="testimonies" className="py-20 bg-slate-900 h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-3 py-1 text-sm font-semibold text-indigo-100 rounded-lg bg-[#202c47] bg-opacity-60 hover:cursor-pointer hover:bg-opacity-40">
            Words from Others
          </div>
          <h1 className="text-3xl font-semibold text-white md:text-5xl">
            It's not just us.
          </h1>
          <p className="mt-4 text-xl text-gray-100">
            Here's what others have to say about us.
          </p>
        </div>

        {/* Grid layout for 4 columns */}
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div className="relative group" key={index}>
              <motion.div
                className="bg-slate-800 rounded-lg p-6 shadow-lg transition-transform transform hover:scale-105"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.image}
                    className="w-12 h-12 rounded-full"
                    alt={testimonial.name}
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-500 text-md">
                      {testimonial.title}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-gray-300">{testimonial.quote}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
