import React, {Component, useEffect} from "react";
import './EvaluateRecipe.css';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {NavLink} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));
  const url="/images/Recipes/"; //C:\Users\neera\Documents\ISDProject\spoons-and-ladles\src\images\Recipes\boba-tea.jpg
class EvaluateRecipeComponent extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            listedrecipes:[],
            openSpecificRecipe : null
        }
    }
    componentDidMount(){
    fetch("http://localhost:8080/api/pending/getRecipes/2")
          .then(res => {console.log(res);
            return res.json()
          })
          .then((data) => {
            this.setState({
                listedrecipes : data
            })
            console.log("Request complete! response:", data);
          })
          .catch(error => {
            console.log("error    "+error);
          }); 
    }

    // openRecipe(recipeid){
    //     console.log(recipeid);
    //     onClick = {() => this.openRecipe(recipe.pendingRecipeId)}
    // }

    render(){
       
        return(
           
            <div>
                <List> 
                    {this.state.listedrecipes.map(recipe=>
                    <NavLink to={"/evaluate/recipe/" + recipe.pendingRecipeId} className="nav-links"> 
                        <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp"  src= {require("./images/Recipes/" + recipe.pictureLink)} />
                        {/* src= {require("./images/Recipes/" + props.recipe.pictureLink)} */}
                        </ListItemAvatar>
                        <ListItemText
                        primary= {recipe.recipeName}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                // className={classes.inline}
                                color="textPrimary"
                            >
                            Instructions
                            </Typography>
                                {"     ---"+recipe.instructions.substring(0,200)+"..."}
                                {/* {" — I'll be in your neighborhood doing errands this…"} */}
                                
                            </React.Fragment> 
                        
                        }
                        
                        />
                        <div>
                                <ScheduleIcon className = "clock-icon"></ScheduleIcon>
                                <Typography className = "content-text" variant="body2" color="textSecondary" component="p">
                                    {recipe.prepTime}
                                </Typography>
                        </div>
                        </ListItem>
                        </NavLink>
                        )}
                    
                    {/* //className={classes.root} */}
                    
                </List>
            </div>
        )
    }
}

function EvaluateRecipe() {
    return (
        <EvaluateRecipeComponent>
            
        </EvaluateRecipeComponent>
        
    )
}

export default EvaluateRecipe;
