'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { Box } from '@mui/material';
import axios from 'axios';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from "react";

interface RecipeDialogProps {
    open: boolean;
    onClose: () => void;
    totalCalories: number;
    detail: { ingredient: string; image: string; amount: number; total: number }[];
}


const CreateRecipeDialog: React.FC<RecipeDialogProps> = ({ open, onClose, totalCalories, detail }) => {

    const [recipeName, setRecipeName] = useState('');


    const handleCreateRecipe = async () => {
        try {
            await axios.post('http://localhost:4000/recipes', {
                RecipeName: recipeName,
                calories: totalCalories,
                detail: detail
            });
            window.location.reload();
        } catch (error) {
            console.error('Failed to create recipe:', error);
        }
    };

    return (
        <React.Fragment>
            <Dialog open={open} onClose={onClose}
                sx={{
                    '& .MuiDialog-container': {
                        alignItems: 'flex-start',
                    },
                    '& .MuiPaper-root': {
                        marginTop: '2%',
                    },
                }}>
                <DialogTitle>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                        <Button onClick={onClose}>
                            <CloseIcon sx={{ color: '#A5ABB0' }} />
                        </Button>

                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                            width: '100%',
                        }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 50,
                                height: 50,
                                backgroundColor: '#F8B602',
                                borderRadius: '50%',
                                marginBottom: 1,
                            }}
                        >
                            <RestaurantIcon sx={{ color: 'white' }} />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontFamily: 'Poppins',
                                fontSize: '20px',
                                fontWeight: 700,
                                lineHeight: '28px',
                                marginTop: 1,
                            }}
                        >
                            Recipe Name
                        </Typography>
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ paddingTop: '24px' }}>
                    <Typography sx={{ fontFamily: 'Poppins', paddingTop: '24px' }}>
                        <Box
                            component="form"
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}
                            noValidate
                            autoComplete="off"
                        >
                            <TextField
                                id="outlined-basic"
                                label="Input your recipe name....."
                                value={recipeName}
                                onChange={(e) => setRecipeName(e.target.value)}
                                variant="outlined"
                                sx={{
                                    fontFamily: 'Poppins',
                                    fontSize: '12px',
                                    fontWeight: 400,
                                    lineHeight: '21px',
                                    color: '#A5ABB0',
                                    width: '100%',
                                    height: 50,
                                    '& .MuiInputBase-root': {
                                        height: '100%',
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '8px',
                                    },
                                }}
                            />
                        </Box>
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', gap: 1 }}>
                    <Button onClick={onClose} sx={{
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        fontWeight: 700,
                        lineHeight: '24px',
                        textTransform: 'none',
                        color: '#000000',
                        '&:hover': { backgroundColor: '#ffffff' },
                        height: 50,
                        margin: 2,
                        padding: '0 16px',
                        width: 'auto',
                        minWidth: 150
                    }}>
                        Cancel
                    </Button>
                    <Button onClick={handleCreateRecipe} variant="contained"
                        sx={{
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                            fontWeight: 700,
                            lineHeight: '24px',
                            textTransform: 'none',
                            backgroundColor: '#2FB62D',
                            '&:hover': { backgroundColor: '#2FB62D' },
                            height: 50,
                            margin: 2,
                            padding: '0 16px',
                            width: 'auto',
                            minWidth: 150
                        }}>
                        Create New Recipe
                    </Button>
                </DialogActions>

            </Dialog>
        </React.Fragment>
    );
}
export default CreateRecipeDialog;
