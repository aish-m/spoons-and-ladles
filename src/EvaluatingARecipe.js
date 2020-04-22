import React from 'react';
import { withRouter } from "react-router-dom";
import {
    useParams
} from "react-router-dom";

import Button from "@material-ui/core/Button";
import {Component} from "react";

console.log();

class EvaluateRecipeClass extends Component{
    
    constructor(props) {
        super(props);
    this.state ={
        pictureLink: "picture.png",
        recipe: null,
        setRecipe: null,
        ingredients:null,
        setIngredients:null,isRecipeLoaded:false,
        setIsRecipeLoaded : null,
        areIngredientsLoaded: false,
        setAreIngredientsLoaded : null,
        error:null,
        setError : null,
        id:parseInt(window.location.href.split("/")[5])
    }
    }
    

    componentDidMount() {
        
        //console.log(id2);
        console.log(this.state.id);
        fetch("http://localhost:8080/api/pending/getDetails/" + this.state.id)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        recipe : result
                    })
                        
                        //setRecipe(result);
                        //setIsRecipeLoaded(true);
                },
                (error) => {
                        console.log(error)
                        //setError(error);
                        //setIsRecipeLoaded(true);
                }
            );

        fetch("http://localhost:8080/api/ingredients/forRecipe/" + this.state.id)
            .then(res => res.json())
            .then(
                (result) => {
                console.log(result)
                this.setState({
                    ingredients : result
                })
                    //setIngredients(result);
                    //setAreIngredientsLoaded(true);
                },
                (error) => {
                    console.log(error)
                    //setError(error);
                    //setAreIngredientsLoaded(true);
                }
            );
    };


     render(){
         return(
            <div>{this.state.id}
            {/* <div className="one-recipe">
                <div className="recipe-intro">
                        <div className="recipe-title"> { this.state.recipe.recipeName } </div>
                        <div className="recipe-prep-time"> { this.state.recipe.prepTime} </div>
                        <div className="recipe-rating"> {this.state.recipe.rating} </div>
                        <div className="recipe-servings"> {this.state.recipe.servings} </div>
                </div>
                <div className="recipe-details">
                    <div className="recipe-main">
                        <img
                            src={require("./images/Recipes/" + this.state.recipe.pictureLink)}
                            alt={'Picture of ' + this.state.recipe.recipeName}
                            className="recipe-image"
                        />
                        <div className="recipe-instructions"> {this.state.recipe.instructions} </div>
                    </div>
                    <div className="recipe-sidebar">
                        <div className="recipe-keywords"> {this.state.recipe.keywords} </div>
                    </div>

                </div>
                
            </div> */}
        </div>
         )
     }
        // !isRecipeLoaded && !areIngredientsLoaded ? <div> Loading recipe... </div> :
        
}

// function EvaluateARecipe() {
//     return (    
//         <div>
//             <EvaluateRecipeClass/>
//         </div>
//     )
// }
    

export default withRouter(EvaluateRecipeClass);
