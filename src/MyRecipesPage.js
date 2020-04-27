import React, {Component} from "react";
import './MyRecipesPage.css';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { connect } from "react-redux";
import { changeTabValue } from "./redux/actionCreators";
import noRecipesImg from './images/no-submitted-recipes.gif';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const spanStyle = {
    'ACCEPTED' : 'forestgreen',
    'DENIED' : '#dc2a27',
    'PENDING APPROVAL' : '#4267B2'
};

const mapStateToProps = state => ({
    user: state.loggedInUser
});

class MyRecipesPageComponent extends Component {
    constructor(props) {
        super(props);
        
        //this.makelist = this.makelist.bind(this);
        this.state={
            recipesData: [],
            columns: [],
            page:0,
            rowsPerPage:10,
            tableStyle : {display:'unset'},
            imageStyle: {height: "250px"},
            openlist: null,
            options : { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        }
    }

    componentDidMount() {
        this.props.changeTabValue(-1);
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/pending/forUser/"+ this.props.user.userId)
        // fetch("http://localhost:8080/api/pending/forUser/"+ this.props.user.userId)
          .then(res => {
            return res.json()   
          })
          .then((data) => {
                this.setState({
                     recipesData : Object.assign(this.state.recipesData,data),
                     columns : Object.keys(data[0]),
                     openlist :  new Array(data.length).fill(false)
                
                })
          })
          .catch(error => {
                console.log("error    "+error);
                // window.location.replace('/serverError');
          });
    }


     handleClick = (index)  => {
        let temp = this.state.openlist;
        temp[index] = !temp[index];
        this.setState({ openlist: temp });
    };

    render () {
        return(
            <div className="my-recipes-div">
                <List
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            MY RECIPES
                        </ListSubheader>
                    }
                    className={useStyles.root}
                    >
                    {
                        this.state.recipesData.length === 0 ?
                            <div id="no-recipes-div">
                                <img
                                    src={noRecipesImg}
                                    alt="No submitted recipes GIF"
                                    id="noSubmittedRecipesGif"
                                />
                                <Button variant="contained"
                                        id="goToSubmitRecipesButton"
                                        size="large"
                                >
                                    SUMBIT A RECIPE
                                </Button>
                            </div> :
                            null
                    }
                    {this.state.recipesData.map((row, index) => {
                        console.log(row)
                        return(
                            <div>
                            <ListItem button onClick={()=> {this.handleClick(index)}}>
                                <ListItemAvatar>
                                    <Avatar alt="Remy Sharp" src= {require("./images/Recipes/" + row["pictureLink"])} />
                                </ListItemAvatar>
                                <ListItemText id="my-recipe-title" primary={row["recipeName"]}/>
                                <ListItemText className = "myrecipe-mobile" primary={ 
                                    <React.Fragment> 
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Recipe Status:

                                    </Typography>
                                        <span
                                            className="recipe-evaluation-status"
                                            style = { { backgroundColor: spanStyle[row.status] } }
                                        >
                                            {row["status"]==="PENDING APPROVAL"? "SUBMITTED" : row["status"]}
                                        </span>
                                    
                                    </React.Fragment>
                                }/>
                                <br></br>

                                <ListItemText className = "myrecipe-desktop" primary={ 
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Number of Servings:

                                    </Typography>
                                        <span className="my-recipe-details"> {" "+row["servings"]} </span>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        <br></br>
                                        Preparation Time:
                                    </Typography>
                                        <span className="my-recipe-details"> {"  "+row["prepTime"]} </span>
                                    <br></br>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                       Date of submission:

                                    </Typography>
                                        <span className="my-recipe-details">
                                            {" "+new Date(row["submissionDate"]).toLocaleDateString("en-US", this.state.options)}
                                        </span>
                                    
                                </React.Fragment>
                                 }/>

                                <ListItemText className = "myrecipe-desktop" primary={ 
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Recipe Status:

                                    </Typography>
                                        <span
                                            className="recipe-evaluation-status"
                                            style = { { backgroundColor: spanStyle[row.status] } }
                                        >
                                            {row["status"]==="PENDING APPROVAL"? "SUBMITTED" : row["status"]}
                                        </span>
                                    {row.evaluatorRemarks !== null ?
                                        <div>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                <br></br>
                                                Remarks:
                                            </Typography>
                                            {"  "+row["evaluatorRemarks"]}
                                        </div>
                                        : null
                                    }
                                </React.Fragment>
                                 }/>

                                {this.state.openlist[index] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.openlist[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                
                                <ListItemText className = "myrecipe-mobile-nonstatus" primary={ 
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Number of Servings:

                                    </Typography>
                                        <span className="my-recipe-details"> {" "+row["servings"]} </span>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        <br></br>
                                        Preparation Time:
                                    </Typography>
                                        <span className="my-recipe-details"> {"  "+row["prepTime"]} </span>
                                    <br></br>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                       Date of submission:

                                    </Typography>
                                        <span className="my-recipe-details">
                                            {" "+new Date(row["submissionDate"]).toLocaleDateString("en-US", this.state.options)}
                                        </span>
                                    
                                </React.Fragment>
                                 }/>
                                <ListItemText className = "myrecipe-mobile-nonstatus" primary={ 
                                    <React.Fragment>
                                    
                                    {row.evaluatorRemarks !== null ?
                                        <div>
                                            <Typography
                                                component="span"
                                                variant="body2"
                                                color="textPrimary"
                                            >
                                                Remarks:
                                            </Typography>
                                            {"  "+row["evaluatorRemarks"]}
                                        </div>
                                        : null
                                    }
                                </React.Fragment>
                                 }/>

                                <ListItem button className={useStyles.nested} id="my-recipe-instructions">
                                    <ListItemText secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        Instructions:

                                    </Typography>
                                        <br/>
                                        <span className="my-recipe-details"> {"  "+row["instructions"]} </span>
                                    </React.Fragment>
                                    }>
                                    </ListItemText>

                                    

                                </ListItem>
                                </List>
                            </Collapse>
                            <Divider variant="inset" component="li" />
                        </div>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default connect(mapStateToProps, { changeTabValue }) (MyRecipesPageComponent);
