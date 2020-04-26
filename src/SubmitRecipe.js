import React, {Component, useEffect} from "react";
import './SubmitRecipe.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import addRecipeImage from './images/add-recipe.png';
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import Close from '@material-ui/icons/Close';
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
import { changeTabValue } from "./redux/actionCreators";
import { connect } from 'react-redux';
import axios from 'axios';

const mapStateToProps = state => ({
    user: state.loggedInUser
});

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

var formData = new FormData();

class SubmitForm extends Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.contentChange = this.contentChange.bind(this);
        this.post_recipe = this.post_recipe.bind(this);
        this.state = {
        previewStyle :  {display: 'none'},
        imageUpdateSpan : {display: 'none'},
        addRecipeStyle : {display: 'block',height: '250px',width: '250px'},
        confirmationStyle: {display: 'none'},
        title: '',prepTime: '', numOfServings: '',keywords: '',ingredients:null,procedure:'', imageCaptured: null,
        imageFileType: null,
        columns: [{ title: 'Ingredient', field: 'ingredient' },{ title: 'Quantity or preparation', field: 'quantity' }],
        data: [],
        pendingid: [],
        ingids:[],
        selectedFile:null,
        measurements: [],
        servingError: "",
        preptimeError: "",
        recipenameError: "",
        keywordsError: "",
        ingredientsError: "",
        procedureError: "",
        postingImageData: null
        }
    }

    componentDidMount() {
        this.props.changeTabValue(2);
    }

    contentChange = event => this.setState({ [event.target.name]: event.target.value })

    handleChange(event) {
        console.log(event.target.files[0].name);
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
                imageUpdateSpan : {display: 'block',fontFamily: 'Source Serif Pro'},
                previewStyle : {display: 'block',height: '250px',width: '250px'},
                previewImageStyle :{height: 'inherit',width: 'inherit',fontFamily: 'Source Serif Pro'},
                selectedFile:event.target.files[0],
                postingImageData : event.target.files[0].name
              })
              formData = new FormData();
              formData.append("uploadImage",this.state.selectedFile);
        }
      }

    cancel_recipe = e => {
        this.setState({
            previewStyle :  {display: 'none'},
            imageUpdateSpan : {display: 'none'},
            addRecipeStyle : {display: 'block',height: '250px',width: '250px'},
            title: '',prepTime: '', numOfServings: '',keywords: '',ingredients:null,procedure:'', imageCaptured: null,
            imageFileType: null,
            data: [],
            servingError: "",
            preptimeError: "",
            recipenameError: "",
            keywordsError: "",
            ingredientsError: "",
            procedureError: "",
            postingImageData : null
        })
    }

    post_image(){
        console.log(this.state.selectedFile);
        var filepath = "src/images/Recipes";
        const fd = new FormData();
        fd.append('image',this.state.selectedFile, "test image")
        axios.post({
            url: "https://spoons-and-ladles-backend.herokuapp.com/api/pending/postimage",
            // url: "http://localhost:8080/api/pending/postimage",
            data: fd
        })
        .then(res=>{
            console.log(res);
        })
        .then(err => {
            console.log(err);
        })
    }
    post_get_recipeid(){
        console.log(this.state.selectedFile);
        //var str =  new String(this.state.selectedFile);
        //console.log(str);
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/pending/insert", {
        // fetch("http://localhost:8080/api/pending/insert", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                "recipeName": this.state.title,
                "prepTime": this.state.prepTime,
                "servings" : this.state.numOfServings,
                "userId" : this.props.user.userId,
                "keywords": this.state.keywords,
                "ingredients": this.state.data,
                "instructions": this.state.procedure,
                "pictureLink": this.state.postingImageData
            })
          })
          .then(res => {console.log(res);
            return res.json()
          })
          .then((data) => {
            this.setState({
                ingids: data
            })
            this.post_get_ingid(); 
          })
          .catch(error => {
            console.log("error    "+error);
          });  
    }
    
    post_get_ingid(){
        const ingnames=[];
        for(var i=0;i<this.state.data.length;i++){
            ingnames.push(this.state.data[i].ingredient);
        }
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/ingredients/insert", {
        // fetch("http://localhost:8080/api/ingredients/insert", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                ingredients: ingnames
                })
          })
          .then(res => {return res.json()})
          .then((data) => {
            this.setState({
                pendingid: data
            }) 
            this.post_recipe_ingredient_mapper();
          })
          .catch(error => {
            console.log("error    "+error);
          });  
    }

    post_recipe_ingredient_mapper(){
        for(var i=0;i<this.state.data.length;i++){
            this.state.measurements.push(this.state.data[i].quantity);
        }
        console.log(this.state.measurements);
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/recipeingredient/insert", {
        // fetch("http://localhost:8080/api/recipeingredient/insert", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                    pendingRecipeId : this.state.ingids,
                    ingredientIds: this.state.pendingid,
                    measurements :  this.state.measurements
                })
          })
          .then(res => {return res.json()})
          .then((data) => {
              this.cancel_recipe();
              alert("Thanks for submitting! Click OK to navigate to 'My Recipes' page!");
              window.location.replace("/myRecipes");
          })
          .catch(error => {
            console.log("error    "+error);
          }); 
    }

    closeconfirmation = e => {
        this.setState({
            confirmationStyle: {display: 'none'}
        })
    }

    validateForm(){
        let servingError = "";
        let preptimeError = "";
        let recipenameError = "";
        let keywordsError = "";
        let ingredientsError = "";
        let procedureError = "";
        let ret = true;

        if(this.state.prepTime===''){preptimeError = "Please fill preparation time";
            this.setState({preptimeError : preptimeError});
            ret = false;
        }else{this.setState({preptimeError : ""})}

        
        if(this.state.title===''){recipenameError = "Please name this recipe, dear chef!";
            this.setState({recipenameError : recipenameError});
            ret = false;
        }else{this.setState({recipenameError : ""})}

        if(this.state.numOfServings===''){servingError = "Please fill out the number of servings";
            this.setState({servingError : servingError});
            ret = false;
        }else{this.setState({servingError : ""})}

        if(this.state.keywords===''){keywordsError = "Please fill some keywords about this recipe";
            this.setState({keywordsError : keywordsError});
            ret = false;
        }else{this.setState({keywordsError : ""})}

        if(this.state.data.length===0){ingredientsError = "No dish comes out of thin air! So, add some ingredients!";
            this.setState({ingredientsError : ingredientsError});
            ret = false;
        }else{this.setState({ingredientsError : ""})}

        if(this.state.procedure===''){procedureError = "Please give some instructions bruh!";
            this.setState({procedureError : procedureError});
            ret = false;
        }else{this.setState({procedureError : ""})}
        return ret;
    }

    post_recipe = e => {
        //console.log(this.state.imageCaptured);
        e.preventDefault();
        if(this.validateForm() === false){return;}
        //console.log(this.state.postingImageData);
        this.post_get_recipeid();
        //this.post_image();
        // this.setState({
        //     ingid: [],
        //     confirmationStyle: {display: 'flex'},
        //     measurements: []
        // })
    };

    render(){
        return(
            <div className="submit-recipe-entire-div">
            <div className="submittedconfirmation" style={this.state.confirmationStyle}> 
                <div className = "innerconfirm"> 
                    Your recipe is submitted. Let us see what else you got bud! 
                    <Button className="close">  <Close onClick={this.closeconfirmation}></Close>  </Button>
                    
                </div>
            </div>
            
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
                    <img id="preview" src={this.state.imageCaptured} alt="Add recipe final look" style={this.state.previewImageStyle} onChange={this.handleChange}/> 
                </div>
                <div className="getDishDetails">
                    <div className="forPrepTime">
                        <TextField id="prepTime" value={this.state.prepTime} name="prepTime" required label="Prep Time" variant="outlined"  onChange={this.contentChange} />
                    </div>
                    <div className="validation">{this.state.preptimeError}</div>
                    <div className="forServings">
                        <TextField id="numServings" value={this.state.numOfServings} name="numOfServings" required label="No. of Servings" variant="outlined"  onChange={this.contentChange} />
                    </div> 
                    <div className="validation">{this.state.servingError}</div>    
                </div>
            </div>
            <div id="specific">
                <ul className="recipeProcedure">  
                    <div className="getRecipeDataTitle">
                        <TextField className="recipeTitle" value={this.state.title} name="title" onChange={this.contentChange} label="Recipe Title" required variant="outlined" />
                    </div>
                    <div className="validation">{this.state.recipenameError}</div> 
                    <div className="getRecipeDataDesc">
                        <TextField
                            className="recipeDesc"
                            value={this.state.keywords}
                            name="keywords"
                            label="Enter a comma separated list of keywords for the recipe"
                            required variant="outlined"
                            multiline rows="2"
                            onChange={this.contentChange}
                        />
                    </div>
                    <div className="validation">{this.state.keywordsError}</div> 
                    <div className="getRecipeDataIngredients">
                        {/* <TextField className="recipeIngredients" value={this.state.ingredients} name="ingredients" required label="Ingredients" multiline rows="5"  onChange={this.contentChange}
                        placeholder="Put each ingredient on its own line." variant="outlined" /> */}

                        <MaterialTable
                            options={{
                                rowStyle: {
                                //backgroundColor: '#EEE',
                                fontFamily: 'Source Serif Pro'
                                },
                                headerStyle: {
                                //backgroundColor: '#01579b',
                                //color: '#FFF',
                                fontFamily: 'Source Serif Pro'
                                },
                                searchFieldStyle: {
                                //backgroundColor: '#AAA',
                                fontFamily: 'Source Serif Pro',
                                    display: 'none'
                                }
                            }}

                            column={{
                                cellStyle: {
                                backgroundColor: '#EEE',
                                fontFamily: 'Source Serif Pro'
                                }
                            }}

                            stickyHeader aria-label="sticky table"
                            className="recipeIngredients"
                            icons={tableIcons}
                            title="Ingredients *"
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
                    <div className="validation">{this.state.ingredientsError}</div> 
                    <div className="getRecipeDataProcedure">
                        <TextField className="recipeProcedure" value={this.state.procedure} name="procedure"  required label="Procedure" multiline rows="5"  onChange={this.contentChange}
                        placeholder="Give procedure as a series of steps." variant="outlined" />
                    </div>
                    <div className="validation">{this.state.procedureError}</div>
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
        </div>
        )
    }
}

export default connect(mapStateToProps, { changeTabValue })(SubmitForm);
