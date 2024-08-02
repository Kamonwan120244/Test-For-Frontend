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
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

interface RecipeDialogProps {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteRecipeDialog: React.FC<RecipeDialogProps> = ({ open, onClose, onDelete }) => {

    const handleDelete = () => {
        onDelete();
        onClose();
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
                                backgroundColor: '#FFF5F6',
                                borderRadius: '50%',
                                marginBottom: 1,
                            }}
                        >
                            <ReportProblemIcon sx={{ color: '#FF3F56' }} />
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
                            Delete Recipe
                        </Typography>
                    </Box>
                </DialogTitle>
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
                    <Button onClick={handleDelete} variant="contained"
                        sx={{
                            fontFamily: 'Poppins',
                            fontSize: '16px',
                            fontWeight: 700,
                            lineHeight: '24px',
                            textTransform: 'none',
                            backgroundColor: '#FF3F56',
                            '&:hover': { backgroundColor: '#FF3F56' },
                            height: 50,
                            margin: 2,
                            padding: '0 16px',
                            width: 'auto',
                            minWidth: 150
                        }}>
                        Delete
                    </Button>
                </DialogActions>

            </Dialog>
        </React.Fragment>
    );
}
export default DeleteRecipeDialog;
