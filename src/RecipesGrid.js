import React from 'react';
import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';
import './RecipesPage.css';
import { connect } from 'react-redux';

class RecipesGrid extends React.Component {
    
        
    constructor(props) {
        super(props);
        this.state = {
            recipesList:[],
            isLoading: false,
            error: null,
        };
    }

    

    componentDidMount(){

        this.setState({isLoading: true});

        fetch("http://localhost:8080/api/recipes/getAll")
            .then(res => {
                if(res.ok) return res.json();
                else throw new Error ("Oops, something went wrong...");
            })
            .then((data) => this.setState({
                isLoading: false,
                recipesList: data,
            }))
            .catch((error) => this.setState({
                error,
                isLoading: false,
            }))
    }

    render(){
        const recipesList = this.state.recipesList;
        const isLoading = this.state.isLoading;
        const error = this.state.error;

        if(error){
            return <h1>{error.message}</h1>
        }
        if(isLoading){
            return <h1>Working, hold on...</h1>
        }

        return (

            <Grid container className = "grid-container" spacing = {0}>
                {recipesList.map(recipe => 
                    <Grid item md = {3}>
                        <RecipeCard
                            imgurl = {recipe.pictureLink}
                            recipeName = {recipe.recipeName}
                            recipeDesc = {recipe.instructions}
                            recipeTime = {recipe.prepTime}
                        />
                    </Grid>
                )}
            </Grid>
        );
    }
}

export default connect(RecipesGrid.mapStateToProps, null) (RecipesGrid);
