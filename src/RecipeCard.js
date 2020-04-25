import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from'@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {
    NavLink
} from "react-router-dom";
import './RecipeCard.css';
import servings from "./images/servings-blue.png";

const useStyles = makeStyles({
    root: {
        margin: 10,
        maxHeight: 480,
        maxWidth: 280
    },
    content: {
        
    },
    text: {

    }
});

function RecipeCard(props) {
    const classes = useStyles();
    return (
        <Card className = {classes.root} id="card-for-each-recipe">
            <NavLink to={"/recipe/" + props.recipe.recipeId} className="nav-links">
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
                    <div className="recipe-servings" id="recipe-servings-card-bottom">
                        <img
                            src={servings}
                            alt="Serving size"
                        />
                        {props.recipe.servings}
                    </div>
                    <div className="card-bottom-preptime">
                        <ScheduleIcon className = "clock-icon"></ScheduleIcon>
                        <Typography className = "content-text" variant="body2" color="textSecondary" component="p">
                            {props.recipe.prepTime}
                        </Typography>
                    </div>
                </CardActions>
            </NavLink>
        </Card>
    );
}

export default RecipeCard;
