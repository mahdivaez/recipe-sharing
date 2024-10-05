import React from 'react'
import { CardContainer, CardBody, CardItem } from "@/components/ui/MainPageCard"; // Import your card components
import Image from "next/image";
import { Search, ChevronRight, Star, Clock, Users, Menu } from 'lucide-react'
interface Props {
  image : string
}
const MainPageCards = ({image} :Props) => {
  return (
    <div>
              <CardContainer containerClassName="mt-10">
        <CardBody className="bg-white shadow-lg rounded-lg">
          <CardItem translateZ={50} className='relative h-70'>
            <Image
            objectFit='cover'
              src={image}
              width='1000'
              height='1000'
              className="object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"

            />
          </CardItem>
          <CardItem translateZ={20} className="mt-4">
            <h1 className="text-2xl ml-5 font-normal text-left">Rainbow Sushi Rolls</h1>
          </CardItem>
          <CardItem translateZ={10} className="mt-2">
            <p className="text-center ml-5 text-gray-600">
            by Hiroshi Tanaka</p>
          </CardItem>
          <div className="flex mt-7 justify-between items-center">
                      <div className="flex ml-5 items-center">
                        <Star className="text-yellow-400 mr-1" size={16} />
                        <span className="text-gray-600">4.8</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Clock className="mr-1" size={16} />
                        <span>20 min</span>
                      </div>
                      <div className="flex mr-2 items-center text-gray-600">
                        <Users className="mr-1" size={16} />
                        <span>2 servings</span>
                      </div>
                    </div>
        </CardBody>
      
      </CardContainer>
    </div>
  )
}

export default MainPageCards