import React, {Component} from "react";
import './MyRecipesPage.css';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

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

    componentDidMount(){
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/pending/forUser/2")
          .then(res => {console.log(res);
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
          });
    }


     handleClick = (index)  => {
        let temp = this.state.openlist;
        temp[index] = !temp[index];
        this.setState({ openlist: temp });
    }
    render(){
       
        return(
            <div>
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
                    {this.state.recipesData.map((row, index) => {
                        return(
                            <div>
                            <ListItem button onClick={()=> {this.handleClick(index)}}>
                            <ListItemAvatar>
                                <Avatar alt="Remy Sharp" src= {require("./images/Recipes/" + row["pictureLink"])} />
                                </ListItemAvatar>
                                <ListItemText primary={row["recipeName"]} />
                                <br></br>
                                <ListItemText primary={ 
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Number of Servings:

                                    </Typography>
                                    {" "+row["servings"]}
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        <br></br>
                                        Preparation Time:
                                    </Typography>
                                    {"  "+row["prepTime"]}
                                    <br></br>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                       Date of submission:

                                    </Typography>
                                    {" "+new Date(row["submissionDate"]).toLocaleDateString("en-US", this.state.options)}
                                    
                                </React.Fragment>
                                 }/>

                                <ListItemText primary={ 
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        Recipe Status:

                                    </Typography>
                                    {" "+row["status"]}
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        <br></br>
                                        Remarks:
                                    </Typography>
                                    {"  "+row["evaluatorRemarks"]}
                                </React.Fragment>
                                 }/>

                                {this.state.openlist[index] ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={this.state.openlist[index]} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                <ListItem button className={useStyles.nested}>
                                    <ListItemText secondary={
                                    <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                    >
                                        Instructions:

                                    </Typography>
                                    {"  "+row["instructions"]}
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

function AdminPage(props) {
    return(
        <MyRecipesPageComponent></MyRecipesPageComponent>
    )
}

export default AdminPage;