import React from 'react';
import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';
import './RecipesPage.css';
import { connect } from 'react-redux';
import { updateRecipes } from './redux/actionCreators.js'; 

function mapStateToProps(state) {
    return { ingredientsList: state.selectedIngredients,
        ingredientsListLength: state.selectedIngredients.length,
        showAllRecipes: state.showAllRecipes,
        recipesList: state.recipesList,
    };
}


class RecipesGrid extends React.Component {
    
        
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,
        };
    }

    fetchData = () => {
        
        if(!this.state.isLoading) this.setState({isLoading: true});
        
        if(this.props.ingredientsListLength > 0){//!this.props.showAllRecipes){
            let ingSend = [];
            this.props.ingredientsList.map(ing => {
                ingSend.push(ing.id)
            });
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredientList: ingSend }),
            };
            fetch("http://localhost:8080/api/recipes/fetch", requestOptions)
                .then(res => {
                    if(res.ok) return res.json();
                    else throw new Error ("Oops, something went wrong...");
                })
                .then((data) => {this.props.updateRecipes(data);
                    if(this.state.isLoading) this.setState({ isLoading: false })
                })
                .catch((error) => {
                    if(this.state.isLoading) this.setState({ isLoading: false, error });
                });
        } else {//if (this.props.showAllRecipes){
            fetch("http://localhost:8080/api/recipes/getAll")
            .then(res => {
                if(res.ok) return res.json();
                else throw new Error ("Oops, something went wrong...");
            })
            .then((data) => {this.props.updateRecipes(data);
                if(this.state.isLoading) this.setState({ isLoading: false })
            })
            .catch((error) => {
                if(this.state.isLoading) this.setState({ isLoading: false, error });
            });
        }
    } 

    componentDidMount(){
        this.fetchData();
    }

    componentDidUpdate(){
        //this.fetchData();
    }

    render(){
        const recipesList = this.props.recipesList;
        const isLoading = this.state.isLoading;
        const error = this.state.error;

        console.log(recipesList);
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

export default connect(mapStateToProps, { updateRecipes }) (RecipesGrid);