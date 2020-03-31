import React from 'react';
import RecipesGrid from './RecipesGrid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    grid:{
    },

})

function RecipesPage(){
    const classes = useStyles();
    return(
        <RecipesGrid className = {classes.grid}/>
    )
}


export default RecipesPage;