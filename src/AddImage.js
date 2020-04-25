import React, { Component } from "react";

import addRecipeImage from './images/add-recipe.png';

// How to move data from child to parent? tried call back and did not work - so removed this component and merged it in parent
// ** learn this later ** 

class AddImageComp extends Component{
    constructor(props){
        super(props)
        this.state = {
          file: null,
          previewStyle :  {display: 'none'},
          imageUpdateSpan : {display: 'none'},
          addRecipeStyle : {display: 'block',height: '250px',width: '250px'}
        }
        this.handleChange = this.handleChange.bind(this)
        
    }
    
    

      handleChange(event) {
        if(event.target.files[0]===undefined){
            this.setState({
                file: null,
                previewStyle : {display: 'none'},
                previewImageStyle:{display:'none'},
                imageUpdateSpan : {display: 'none'},
                addRecipeStyle : {display: 'block',height: '250px',width: '250px'}
            })
        }
        else{
            this.setState({
                file: URL.createObjectURL(event.target.files[0]),
                 addRecipeStyle: {display: 'none'},
                imageUpdateSpan : {display: 'block',fontFamily: 'Source Serif Pro'},
                previewStyle : {display: 'block',height: '250px',width: '250px'},
                previewImageStyle :{height: 'inherit',width: 'inherit',fontFamily: 'Source Serif Pro'}
              })
        }
        this.props.onCallingMyCallback(event.target.files[0]);
      }
    
    render(){
        return(
            <div>
            <div className="forImage">
            <label className="custom-file-upload">  
                <span style={this.state.imageUpdateSpan} > Click Here to change the image </span> 
                <input id="inp" type="file" onChange={this.handleChange } /> 
                <img id="recipeImage" src={addRecipeImage} alt="Add a recipe" style={this.state.addRecipeStyle} />
            </label>
            </div>

            <div className="forPreview" style={this.state.previewStyle}>
                <img id="preview" src={this.state.file} alt="Add recipe final look" style={this.state.previewImageStyle}/> 
            </div>
            </div>
        )
    }

}

function AddImage() {
    return(
        <AddImageComp></AddImageComp>
    )
}
export default AddImage;
