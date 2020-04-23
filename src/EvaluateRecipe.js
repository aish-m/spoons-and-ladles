import React, { Component } from "react";
import './EvaluateRecipe.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ScheduleIcon from '@material-ui/icons/Schedule';
import {NavLink} from "react-router-dom";
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    loggedIn: state.loggedInUser,
    isExpert: state.isUserExpert,
    user: state.loggedInUser
});

class EvaluateRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assignedRecipes:[],
            isValid: false
        }
    }

    componentDidMount(){
        if(this.props.loggedIn && this.props.isExpert) {
            this.setState({ isValid : true });

            fetch("https://spoons-and-ladles-backend.herokuapp.com/api/pending/getRecipes/" + this.props.user.userId)
            // fetch("http://localhost:8080/api/pending/getRecipes/" + this.props.user.userId)
                  .then(res => res.json())
                  .then((data) => {
                    this.setState({ assignedRecipes : data });
                  })
                  .catch(error => {
                    console.log("error: " + error);
                  });
        }
    }

    render(){
       
        return(
            <div>
                {
                    this.state.isValid ?
                        <List>
                            {
                                this.state.assignedRecipes.map(recipe=>
                                    <NavLink className= "evaluateLink" to={"/evaluate/recipe/" + recipe.pendingRecipeId} className="nav-links">
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp"  src= {require("./images/Recipes/" + recipe.pictureLink)} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary= {recipe.recipeName}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            Number of Servings:

                                                        </Typography>
                                                        {" "+recipe.servings}
                                                        <Typography
                                                            component="span"
                                                            variant="body2"
                                                            color="textPrimary"
                                                        >
                                                            <br></br>
                                                            Instructions:
                                                        </Typography>
                                                        {" "+recipe.instructions.substring(0,100)+"..."}
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
                                )
                            }
                        </List>
                        :
                        <div>
                            You must be logged in as an expert chef to evaluate recipes!
                        </div>
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, null)(EvaluateRecipe);
