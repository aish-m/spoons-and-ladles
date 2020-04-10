import React from "react";
import background from './images/login-background.jpg';
import mascot from './images/mascot-no-bg.png';
import snlText from './images/snl-text-no-bg.png';
import './LoginOrSignupPage.css';
import Button from "@material-ui/core/Button";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Tooltip from "@material-ui/core/Tooltip";
import {TextField} from "@material-ui/core";
import { connect } from 'react-redux';
import { toggleUserLogin, logUserIn, setExpertChefFlag, setLoginMode } from './redux/actionCreators';
import {NavLink} from "react-router-dom";

const styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
    backgroundPositionY: '90%',
    height: '100vh'
};

const mapStateToProps = state => ({
    isLogin: state.loginMode
});

class LoginOrSignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null,
            firstName: null,
            lastName: null,
            emailAddress: null,
            enteredPassword: null,
            confirmedPassword: null,
            phone: null
        };
        this.closeComponent = this.closeComponent.bind(this);
    }

    componentDidMount() {
        document.getElementById("pageHeader").classList.add("loginMode");
        document.getElementById("pageFooter").classList.add("loginMode");
    }

    closeComponent() {
        if(this.props.isLogin) {
            document.getElementById("loginForm").reset();
            if (document.getElementById("emailField").classList.contains("error"))
                document.getElementById("emailField").classList.remove("error");
            if (document.getElementById("passwordField").classList.contains("error"))
                document.getElementById("passwordField").classList.remove("error");
        }
        else {
            document.getElementById("signupForm").reset();
        }

        document.getElementById("errorMessage").innerHtml = "";
        document.getElementById("pageHeader").classList.remove("loginMode");
        document.getElementById("pageFooter").classList.remove("loginMode");
    }

    contentChange = event => this.setState({[event.target.name]: event.target.value});

    validateLogin(username, password) {
        if (username === null || username === '') {
            console.log('username: ' + username);
            document.getElementById("emailField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Email is a required field!"
        } else if (password === null || password === '') {
            console.log('password: ' + password);
            document.getElementById("passwordField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Password is a required field!"
        } else {
            fetch("http://localhost:8080/api/users/login", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, password: password})
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        result === 0 ? this.handleLoginFailure() : this.handleLoginSuccess(result);
                    },
                    (error) => {
                        console.log("Please try back again")
                    }
                );
        }
    }

    handleLoginFailure() {
        document.getElementById("errorMessage").innerHTML = 'Incorrect email or password, Please try again';
    }

    handleLoginSuccess(loggedInUsersId) {
        this.closeComponent();
        this.props.toggleUserLogin();

        fetch("http://localhost:8080/api/users/getInfo/" + loggedInUsersId)
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.props.logUserIn(result);
                    this.props.setExpertChefFlag(result.expert);
                },
                (error) => {
                    console.log("Error fetching user data!")
                }
            );
    }

    render() {
        return (
            <div className="login-signup-component" style={styles}>
                {this.props.isLogin ?
                    <div className="login-component">
                        <div className="header-logo">
                            <img src={mascot} alt="Mascot" id="loginPageMascotImage"/>
                            <img src={snlText} alt="Spoons & Ladles text" id="loginPageSnlText"/>
                        </div>
                        <form className="login-form" noValidate autoComplete="off" id="loginForm">
                            <div className="form-title">
                                <h1> Welcome back! </h1>
                                <p> Log in with your email and password </p>
                            </div>
                            <TextField id="emailField" label="Email" variant="outlined" name="username"
                                       onChange={this.contentChange}
                                       onFocus={(event) => event.target.classList.remove("error")}
                            />
                            <TextField id="passwordField" label="Password" variant="outlined" name="password"
                                       onChange={this.contentChange}
                                       onFocus={(event) => event.target.classList.remove("error")}
                            />
                            <p id="errorMessage"></p>
                            <Button
                                variant="contained"
                                id="loginButton"
                                onClick={() => this.validateLogin(this.state.username, this.state.password)}
                                size="large"
                            >
                                Log In
                            </Button>

                            <Button
                                variant="contained"
                                id="createAccountButton"
                                onClick={() => this.props.setLoginMode(false)}
                            >
                                New user? Create account
                            </Button>
                        </form>
                    </div> :
                    <div id="signupDiv">
                        <div className="header-logo">
                            <img src={mascot} alt="Mascot" id="loginPageMascotImage"/>
                            <img src={snlText} alt="Spoons & Ladles text" id="loginPageSnlText"/>
                        </div>
                        <form className="signup-form" noValidate autoComplete="off" id="signupForm">
                            <div className="form-title">
                                <h1> Register With Us </h1>
                                <p> Put in your details to get started! </p>
                            </div>
                            <div className="input-names">
                                <TextField required id="firstNameField" label="First Name" variant="outlined"
                                           name="firstName"
                                           onChange={this.contentChange}/>
                                <TextField required id="lastNameField" label="Last Name" variant="outlined"
                                           name="lastName"
                                           onChange={this.contentChange}/>
                            </div>
                            <div className="email-and-phone">
                                <TextField required id="emailField" label="Email Address" variant="outlined"
                                           name="emailAddress"
                                           onChange={this.contentChange}/>
                                <TextField required id="phoneField" label="Password" variant="outlined" name="phone"
                                           onChange={this.contentChange}/>
                            </div>
                            <div className="password-fields">
                                <TextField required id="enteredPasswordField" label="Enter a password"
                                           variant="outlined" name="enteredPassword"
                                           onChange={this.contentChange}/>
                                <TextField required id="confirmedPasswordField" label="Confirm password"
                                           variant="outlined" name="confirmedPassword"
                                           onChange={this.contentChange}/>
                            </div>
                            <p id="errorMessage"></p>
                            <Button
                                variant="contained"
                                id="submitButton"
                                onClick={() => console.log('Creating user...')}
                                size="large"
                            >
                                REGISTER
                            </Button>
                            <Button
                                variant="contained"
                                id="goToLogin"
                                onClick={() => this.props.setLoginMode(true)}
                            >
                                Already have an account? Log in
                            </Button>
                        </form>
                    </div>
                }
                <Tooltip title="Go back">
                    <NavLink to="/">
                        <ArrowBackIcon onClick={this.closeComponent} id="backButton" fontSize="large"/>
                    </NavLink>
                </Tooltip>
            </div>
        )
    }
}

export default connect(mapStateToProps, { toggleUserLogin, logUserIn, setExpertChefFlag, setLoginMode })(LoginOrSignupPage);
