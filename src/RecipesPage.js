import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import TimerIcon from '@material-ui/icons/Timer';
import { Rating } from '@material-ui/lab';
import servings from './images/servings.png';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

function RecipesPage() {
    const [recipe, setRecipe] = useState({pictureLink: "picture.png"});
    const [ingredients, setIngredients] = useState([]);
    const [isRecipeLoaded, setIsRecipeLoaded] = useState(false);
    const [areIngredientsLoaded, setAreIngredientsLoaded] = useState(false);
    const [error, setError] = useState(null);

    let { id } = useParams();

    useEffect(() => {
        console.log('useEffect called!');
        fetch("http://localhost:8080/api/recipes/getDetails/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setRecipe(result);
                    setIsRecipeLoaded(true);
                },
                (error) => {
                        setError(error);
                        setIsRecipeLoaded(true);
                }
            );

        fetch("http://localhost:8080/api/ingredients/forRecipe/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setIngredients(result);
                    setAreIngredientsLoaded(true);
                },
                (error) => {
                    setError(error);
                    setAreIngredientsLoaded(true);
                }
            );
    }, []);

    if(error !== null) {
        return <div> Oops! Try back again! </div>
    }

    return(
        !isRecipeLoaded && !areIngredientsLoaded ? <div> Loading recipe... </div> :
            <div className="one-recipe">
                <img
                    src={require("./images/Recipes/" + recipe.pictureLink)}
                    alt={'Picture of ' + recipe.recipeName}
                    className="recipe-image"
                />
                <div className="recipe-intro">
                    <div className="recipe-title"> { recipe.recipeName } </div>
                    <div className="recipe-user"> { 'Submitted by: ' + recipe.userId } </div>
                    <div className="recipe-prep-time">
                        <TimerIcon fontSize="large" className="prep-time-clock"/>
                        {recipe.prepTime}
                    </div>
                    <div className="recipe-rating">
                        <Rating name="half-rating"
                                value={recipe.rating/recipe.numberOfReviewers}
                                defaultValue={0}
                                precision={0.1}
                            id="recipeStars"
                        />
                        {(recipe.numberOfReviewers === 0 ? 0 : recipe.rating/recipe.numberOfReviewers).toFixed(1) + ' (From ' + recipe.numberOfReviewers + ' ratings)'}
                    </div>
                    <div className="recipe-servings">
                        <img
                            src={servings}
                            alt="Serving size"
                        />
                        {recipe.servings}
                    </div>
                    {
                        (recipe.keywords !== undefined) ?
                           <div className="recipe-keywords">
                                {
                                    recipe.keywords.split(',').map(function (keyword) {
                                        return <div className="keyword">
                                                    <LocalOfferIcon fontSize="small" className="keyword-icon"/>
                                                    { keyword }
                                                </div>;
                                        })
                                }
                            </div> :
                            null
                    }
                </div>
                <div className="recipe-details">
                    {
                        ingredients !== undefined ?
                            <div className="recipe-ingredients">
                                INGREDIENTS:
                                {
                                    ingredients.map(function(ingredient) {
                                        return <div className="ingredient">
                                                    <div className="ingredient-name">
                                                        { ingredient.ingredientName }
                                                    </div>
                                                    <div className="ingredient-measurement">
                                                        { '(' + ingredient.pictureLink + ')'}
                                                    </div>
                                                </div>
                                    })
                                }
                            </div> :
                            null
                    }
                    {
                        recipe.instructions !== undefined ?
                            <div className="recipe-instructions">
                                {
                                    recipe.instructions.split('|').map(function(instruction) {
                                        return <div className="instruction"> { instruction } </div>
                                    })
                                }
                            </div> :
                            null
                    }
                </div>
            </div>
    )
}

export default RecipesPage;
