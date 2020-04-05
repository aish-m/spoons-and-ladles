import React, { Component } from "react";
import './SubmitRecipe.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import addRecipeImage from './images/add-recipe.png';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';
const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };
  

class SubmitForm extends Component{

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.post_recipe = this.post_recipe.bind(this);
        this.state = {
        previewStyle :  {display: 'none'},
        imageUpdateSpan : {display: 'none'},
        addRecipeStyle : {display: 'block',height: '250px',width: '250px'},
        title: '',prepTime: '', numOfServings: '',description: '',ingredients:'',procedure:'', imageCaptured: null,
        imageFileType: null,
        columns: [
            { title: 'Ingredient', field: 'ingredient' },
            { title: 'Quantity', field: 'quantity' }
          ],
          data: [
            
          ] }
    } 

    
    contentChange = event => this.setState({ [event.target.name]: event.target.value })

    handleChange(event) {
        if(event.target.files[0]===undefined){
            this.setState({
                imageCaptured: null,
                imageFileType: null,
                previewStyle : {display: 'none'},
                previewImageStyle:{display:'none'},
                imageUpdateSpan : {display: 'none'},
                addRecipeStyle : {display: 'block',height: '250px',width: '250px'}
            })
        }
        else{
            this.setState({
                imageCaptured: URL.createObjectURL(event.target.files[0]),
                imageFileType: event.target.files[0].type,
                addRecipeStyle: {display: 'none'},
                imageUpdateSpan : {display: 'block',fontFamily: 'Gentium Basic'},
                previewStyle : {display: 'block',height: '250px',width: '250px'},
                previewImageStyle :{height: 'inherit',width: 'inherit',fontFamily: 'Gentium Basic'}
              })
        }
      }

    cancel_recipe = e => {
        this.setState({
            previewStyle :  {display: 'none'},
            imageUpdateSpan : {display: 'none'},
            addRecipeStyle : {display: 'block',height: '250px',width: '250px'},
            title: '',prepTime: '', numOfServings: '',description: '',ingredients:'',procedure:'', imageCaptured: null,
            imageFileType: null 
        })
    }
    post_recipe = e => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: this.state.title,prepTime: this.state.prepTime,numOfServings: this.state.numOfServings,
                description: this.state.description,ingredients: this.state.ingredients,procedure: this.state.procedure,
                imageCaptured: this.state.imageCaptured })
        };
        console.log(this.state);
    }

    render(){
        return(
            <form className="createRecipe">
            <div className="overallDiv">
            <div className="generic"> 
                <div className="forImage">
                    <label className="custom-file-upload">  
                    <span style={this.state.imageUpdateSpan} > Click Here to change the image </span> 
                    <input id="inp" type="file" name="imageCaptured" onChange={this.handleChange } /> 
                    <img id="recipeImage" src={addRecipeImage} alt="Add a recipe" style={this.state.addRecipeStyle} />
                </label>
                </div>

                <div className="forPreview" style={this.state.previewStyle}>
                    <img id="preview" src={this.state.imageCaptured} alt="Add recipe final look" style={this.state.previewImageStyle}/> 
                </div>
                <div className="getDishDetails">
                    <div className="forPrepTime">
                        <TextField id="prepTime" value={this.state.prepTime} name="prepTime" required label="Prep Time" variant="outlined"  onChange={this.contentChange} />
                    </div>
                    <div className="forServings">
                        <TextField id="numServings" value={this.state.numOfServings} name="numOfServings" required label="Number of Servings" variant="outlined"  onChange={this.contentChange} />
                    </div>     
                </div>
            </div>
            <div id="specific">
                <ul className="recipeProcedure">  
                    <div className="getRecipeDataTitle">
                        <TextField className="recipeTitle" value={this.state.title} name="title" onChange={this.contentChange} label="Recipe Title" required variant="outlined" />
                    </div>
                    <div className="getRecipeDataDesc">
                        <TextField className="recipeDesc" value={this.state.description} name="description" label="Description" required variant="outlined" multiline rows="2"  onChange={this.contentChange} />
                    </div>
                    
                    <div className="getRecipeDataIngredients">
                        {/* <TextField className="recipeIngredients" value={this.state.ingredients} name="ingredients" required label="Ingredients" multiline rows="5"  onChange={this.contentChange}
                        placeholder="Put each ingredient on its own line." variant="outlined" /> */}

                        <MaterialTable
                            
                            options={{
                                rowStyle: {
                                //backgroundColor: '#EEE',
                                fontFamily: 'Gentium Basic !important'
                                },
                                headerStyle: {
                                //backgroundColor: '#01579b',
                                //color: '#FFF',
                                fontFamily: 'Gentium Basic'
                                },
                                searchFieldStyle: {
                                //backgroundColor: '#AAA',
                                fontFamily: 'Gentium Basic'
                                }
                            }}

                            column={{
                                cellStyle: {
                                backgroundColor: '#EEE',
                                fontFamily: 'Gentium Basic'
                                }
                            }}

                            stickyHeader aria-label="sticky table"
                            className="recipeIngredients"
                            icons={tableIcons}
                            title="Ingredients"
                            columns={this.state.columns}
                            data={this.state.data}
                            editable={{
                                onRowAdd: (newData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.push(newData);
                                        return { ...prevState, data };
                                    });
                                    }, 600);
                                }),
                                onRowUpdate: (newData, oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                    resolve();
                                    if (oldData) {
                                        this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data[data.indexOf(oldData)] = newData;
                                        return { ...prevState, data };
                                        });
                                    }
                                    }, 600);
                                }),
                                onRowDelete: (oldData) =>
                                new Promise((resolve) => {
                                    setTimeout(() => {
                                    resolve();
                                    this.setState((prevState) => {
                                        const data = [...prevState.data];
                                        data.splice(data.indexOf(oldData), 1);
                                        return { ...prevState, data };
                                    });
                                    }, 600);
                                }),
                            }}
                            />

                    </div>
                    <div className="getRecipeDataProcedure">
                        <TextField className="recipeProcedure" value={this.state.procedure} name="procedure"  required label="Procedure" multiline rows="5"  onChange={this.contentChange}
                        placeholder="Give procedure as a series of steps." variant="outlined" />
                    </div>
                    <div className="forButtons">
                    <div className="forSubmit">
                        <Button id="submit-recipe"  onClick={this.post_recipe} variant="contained"  color="primary">Submit My Recipe</Button>
                    </div>
                    <div className="forCancel">
                        <Button id="cancel-recipe" onClick={this.cancel_recipe} variant="contained" color="primary">Cancel</Button>
                    </div>
                </div>
                </ul>   
                
            </div>
            </div>
        </form>
        )
    }
}

function SubmitRecipe() {
    return (    
        <div>
        <SubmitForm ></SubmitForm>
        </div>
    )
}

export default SubmitRecipe;
