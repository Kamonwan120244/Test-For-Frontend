'use client';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import Image from 'next/image';
import axios from 'axios';
import { Divider } from '@mui/material';
import { it } from 'node:test';

interface RecipeDialogProps {
    open: boolean;
    onClose: () => void;
    id: string;
}

interface IngredientDetail {
    id: string;
    ingredient: string;
    amount: number;
    total: number;
    image: string;
}

interface Recipe {
    id: string;
    RecipeName: string;
    calories: number;
    detail: IngredientDetail[];
}

const CardEditRecipe: React.FC<RecipeDialogProps> = ({ open, onClose, id }) => {
    const [recipe, setRecipe] = useState<Recipe | null>(null);
    const [ingredients, setIngredients] = useState<IngredientDetail[]>([]);

    const handleUpdate = () => {
        onClose();
    };

    const handleDelete = (ingredientIndex: number) => {
        axios.delete(`http://localhost:4000/recipes/${id}/ingredients/${ingredientIndex}`)
            .then(response => {
                const updatedRecipe = response.data;
                setIngredients(updatedRecipe.detail); // Update the state with the new list of ingredients
            })
            .catch(error => {
                console.error('There was an error deleting the ingredient!', error.response ? error.response.data : error.message);
            });
    };


    const fetchRecipe = () => {
        axios.get<Recipe>(`http://localhost:4000/recipes/${id}`)
            .then(response => {
                setRecipe(response.data);
                setIngredients(response.data.detail);
            })
            .catch(error => {
                console.error('There was an error fetching the recipe data!', error);
            });
    };

    useEffect(() => {
        if (id) {
            fetchRecipe();
        }
    }, [id]);

    if (!recipe) return null;

    const totalCalories = ingredients.reduce((sum, item) => sum + item.total, 0);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            sx={{
                '& .MuiDialog-container': {
                    alignItems: 'flex-start',
                },
                '& .MuiPaper-root': {
                    marginTop: '5%',
                    width: '90%',
                    maxWidth: '1000px',
                    height: 'auto',
                    maxHeight: '80vh',
                    borderRadius: '16px',
                },
            }}
        >
            <DialogTitle>
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: 'Poppins',
                            fontSize: '20px',
                            fontWeight: 700,
                            lineHeight: '28px',
                            marginTop: 1,
                            paddingBottom: '24px'
                        }}
                    >
                        Edit Recipe
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            fontFamily: 'Poppins',
                            fontSize: '20px',
                            fontWeight: 700,
                            lineHeight: '28px',
                            marginTop: 1,
                            paddingY: '8px'
                        }}
                    >
                        Your ingredients to make a salad Recipe
                    </Typography>
                </Box>
            </DialogTitle>
            <DialogContent sx={{ padding: '0 24px 0 24px' }}>
                {recipe.detail.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            mb: 2
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                            }}
                        >
                            <Image
                                src={`http://localhost:4000/images/${item.image}`}
                                alt={item.ingredient}
                                width={60}
                                height={60}
                                style={{ borderRadius: '8px' }}
                            />
                            <Box>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontFamily: 'Poppins',
                                        fontSize: '16px',
                                        fontWeight: 400,
                                        lineHeight: '27px',
                                    }}
                                >
                                    {item.ingredient}
                                </Typography>
                                <Box sx={{ display: 'flex' }}>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontSize: '12px',
                                            fontWeight: 400,
                                            lineHeight: '21px',
                                            color: '#A098AE',
                                            paddingRight: '16px'
                                        }}
                                    >
                                        x{item.amount}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            fontFamily: 'Poppins',
                                            fontSize: '12px',
                                            fontWeight: 400,
                                            lineHeight: '21px',
                                            color: '#FE0000',
                                            textDecoration: 'underline',
                                            cursor: 'pointer',
                                        }}


                                    >
                                        delete
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Typography
                            variant="body1"
                            sx={{
                                fontFamily: 'Poppins',
                                fontSize: '18px',
                                fontWeight: 500,
                                lineHeight: '24px',
                                color: '#2E2E2E',
                                textAlign: 'right',
                            }}
                        >
                            <span style={{
                                fontFamily: 'Poppins',
                                fontSize: '18px',
                                fontWeight: 600,
                                lineHeight: '27px',
                                color: '#2E2E2E',
                                paddingRight: '8px'
                            }}>
                                +{item.total}
                            </span>
                            <span style={{
                                fontFamily: 'Poppins',
                                fontSize: '18px',
                                fontWeight: 600,
                                lineHeight: '27px',
                                color: '#F8B602'
                            }}>
                                {' '}cal
                            </span>
                        </Typography>
                    </Box>
                ))}
            </DialogContent>
            <Divider sx={{ m: 3, backgroundColor: '#DBDBDB' }} />
            <DialogActions sx={{ justifyContent: 'center', gap: 2, flexDirection: 'column', padding: '0 24px 24px 24px' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                            fontWeight: 500,
                            lineHeight: '27px',
                            color: '#2E2E2E',
                            paddingLeft: '8px'
                        }}
                    >
                        Total Calorie
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            fontFamily: 'Poppins',
                            fontSize: '18px',
                            fontWeight: 500,
                            lineHeight: '24px',
                            color: '#2E2E2E',
                            textAlign: 'right',
                        }}
                    >
                        <span style={{
                            fontFamily: 'Poppins',
                            fontSize: '18px',
                            fontWeight: 600,
                            lineHeight: '27px',
                            color: '#2E2E2E',
                            paddingRight: '8px'
                        }}>
                            {totalCalories}
                        </span>
                        <span style={{
                            fontFamily: 'Poppins',
                            fontSize: '18px',
                            fontWeight: 600,
                            lineHeight: '27px',
                            color: '#F8B602'
                        }}>
                            {' '}cal
                        </span>
                    </Typography>
                </Box>
                <Button
                    onClick={handleUpdate}
                    variant="contained"
                    sx={{
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: '24px',
                        textTransform: 'none',
                        backgroundColor: '#F8B602',
                        '&:hover': { backgroundColor: '#F8B602' },
                        height: 50,
                        padding: '0 16px',
                        width: "100%",
                    }}
                >
                    Update Recipe
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CardEditRecipe;
