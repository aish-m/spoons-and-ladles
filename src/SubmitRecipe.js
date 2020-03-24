import React, { Component } from "react";
import './SubmitRecipe.css';
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import addRecipeImage from './images/add-recipe.png';

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
        imageFileType: null }
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
            <div>
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
                        <TextField className="recipeIngredients" value={this.state.ingredients} name="ingredients" required label="Ingredients" multiline rows="5"  onChange={this.contentChange}
                        placeholder="Put each ingredient on its own line." variant="outlined" />
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
        <SubmitForm ></SubmitForm>
    )
}

export default SubmitRecipe;
