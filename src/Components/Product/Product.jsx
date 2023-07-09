import React, { useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DataContext from '../../Context/dataContext';
import './Product.css';

export default function Product({ _id, name, price, category, count, image, description }) {
    const dataContext = useContext(DataContext);
    const addToCart = (id) => {
        const product = dataContext.allProducts.find(product => product._id === id);
        dataContext.cartProductsHandler(product)
    };

    return (
        <Card sx={{ width: 340, minWidth: 150 }}>
            <CardMedia
                sx={{ height: 430 }}
                image={image}
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" dir='rtl'>
                    {name}
                </Typography>
                <Typography gutterBottom variant="h5" component="div" dir='rtl'>
                    ${price}
                </Typography>
                <Typography variant="body2" color="text.secondary" dir='rtl'>
                    {description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant='outlined' onClick={() => addToCart(_id)}>اضافه به سبد</Button>
            </CardActions>
        </Card>
    )
}
