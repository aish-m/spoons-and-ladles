import React, {Component} from "react";
import './AdminPage.css';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

class AdminPageComponent extends Component {
    
    constructor(props) {
        super(props);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.renderSwitch = this.renderSwitch.bind(this);
        // this. = this..bind(this);

        this.state = {
            tabletoshow: 100,
            objectsToDisplay: [], 
            columns : [],
            page:0,
            rowsPerPage:10
        }
    }
     handleChange = (event) => {
        this.setState({
            tabletoshow : event.target.value
        })
       console.log(this.state.tabletoshow + "  "+event.target.value);
       var temp = ""; 
       if(event.target.value===1){temp = "users"}
       else if(event.target.value===2){temp="ingredients"}
       else if(event.target.value===3){temp="pending_recipes"}
       else if(event.target.value===4){temp="recipes"}
       else if(event.target.value===5){temp="recipe_ingredient_map"}
       this.loadDatafromtable(temp);
      };

      loadDatafromtable(tablename){
        console.log(tablename);
        fetch("http://localhost:8080/api/getTable/"+tablename)
          .then(res => {console.log(res);
            return res.json()
          })
          .then((data) => {
                this.setState({
                    objectsToDisplay : Object.assign(this.state.objectsToDisplay,data),
                    columns : Object.keys(data[0])
                })
            console.log("Request complete! response:", tablename+"      "+data[0]+"  "+this.state.columns);
          })
          .catch(error => {
            console.log("error    "+error);
          });
      }
    
      handleClose = () => {
        //setOpen(false);
      };
    
       handleOpen = () => {
        //setOpen(true);
       };

      handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
      };

      handleChangeRowsPerPage = (event) => {
        this.setState({
            page: 0,
            rowsPerPage : event.target.value
        })
      };

    componentDidMount(){

    }

    renderSwitch(param) {
        switch(param) {
            case 'userId':
                return 'USER ID';
            case 'firstName':
                return 'FIRST NAME';
            case 'lastName':
                return 'LAST NAME';
            case 'pictureLink':
                return 'PICTURE LINK';
            case 'expert':
                return 'IS EXPERT?';
            case 'ingredientId':
                return 'INGREDIENT ID';
            case 'ingredientName':
                return 'INGREDIENT NAME';
            case 'pendingRecipeId':
                return 'PENDING RECIPE ID';
            case 'recipeName':
                return 'RECIPE NAME';
            case 'evaluatorId':
                return 'EVALUATOR ID';
            case 'evaluatorRemarks':
                return 'REMARKS';
            case 'recipeId':
                return 'RECIPE ID';
            case 'prepTime':
                return 'PREPARATION TIME';
            case 'numberOfReviewers':
                return 'NO OF REVIEWERS';
            case 'ingredientIds':
                return 'INGREDIENT ID'; 
            case 'submissionDate':
                return 'SUBMISSION DATE';    
            default:
                return param.toUpperCase();
        }
      }


    render(){
       
        return(
           
            <div>
                <Select
                    labelId="demo-controlled-open-select-label"
                    id="demo-controlled-open-select"
                     open={this.open}
                     onClose={this.handleClose}
                     onOpen={this.handleOpen}
                     value={this.state.tabletoshow}
                     onChange={this.handleChange}
                    >
                    <MenuItem value="">
                        <em>Select a table</em>
                    </MenuItem>
                    <MenuItem value={1}>Users</MenuItem>
                    <MenuItem value={2}>Ingredients</MenuItem>
                    <MenuItem value={3}>Pending Recipes</MenuItem>
                    <MenuItem value={4}>Recipes</MenuItem>
                    <MenuItem value={5}>Recipe Ingredient Associative Entity</MenuItem>
                    
                </Select>
                {this.state.objectsToDisplay}

                <Paper >
      <TableContainer >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {this.state.columns.map((column) => (
                <TableCell
                  key={column}
                >
                  {this.renderSwitch(column)}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.objectsToDisplay.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} >
                  {this.state.columns.map((column) => {
                    return (
                      <TableCell key={column} >
                        {row[column]}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={this.state.objectsToDisplay.length}
            rowsPerPage={this.state.rowsPerPage}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
      </TableContainer>
      
    </Paper>

            </div>
        )
    }
}

function AdminPage() {
    return (
        <AdminPageComponent>
        </AdminPageComponent>
        
    )
}

export default AdminPage;
