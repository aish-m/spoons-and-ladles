import React, {Component, useEffect} from "react";
import './AdminPage.css';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import { changeTabValue } from "./redux/actionCreators";

class AdminPageComponent extends Component {
    constructor(props) {
        super(props);
        this.handleChangePage = this.handleChangePage.bind(this);
        this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this);
        this.renderSwitch = this.renderSwitch.bind(this);
        this.formatSwitch = this.formatSwitch.bind(this);

        this.state = {
            tabletoshow: 0,
            objectsToDisplay: [], 
            columns : [],
            page:0,
            rowsPerPage:10,
            tableStyle : {display:'unset'},
            paginationStyel: {display : "none"}
        }
    }

    hideTable(){
        this.setState({
            tableStyle : {display: "none"},
            paginationStyel: {display : "none"}
        })
    }

    showTable(){
        this.setState({
            tableStyle : {display: "unset"},
            paginationStyel: {display : "unset"}
        })
    }

     handleChange = (event) => {
        this.setState({
            tabletoshow : event.target.value
        })
       console.log(this.state.tabletoshow + "  "+event.target.value);
       var temp = ""; 
       if(this.tabletoshow === 0 ){console.log("Hide");}
       if(event.target.value===0){this.hideTable();}
       else if(event.target.value===1){temp = "users"}
       else if(event.target.value===2){temp="ingredients"}
       else if(event.target.value===3){temp="pending_recipes"}
       else if(event.target.value===4){temp="recipes"}
       else if(event.target.value===5){temp="recipe_ingredient_map"}
       this.loadDatafromtable(temp);
      };

      loadDatafromtable(tablename){
        console.log(tablename);
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/getTable/" + tablename)
        // fetch("http://localhost:8080/api/getTable/"+tablename)
          .then(res => {console.log(res);
            return res.json()
          })
          .then((data) => {
                this.setState({
                    objectsToDisplay : Object.assign(this.state.objectsToDisplay,data),
                    columns : Object.keys(data[0])
                })
            this.showTable();
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

    componentDidMount() {
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

      formatSwitch(value,column){
        switch(column){
            case 'submissionDate':
                var date = new Date(value);
                return date.toString();
            case 'expert':
                if(value===true){return "YES"}
                else{return "NO"}
            default:
                if(value===null){return "No Data";}
                return value;
        }
      }
    render(){
       
        return(
           
            <div className="adminContent">
              <FormControl className = "selectForm" variant="outlined" > 
                <p>I want to view the contents of : </p>
                <Select
                     className = "dropdown"
                    //  labelId="demo-controlled-open-select-label"
                    //  id="demo-controlled-open-select"
                     labelId="demo-simple-select-outlined-label"
                     id="demo-simple-select-outlined"
                     
                     open={this.open}
                     onClose={this.handleClose}
                     onOpen={this.handleOpen}
                     value={this.state.tabletoshow}
                     onChange={this.handleChange}
                    >
                    <MenuItem value={0}>
                        <em>Nothing?</em>
                    </MenuItem>
                    <MenuItem value={1}>Users</MenuItem>
                    <MenuItem value={2}>Ingredients</MenuItem>
                    <MenuItem value={3}>Pending Recipes</MenuItem>
                    <MenuItem value={4}>Recipes</MenuItem>
                    <MenuItem value={5}>Recipe Ingredient Associative Entity</MenuItem>
                    
                </Select>
              </FormControl>
                {this.state.objectsToDisplay}

                <Paper className = "Table" style={this.state.tableStyle}>
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

function AdminPage(props) {

    useEffect(() => {
        props.changeTabValue(-1);
    },[]);

    return (
        <AdminPageComponent>
        </AdminPageComponent>
        
    )
}

export default connect(null, { changeTabValue })(AdminPage);
