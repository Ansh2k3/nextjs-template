import React from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import Image from 'next/image';

interface CardComponentProps {
  name: string;
  population: number;
  region: string;
  capital: string;
  flagUrl: string;
}

const Cardcomponent: React.FC<CardComponentProps> = ({ name, population, region, capital, flagUrl }) => {
  return (
    <Card className="w-[350px] h-[450px] overflow-hidden">
      <CardHeader className='p-0 h-2/3'>
        <div className="relative w-full h-full">
          <Image
            alt={`${name} flag`}
            src={flagUrl}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </CardHeader>
      <CardContent className='p-4 bg-[#2B3945] h-1/3'>
        <p className="text-lg font-bold text-white mb-2">
          {name}
        </p>
        <p className="text-sm text-[#A0A0A0]">
          <span className="font-medium">Population:</span> {population.toLocaleString()}
        </p>
        <p className="text-sm text-[#A0A0A0]">
          <span className="font-medium">Region:</span> {region}
        </p>
        <p className="text-sm text-[#A0A0A0]">
          <span className="font-medium">Capital:</span> {capital}
        </p>
      </CardContent>
    </Card>
  );
};

export default Cardcomponent;