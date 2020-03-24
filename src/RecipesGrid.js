import React from 'react';
import { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';
import './RecipePage.css';

/*class RecipesGrid extends Component{

    /*constructor(props){
        super(props);
        this.state = {
            recipes: [],
        }
    }
    

    componentDidMount() {
        fetch("http://localhost:8080/api/recipes/getAll")
        .then(res => res.json()
        )
        .then(
            (data) => {
                console.log(data)
                let recipeList = data;
                this.setState({recipes: recipeList})
                console.log(this.state.recipes)
            }
        )
        .catch(console.log("check"));
    }

    render() {
        return(
            <Grid container className = "grid-container" spacing = {24}>
                <Grid item md = {3}>
                    <RecipeCard
                        recipes = {this.state.recipes}
                    />
                </Grid>
                <Grid item md = {3}>            
                    <RecipeCard
                        imgurl = "mutton-biryani.jpg"
                        recipeName = "Mutton Biryani"
                        recipeDesc = "Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua."
                    />
                </Grid>
                <Grid item md = {3}>            
                    <RecipeCard
                        imgurl = "trifle.jpg"
                        recipeName = "Trifle"
                        recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua."
                    />
                </Grid>
                <Grid item md = {3}>            
                    <RecipeCard
                        imgurl = "gyro-salad.jpg"
                        recipeName = "Gyro Salad"
                        recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua."
                    />
                </Grid>
                <Grid item md = {3}>            
                    <RecipeCard
                        imgurl = "instant-pot-ramen.jpg"
                        recipeName = "Instant Pot Ramen"
                        recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua."
                    />
                </Grid>
                <Grid item md = {3}>            
                    <RecipeCard
                        imgurl = "pesto-pasta.jpg"
                        recipeName = "Pesto Pasta"
                        recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua."
                    />
                </Grid>
                <Grid item md = {3}>            
                    <RecipeCard
                        imgurl = "sushi.jpg"
                        recipeName = "Sushi"
                        recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua."
                    />
                </Grid>
                <Grid item md = {3}>            
                    <RecipeCard
                        imgurl = "thai-fried-rice.jpg"
                        recipeName = "Thai Fried Rice"
                        recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua."
                    />
                </Grid>
                <Grid item md = {3}>            
                    <RecipeCard
                        imgurl = "boba-tea.jpg"
                        recipeName = "Boba Tea"
                        recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                        adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna aliqua."
                    />
                </Grid>
            </Grid>
        )
    }
}*/
function RecipesGrid(){
    return(
        <Grid container className = "grid-container" spacing = {24}>
            <Grid item md = {3}>            
                <RecipeCard
                    imgurl = "mutton-biryani.jpg"
                    recipeName = "Mutton Biryani"
                    recipeDesc = "Lorem ipsum dolor sit amet, consectetur
                    adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua."
                />
            </Grid>
            <Grid item md = {3}>            
                <RecipeCard
                    imgurl = "trifle.jpg"
                    recipeName = "Trifle"
                    recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua."
                />
            </Grid>
            <Grid item md = {3}>            
                <RecipeCard
                    imgurl = "gyro-salad.jpg"
                    recipeName = "Gyro Salad"
                    recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua."
                />
            </Grid>
            <Grid item md = {3}>            
                <RecipeCard
                    imgurl = "instant-pot-ramen.jpg"
                    recipeName = "Instant Pot Ramen"
                    recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua."
                />
            </Grid>
            <Grid item md = {3}>            
                <RecipeCard
                    imgurl = "pesto-pasta.jpg"
                    recipeName = "Pesto Pasta"
                    recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua."
                />
            </Grid>
            <Grid item md = {3}>            
                <RecipeCard
                    imgurl = "sushi.jpg"
                    recipeName = "Sushi"
                    recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua."
                />
            </Grid>
            <Grid item md = {3}>            
                <RecipeCard
                    imgurl = "thai-fried-rice.jpg"
                    recipeName = "Thai Fried Rice"
                    recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua."
                />
            </Grid>
            <Grid item md = {3}>            
                <RecipeCard
                    imgurl = "boba-tea.jpg"
                    recipeName = "Boba Tea"
                    recipeDesc = "Lorem ipsum dolor sit amet, consectetur 
                    adipiscing elit, sed do eiusmod tempor incididunt ut 
                    labore et dolore magna aliqua."
                />
            </Grid>
        </Grid>
    )


}

export default RecipesGrid;
