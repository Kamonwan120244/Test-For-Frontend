'use client';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Button, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import axios from 'axios';
import DeleteRecipeDialog from '@/components/delete-dialog/index';
import CardEditRecipe from '@/components/card-edit';
import TextField from '@mui/material/TextField';

interface Recipe {
  id: string;
  RecipeName: string;
  calories: number;
}

const Recipe = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [selectedRecipeDetailId, setSelectedRecipeDetailId] = useState<string | null>(null);
  const [showCard, setShowCard] = useState(false);


  useEffect(() => {
    axios.get<Recipe[]>('http://localhost:4000/recipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the data!', error);
      });
  }, []);

  const handleDialogOpen = (recipeId: string) => {
    setSelectedRecipeId(recipeId);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDeleteRecipe = () => {
    if (selectedRecipeId) {
      axios.delete(`http://localhost:4000/recipes/${selectedRecipeId}`)
        .then(response => {
          setRecipes(recipes.filter(recipe => recipe.id !== selectedRecipeId));
          setDialogOpen(false);
        })
        .catch(error => {
          console.error('There was an error deleting the recipe!', error);
        });
    }
  };

  const handleEditButtonClickOpen = (recipeId: string) => {
    setSelectedRecipeDetailId(recipeId);
    setShowCard(true);
  };
  const handleEditButtonClickClose = () => {
    setShowCard(false);
  };

  return (
    <>
      <div className='p-6'>
        <div className="flex items-center justify-between mb-4">
          <Typography variant="h1" sx={{ px: 4, fontSize: '24px', fontWeight: 700, lineHeight: '54px' }}>
            Recipe
          </Typography>
        </div>

        <div className='p-0'>
          <Paper sx={{ borderRadius: '8px', margin: '16px', paddingBottom: '16px' }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 700,
                lineHeight: '36px',
                color: '#2E2E2E',
                padding: '16px'
              }}
            >
              Your Recipe
            </Typography>

            <div className='flex flex-wrap gap-1'>
              {recipes.map((recipe) => (
                <Box key={recipe.id} sx={{ borderRadius: '8px', padding: '8px', paddingLeft: '18px' }}>
                  <Card sx={{
                    maxWidth: 260,
                    backgroundImage: 'radial-gradient(circle, #F8B602, #EB5757, #A6C44A, #F8B602)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '16px',
                    backgroundRepeat: 'no-repeat',
                  }}>
                    <CardContent sx={{ margin: 3, backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', borderRadius: '16px', padding: '24px 24px 48px 24px' }}>
                      <Typography variant="body2" color="#2E2E2E" sx={{ fontFamily: 'Poppins', fontSize: '18px', fontWeight: 400, lineHeight: '27px', marginBottom: '8px' }}>
                        {recipe.RecipeName}
                      </Typography>
                      <Typography variant="h5" component="div">
                        <span style={{ fontFamily: 'Poppins', fontSize: '32px', fontWeight: 700, lineHeight: '48px', color: '#2E2E2E' }}>
                          {recipe.calories}
                        </span>
                        <span style={{ fontFamily: 'Poppins', fontSize: '32px', fontWeight: 700, lineHeight: '48px', color: '#F8B602' }}>
                          {' '}cal
                        </span>
                      </Typography>
                    </CardContent>

                    <CardActions sx={{ justifyContent: 'center', padding: '60px 24px 24px 24px' }}>
                      <Button
                        sx={{
                          fontFamily: 'Poppins',
                          fontSize: '16px',
                          fontWeight: 700,
                          lineHeight: '24px',
                          textTransform: 'none',
                          color: '#FE0000',
                          width: 143,
                          height: 40,
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          '&:hover': { backgroundColor: '#f0f0f0' },
                          display: 'flex',
                          alignItems: 'center',
                          marginRight: '8px',
                        }}
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDialogOpen(recipe.id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        sx={{
                          fontFamily: 'Poppins',
                          fontSize: '16px',
                          fontWeight: 700,
                          lineHeight: '24px',
                          textTransform: 'none',
                          color: '#2E2E2E',
                          width: 143,
                          height: 40,
                          backgroundColor: '#ffffff',
                          borderRadius: '16px',
                          '&:hover': { backgroundColor: '#f0f0f0' },
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        startIcon={<BorderColorIcon />}
                        onClick={() => handleEditButtonClickOpen(recipe.id)}
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Box>
              ))}
            </div>
          </Paper>
        </div>

      </div>

      <DeleteRecipeDialog open={dialogOpen} onClose={handleDialogClose} onDelete={handleDeleteRecipe} />

      {showCard && selectedRecipeDetailId && (
        <CardEditRecipe
          open={showCard}
          onClose={handleEditButtonClickClose}
          id={selectedRecipeDetailId}
        />
      )}
    </>
  );
};

export default Recipe;
