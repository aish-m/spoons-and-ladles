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
import {
    NavLink
} from "react-router-dom";

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

function RecipeCard(props) {
    const classes = useStyles();
    return (
        <Card className = {classes.root}>
            <CardActionArea>
                <img className = 'card-img'
                    src = {require("./images/Recipes/" + props.recipe.pictureLink)}
                    alt = {props.recipe.recipeName}
                />
                <CardContent className = "content">
                    <Typography className = "content-head" gutterBottom variant = "h5" component = "h2">
                        {props.recipe.recipeName}
                    </Typography>
                    <Typography className = "content-text" variant="body2" color="textSecondary" component="p">
                        {props.recipe.instructions}
                    </Typography>
                </CardContent>               
            </CardActionArea>
            <CardActions className = "card-bottom">
                <NavLink to={"/recipe/" + props.recipe.recipeId} className="nav-links">
                    <Button size = "small" color = "primary"
                    >
                        Open
                    </Button>
                </NavLink>
                
                <ScheduleIcon className = "clock-icon"></ScheduleIcon>
                <Typography className = "content-text" variant="body2" color="textSecondary" component="p">
                    {props.recipe.prepTime}
                </Typography>
            </CardActions>
        </Card>
    );
}

export default RecipeCard;
