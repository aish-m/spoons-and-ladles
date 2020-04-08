import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from'@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './RecipesPage.css';

const useStyles = makeStyles({
    root: {
        margin: 10,
        maxHeight: 480,
        maxWidth: 280,
    },
    content: {
        
    },
    text: {

    },
});

function RecipeCard(recipes) {
    const classes = useStyles();
    return (
        <Card className = {classes.root}>
            <CardActionArea>
                <img className = 'card-img'
                    src = {require("./images/Recipes/" + recipes.imgurl)}
                    alt = {recipes.recipeName}
                />
                <CardContent className = "content">
                    <Typography className = "content-head" gutterBottom variant = "h5" component = "h2">
                        {recipes.recipeName}
                    </Typography>
                    <Typography className = "content-text" variant="body2" color="textSecondary" component="p">
                        {recipes.recipeDesc}
                    </Typography>
                </CardContent>               
            </CardActionArea>
            <CardActions className = "card-bottom">
                <Button size = "small" color = "primary">
                    Open
                </Button>
                
                <ScheduleIcon className = "clock-icon"></ScheduleIcon>
                <Typography className = "content-text" variant="body2" color="textSecondary" component="p">
                    {recipes.recipeTime}
                </Typography>
            </CardActions>
        </Card>
    );
}

export default RecipeCard;
