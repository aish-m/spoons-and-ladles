import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";

function RecipesPage() {
    const [recipe, setRecipe] = useState({pictureLink: "picture.png"});
    const [ingredients, setIngredients] = useState([]);
    const [isRecipeLoaded, setIsRecipeLoaded] = useState(false);
    const [areIngredientsLoaded, setAreIngredientsLoaded] = useState(false);
    const [error, setError] = useState(null);

    let { id } = useParams();

    useEffect(() => {
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
                <div className="recipe-intro">
                        <div className="recipe-title"> { recipe.recipeName } </div>
                        <div className="recipe-prep-time"> {recipe.prepTime} </div>
                        <div className="recipe-rating"> {recipe.rating} </div>
                        <div className="recipe-servings"> {recipe.servings} </div>
                </div>
                <div className="recipe-details">
                    <div className="recipe-main">
                        <img
                            src={require("./images/Recipes/" + recipe.pictureLink)}
                            alt={'Picture of ' + recipe.recipeName}
                            className="recipe-image"
                        />
                        <div className="recipe-instructions"> {recipe.instructions} </div>
                    </div>
                    <div className="recipe-sidebar">
                        <div className="recipe-keywords"> {recipe.keywords} </div>
                    </div>
                </div>
            </div>
    )
}

export default RecipesPage;
