import React, {Component} from "react";
import './MyRecipesPage.css';
import FormControl from '@material-ui/core/FormControl';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

class MyRecipesPageComponent extends Component {
    constructor(props) {
        super(props);
        this.renderSwitch = this.renderSwitch.bind(this);
        this.formatSwitch = this.formatSwitch.bind(this);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.state={
            recipesData: [],
            columns: [],
            page:0,
            rowsPerPage:10,
            tableStyle : {display:'unset'},
            imageStyle: {height: "250px"},
            temp: null
        }
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/pending/forUser/2")
          .then(res => {console.log(res);
            return res.json()   
          })
          .then((data) => {
                this.setState({
                    recipesData : Object.assign(this.state.recipesData,data),
                     columns : Object.keys(data[0])
                })
          })
          .then(()=>{
            var datacols=this.state.columns;
            let temporary = datacols[3];
            datacols.splice(3,1);
            datacols.unshift(temporary);
            
            this.setState({
                columns: datacols
            })
            console.log(this.state.columns);
          })
          .catch(error => {
            console.log("error    "+error);
          });
    }

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

      formatSwitch(value,column){
        switch(column){
            case 'submissionDate':
                var date = new Date(value);
                return date.toString();
            case 'expert':
                if(value===true){return "YES"}
                else{return "NO"}
            // case 'pictureLink':
            //     var image = src= {require("./images/Recipes/" + recipe.pictureLink)}
            //     return 
            default:
                if(value===null){return "No Data";}
                return value;
        }
      }

    render(){
       
        return(
            <div>
                <Paper className = "Table" style={this.state.tableStyle}>
                <TableContainer >
                    <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                        {this.state.columns.map((column) => (
                            column==="userId" || column==="evaluatorId"? null : 
                            
                            <TableCell
                            key={column}
                            >
                            {this.renderSwitch(column)}
                            </TableCell>
                            
                        ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.recipesData.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((row) => {
                        return (
                            <TableRow hover role="checkbox" tabIndex={-1} >
                            {this.state.columns.map((column) => {
                                return (
                                column==="userId" || column==="evaluatorId"? null : 
                                    column==="pictureLink" ? 
                                        <TableCell key={column} >
                                            <img style={this.state.imageStyle} src= {require("./images/Recipes/" + row[column])} ></img>
                                        </TableCell>
                                        :
                                        column==="status" ? 
                                        <TableCell key={column} >
                                            {this.formatSwitch(row[column],column)}
                                        </TableCell>
                                        :
                                        <TableCell key={column} >
                                            {this.formatSwitch(row[column],column)}
                                        </TableCell>
                                
                                );
                            })}
                            </TableRow>
                        );
                        })}
                    </TableBody>
                    </Table>
                    <TablePagination style={this.state.paginationStyel}
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={this.state.recipesData.length}
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

function AdminPage(props) {
    return(
        <MyRecipesPageComponent></MyRecipesPageComponent>
    )
}

export default AdminPage;