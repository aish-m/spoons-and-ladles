import React from 'react';
import Grid from '@material-ui/core/Grid';
import RecipeCard from './RecipeCard';
import { connect } from 'react-redux';
import { updateRecipes, changeTabValue } from './redux/actionCreators.js';
import './RecipeGrid.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from "@material-ui/core/Fab";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ScrollTop from "./BackToTopScroll";

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
        
        if(this.props.ingredientsListLength > 0) {//!this.props.showAllRecipes){
            let ingSend = [];
            // eslint-disable-next-line array-callback-return
            this.props.ingredientsList.map(function(ing) {
                ingSend.push(ing.id)
            });
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ingredientList: ingSend }),
            };
            fetch("https://spoons-and-ladles-backend.herokuapp.com/api/recipes/fetch", requestOptions)
            // fetch("http://localhost:8080/api/recipes/fetch", requestOptions)
                .then(res => {
                    if(res.ok) return res.json();
                    else throw new Error ("Oops, something went wrong...");
                })
                .then((data) => {this.props.updateRecipes(data);
                    if(this.state.isLoading) this.setState({ isLoading: false })
                })
                .catch((error) => {
                    if(this.state.isLoading)
                        this.setState({ isLoading: false, error });
                    window.location.replace('/serverError');
                });
        } else {//if (this.props.showAllRecipes){
            fetch("https://spoons-and-ladles-backend.herokuapp.com/api/recipes/getAll")
            // fetch("http://localhost:8080/api/recipes/getAll")
            .then(res => {
                if(res.ok) return res.json();
                else throw new Error ("Oops, something went wrong...");
            })
            .then((data) => {this.props.updateRecipes(data);
                if(this.state.isLoading) this.setState({ isLoading: false })
            })
            .catch((error) => {
                if(this.state.isLoading) this.setState({ isLoading: false, error });
                window.location.replace('/serverError');
            });
        }
    };

    componentDidMount(){
        this.props.changeTabValue(1);
        this.fetchData();
    }

    componentDidUpdate(){
        //this.fetchData();
    }

    render(){
        const recipesList = this.props.recipesList;
        const isLoading = this.state.isLoading;
        const error = this.state.error;

        if(error){
            return <h1>{error.message}</h1>
        }
        if(isLoading){
            return <div className="spinner-div"> <CircularProgress className="spinner"/> </div>;
        }

        return (
            <div className="recipe-grid-div">
                <div className="recipes-grid-title">
                    {
                        this.props.ingredientsListLength === 0 ?
                            "ALL RECIPES" :
                            "RECIPES FOR SELECTED INGREDIENTS"
                    }
                </div>
                <Grid container className = "grid-container" spacing = {0}>
                    {recipesList.map(recipe =>
                        <Grid item md = {0}>
                            <RecipeCard
                                recipe = {recipe}
                            />
                        </Grid>
                    )}
                </Grid>
                <ScrollTop {...this.props}>
                    <Fab className="scroll-fab" size="large" aria-label="scroll back to top">
                        <ExpandLessIcon style={{ color: 'white' }} fontSize="large"/>
                    </Fab>
                </ScrollTop>
            </div>
        );
    }
}

export default connect(mapStateToProps, { updateRecipes, changeTabValue  }) (RecipesGrid);
