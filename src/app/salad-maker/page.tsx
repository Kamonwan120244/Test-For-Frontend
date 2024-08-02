'use client';
import * as React from 'react';
import { Search } from 'lucide-react';
import Image from 'next/image';
import picture from '../../../public/picture.svg';
import icon from '../../../public/icon.png';
import icon2 from '../../../public/icon2.png';
import icon3 from '../../../public/icon3.png';
import icon4 from '../../../public/icon4.png';
import icon5 from '../../../public/icon5.png';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState, useEffect } from "react";
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea, CardActions } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CreateRecipeDialog from '@/components/dialog/index';


interface Category {
  id: string;
  ingredient: string;
  category: string;
  image: string;
  calories: number;
}

const SaladMaker = () => {

  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<Category[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    axios.get<Category[]>('http://localhost:4000/ingredients')
      .then(response => {
        setCategories(response.data);
        const initialCounts: { [key: string]: number } = {};
        response.data.forEach(category => {
          initialCounts[category.id] = 0;
        });
        setCounts(initialCounts);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleAdd = (id: string) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: (prevCounts[id] || 0) + 1,
    }));
  };

  const handleRemove = (id: string) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [id]: Math.max((prevCounts[id] || 0) - 1, 0),
    }));
  };

  const items = [
    { image: icon, text: 'vegetables', category: 'vegetable' },
    { image: icon2, text: 'fruit', category: 'fruit' },
    { image: icon3, text: 'Toppings', category: 'topping' },
    { image: icon4, text: 'protein', category: 'protein' },
    { image: icon5, text: 'Dressing', category: 'dressing' }
  ];

  const handleCategoryClick = (category: string) => {
    setSelectedCategories(prev => {
      const updated = new Set(prev);
      if (updated.has(category)) {
        updated.delete(category);
      } else {
        updated.add(category);
      }
      return updated;
    });
  };


  const filteredCategories = categories.filter(cat =>
    (selectedCategories.size === 0 || selectedCategories.has(cat.category)) &&
    cat.ingredient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const totalCalories = Object.keys(counts).reduce((acc, id) => acc + counts[id] * categories.find(category => category.id === id)?.calories!, 0);

  const recipeDetail = Object.keys(counts)
    .filter(id => counts[id] > 0)
    .map(id => {
      const category = categories.find(category => category.id === id);
      return category ? {
        id: id,
        ingredient: category.ingredient,
        image: category.image,
        amount: counts[id],
        total: counts[id] * category.calories
      } : null;
    })
    .filter(detail => detail !== null);


  return (
    <>
      <div className='p-6'>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold" style={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 700, lineHeight: '54px' }}>Let&apos;s Create...your own salad!!!</h1>
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-[#F8B602]" />
            </div>
            <input
              type="text"
              placeholder="Search ingredients to make a salad..."
              className="p-2 pl-12 border rounded-lg border-[#F8B602] focus:outline-none focus:border-[#F8B602] w-full"
              style={{ fontFamily: 'Poppins', fontSize: '12px' }}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="py-4">
          <Image
            src={picture}
            alt="Picture of the author"
          />
        </div>

        <div className="py-4 flex flex-col items-start">
          <h1 className="text-xl font-bold" style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, lineHeight: '36px' }}>
            Select Category
          </h1>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              '& > :not(style)': {
                m: 1,
                width: 130,
                height: 130,
                borderRadius: '16px',
              },
            }}
          >
            {items.map((item, index) => (
              <Paper
                key={index}
                onClick={() => handleCategoryClick(item.category)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 1,
                  cursor: 'pointer',
                  position: 'relative',
                  border: selectedCategories.has(item.category) ? '2px solid #F8B602' : 'none',
                }}
              >
                {selectedCategories.has(item.category) && (
                  <CheckCircleIcon
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      color: 'green',
                    }}
                  />
                )}
                <div style={{ position: 'relative', width: '50%', height: '50%' }}>
                  <Image
                    src={item.image}
                    alt={item.text}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <Typography
                  variant="caption"
                  component="div"
                  sx={{
                    textAlign: 'center',
                    mt: 1,
                    color: '#A098AE',
                    fontFamily: 'Poppins',
                    fontSize: '14px',
                    fontWeight: 400,
                    lineHeight: '27px',
                  }}
                >
                  {item.text}
                </Typography>
              </Paper>
            ))}
          </Box>
        </div>

        <div className="py-4 flex flex-col items-start">
          <h1 className="py-4 text-xl font-bold" style={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 700, lineHeight: '36px' }}>
            Choose your ingredients to make a salad
          </h1>
          <div className="flex flex-wrap gap-6">
            {filteredCategories.map((category, index) => (
              <Card key={index} sx={{ maxWidth: 250 }}>
                <CardActionArea >
                  <Box sx={{ p: 2 }}>
                    <CardMedia
                      component="img"
                      height="80"
                      image={`http://localhost:4000/images/${category.image}`}
                      alt={category.ingredient}
                    />
                  </Box>
                  <CardContent sx={{ paddingRight: '16px', paddingLeft: '16px', paddingTop: 0, paddingBottom: 0 }}>
                    <Typography variant="body2" color="#2E2E2E" className='font-bold' style={{ fontFamily: 'Poppins', fontSize: '16px', fontWeight: 500, lineHeight: '27px' }}>
                      {category.ingredient}
                    </Typography>
                    <Typography variant="h5" component="div">
                      <span style={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 700, lineHeight: '36px', color: '#2E2E2E' }}>{category.calories}</span>
                      <span style={{ fontSize: '24px', fontWeight: 700, lineHeight: '36px', color: '#F8B602' }}> cal</span>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions sx={{ justifyContent: 'flex-end', paddingRight: '16px', paddingLeft: '16px', paddingTop: 0, paddingBottom: '12px' }}>
                  {counts[category.id] > 0 && (
                    <RemoveCircleIcon
                      sx={{ fontSize: 40, color: '#F8B602', cursor: 'pointer' }}
                      onClick={() => handleRemove(category.id)}
                    />
                  )}
                  {counts[category.id] > 0 && (
                    <Typography
                      className='font-bold' style={{ fontFamily: 'Poppins', fontSize: '24px', fontWeight: 700, lineHeight: '27px' }}
                    >
                      {counts[category.id]}
                    </Typography>
                  )}
                  <AddCircleIcon
                    sx={{ fontSize: 40, color: '#F8B602', cursor: 'pointer' }}
                    onClick={() => handleAdd(category.id)}
                  />
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start">
        {Object.values(counts).some(count => count > 0) && (
          <div className=' bottom-0 left-0 right-0 top-0 w-full bg-white shadow-lg z-10 p-5 mt-auto' style={{ height: '120px' }}>
            <Stack spacing={2} direction="row">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#F8B602',
                  flexGrow: 1,
                  height: '68px',
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                  fontSize: '18px',
                  fontWeight: 700,
                  lineHeight: '24px',
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 24px',
                  '&:hover': {
                    backgroundColor: '#F8B602',
                  },
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Paper
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '48px',
                      width: '54px',
                      backgroundColor: '#ffffff',
                      borderRadius: '8px',
                      marginRight: '24px'
                    }}
                  >
                    <Typography sx={{
                      fontFamily: 'Poppins',
                      fontSize: '28px',
                      fontWeight: 700,
                      lineHeight: '48px',
                      color: '#F8B602',
                      textAlign: 'center'
                    }}>
                      {Object.values(counts).reduce((acc, curr) => acc + curr, 0)}
                    </Typography>
                  </Paper>
                  <Typography sx={{
                    fontFamily: 'Poppins',
                    fontSize: '20px',
                    fontWeight: 700,
                    lineHeight: '36px',
                    color: '#ffffff'
                  }}>
                    Your Ingredients
                  </Typography>
                </div>
                <Typography sx={{
                  fontFamily: 'Poppins',
                  fontSize: '20px',
                  fontWeight: 700,
                  lineHeight: '36px',
                  color: '#ffffff'
                }}>
                  {Object.keys(counts).reduce((acc, id) => acc + counts[id] * categories.find(category => category.id === id)?.calories!, 0)} Cal
                </Typography>
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#2FB62D',
                  minWidth: '294px',
                  height: '68px',
                  borderRadius: '8px',
                  fontFamily: 'Poppins',
                  fontSize: '20px',
                  fontWeight: 700,
                  lineHeight: '36px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: '#2FB62D',
                  },
                }}
                onClick={handleDialogOpen}
              >
                Create Recipe
              </Button>
            </Stack>
          </div>
        )}
      </div>


      <CreateRecipeDialog open={dialogOpen}
        onClose={handleDialogClose}
        totalCalories={totalCalories}
        detail={recipeDetail}
      />

    </>
  );
};

export default SaladMaker;
