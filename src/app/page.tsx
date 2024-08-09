"use client"
import Cardcomponent from '@/components/Cardcomponent';
import Layout from '@/components/layout/Layout'
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Input } from '@nextui-org/react'
import React, { useState, useEffect } from 'react'

interface Country {
  cca3: string;
  name: {
    common: string;
  };
  population: number;
  region: string;
  capital?: string[];
  flags: {
    png: string;
  };
}

const Home: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data: Country[] = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter(country => 
      (selectedRegion === '' || country.region === selectedRegion) &&
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [selectedRegion, searchTerm, countries]);

  const handleRegionSelect = (region: string) => {
    setSelectedRegion(region);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Layout>
      <div className='container mb-4 flex justify-between'>
        <Input 
          className='w-max' 
          label="Country" 
          placeholder="Search for country" 
          value={searchTerm}
          onChange={handleSearch}
        />
        <div>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="shadow" className="capitalize">
                {selectedRegion ? ` ${selectedRegion}` : 'Filter by region'}
              </Button>
            </DropdownTrigger>
            <DropdownMenu variant="shadow">
              <DropdownItem key="all" onPress={() => handleRegionSelect('')}>
                All
              </DropdownItem>
              <DropdownItem key="africa" onPress={() => handleRegionSelect('Africa')}>
                Africa
              </DropdownItem>
              <DropdownItem key="Americas" onPress={() => handleRegionSelect('Americas')}>
                Americas
              </DropdownItem>
              <DropdownItem key="Asia" onPress={() => handleRegionSelect('Asia')}>
                Asia
              </DropdownItem>
              <DropdownItem key="Europe" onPress={() => handleRegionSelect('Europe')}>
                Europe
              </DropdownItem>
              <DropdownItem key="Oceania" onPress={() => handleRegionSelect('Oceania')}>
                Oceania
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
      <div className='container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {filteredCountries.map(country => (
          <Cardcomponent 
            key={country.cca3}
            name={country.name.common}
            population={country.population}
            region={country.region}
            capital={country.capital?.[0] || 'N/A'}
            flagUrl={country.flags.png}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Home;