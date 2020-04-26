import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import TimerIcon from '@material-ui/icons/Timer';
import { Rating } from '@material-ui/lab';
import servings from './images/servings.png';
import bulletPoint from './images/bullet-point.png';
import Button from "@material-ui/core/Button";
import { TextareaAutosize } from '@material-ui/core';
import { connect } from 'react-redux';
import './RecipesPage.css';
import forbiddenImage from "./images/403-Forbidden.gif";
import CircularProgress from "@material-ui/core/CircularProgress";

const mapStateToProps = state => ({

    loggedIn: state.loggedIn,
    isExpert: state.isUserExpert
});

function RecipesPage(props) {
    const [recipe, setRecipe] = useState({pictureLink: "recipe-picture.png"});
    const [ingredients, setIngredients] = useState([]);
    const [isRecipeLoaded, setIsRecipeLoaded] = useState(false);
    const [areIngredientsLoaded, setAreIngredientsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [isValid, setIsValid] = useState(true);
    const [evaluatorRemarks, setEvaluatorRemarks] = useState("");
    let [userid, setUserId] = useState(0);
    let [username, setUserName] = useState("");
    const contentChange = event => setEvaluatorRemarks(event.target.value)

    let { id } = useParams();

    useEffect(() => {

        if(window.location.pathname.includes("evaluate")) {
            setIsValid(props.loggedIn && props.isExpert);
        }

        // const url = (window.location.pathname.includes("evaluate")) ? "http://localhost:8080/api/pending/getDetails/" :
        //     "http://localhost:8080/api/recipes/getDetails/";

        const url = (window.location.pathname.includes("evaluate")) ?
            "https://spoons-and-ladles-backend.herokuapp.com/api/pending/getDetails/" :
            "https://spoons-and-ladles-backend.herokuapp.com/api/recipes/getDetails/";

        fetch(url + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setRecipe(result);
                    setIsRecipeLoaded(true);
                    setUserId(result.userId);
                    getUserName(result.userId);
                },
                (error) => {
                        setError(error);
                        setIsRecipeLoaded(true);
                }
            );
        

        // fetch("http://localhost:8080/api/ingredients/forRecipe/" + id)
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/ingredients/forRecipe/" + id)
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

    function getUserName(idofuser){
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/users/getInfo/"+idofuser)
                .then(res => res.json())
                .then((result)=>{
                    setUserName(result.firstName+" "+result.lastName);
                },
                (error) => {
                    setError(error);
                })
    }
    if(error !== null) {
        return <div> Oops! Try back again! </div>
    }

    function evaluateRecipe(isAccepted) {
        let postRequestBody = {
            pendingRecipeId: id,
            accepted: isAccepted
        };

        if(evaluatorRemarks !== '')
            postRequestBody.evaluationRemarks = evaluatorRemarks;

        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/pending/evaluate", {
        // fetch("http://localhost:8080/api/pending/evaluate", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postRequestBody)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    result ?
                        handleEvaluationSuccess() :
                        handleEvaluationFailure();
                },
                (error) => {
                    window.location.replace('/serverError');
                }
            );
    }

    function handleEvaluationSuccess() {
        alert('Entry successful! Head back to Evaluate Recipes page?');
        window.location.replace("/evaluateRecipes");
    }

    function handleEvaluationFailure() {
        window.location.replace('/serverError');
    }

    function rateThisRecipe (event, value) {
        if(!props.loggedIn) {
            alert("Users must be logged in to rate recipes!");
        }
        else {
            fetch("https://spoons-and-ladles-backend.herokuapp.com/api/recipes/rate", {
                // fetch("http://localhost:8080/api/recipes/rate", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({recipeId: id, rating: value})
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result) {
                            alert('Recipe rated successfully!');
                            window.location.reload();
                        } else alert('Oops! Something went wrong! Try again later!');
                    },
                    (error) => {
                        window.location.replace('/serverError');
                    }
                );
        }
    }


    return(
        isValid
            ?
        !isRecipeLoaded && !areIngredientsLoaded ? <div className="spinner-div"> <CircularProgress className="spinner"/> </div> :
            <div className="one-recipe">
                <img
                    src={require("./images/Recipes/" + recipe.pictureLink)}
                    alt={'Picture of ' + recipe.recipeName}
                    className="recipe-image"
                />
                <div className="recipe-intro">
                    <div className="recipe-title"> { recipe.recipeName !== undefined ? recipe.recipeName.toUpperCase() : "" } </div>
                    <div className="recipe-user">
                        { (recipe.userId === 1) ? 'A Spoons & Ladles original recipe' : 'by user ' + username }
                    </div>
                    <div className="intro-flexbox">
                        <div className="recipe-prep-time">
                            <TimerIcon className="prep-time-clock"/>
                            {recipe.prepTime}
                        </div>
                        <div className="recipe-rating">
                            <Rating name="rating-stars"
                                    value={recipe.rating/recipe.numberOfReviewers}
                                    defaultValue={0}
                                    precision={0.1}
                                    id="recipeStars"
                                    onChange={rateThisRecipe}
                            />
                            {(recipe.numberOfReviewers === 0 ? 0 : recipe.rating/recipe.numberOfReviewers).toFixed(1) + ' (From ' + recipe.numberOfReviewers + ' ratings)'}
                        </div>
                    </div>
                    <div className="intro-flexbox">
                    {   
                        (recipe.keywords !== undefined && recipe.keywords !== null) ?
                           <div className="recipe-keywords">
                                {
                                    recipe.keywords.split(',').map(function (keyword) {
                                        return <div className="keyword">
                                                    { keyword }
                                                </div>;
                                        })
                                }
                            </div> :
                            null
                    }
                        <div className="recipe-servings">
                            <img
                                src={servings}
                                alt="Serving size"
                            />
                            {recipe.servings}
                        </div>
                    </div>
                </div>

                <div className="recipe-details">
                    {
                        ingredients !== undefined ?
                            <div className="recipe-ingredients">
                                <span className="recipe-detail-title"> INGREDIENTS </span>
                                {
                                    ingredients.map(function(ingredient) {
                                        return <div className="ingredient">
                                                    <img
                                                        src = {bulletPoint}
                                                        className="ingredient-bullet-point"
                                                        alt="Bullet Point"
                                                    />
                                                    <div>
                                                        <span className="ingredient-name">{ ingredient.ingredientName } </span>
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
                                <span className="recipe-detail-title"> INSTRUCTIONS </span>
                                {
                                    recipe.instructions.split('|').map(function(instruction, i) {
                                        return <div className="instruction" key={i}>
                                            <span className="instruction-number"> {i + 1} </span>
                                            <span className="instruction-text"> { instruction } </span>
                                        </div>
                                    })
                                }
                            </div> :
                            null
                    }
                </div>

                {
                    window.location.pathname.includes("evaluate") ?
                        <div className="recipe-evaluation-options">
                            <div id="evaluationDivTitle"> EVALUATION </div>
                            <TextareaAutosize
                                id="evaluatorRemark"
                                rowsMin={3}
                                placeholder="Enter remarks"
                                onChange={contentChange}
                            />
                            <div id="acceptDenyButtons">
                                <Button
                                    variant="contained"
                                    id="acceptButton"
                                    size="large"
                                    onClick={ () => evaluateRecipe(true) }
                                >
                                    Accept
                                </Button>
                                <Button
                                    variant="contained"
                                    id="denyButton"
                                    size="large"
                                    onClick={ () => evaluateRecipe(false) }
                                >
                                    Deny
                                </Button>
                            </div>
                        </div>
                        : null
                }
            </div>
            :
            <div className="forbidden-access-div">
                <img
                    src={forbiddenImage}
                    alt="403 Forbidden access image"
                />
            </div>
    )
}

export default connect(mapStateToProps, {})(RecipesPage);
