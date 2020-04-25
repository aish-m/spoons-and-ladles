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
import { toggleUserLogin, setUser, setExpertChefFlag } from './redux/actionCreators';
import {NavLink} from "react-router-dom";
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    redirectUrl: state.redirectUrl
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
            phone: null,
            enteredPassword: null,
            confirmedPassword: null
        };
        this.closeComponent = this.closeComponent.bind(this);
        this.validateSignupForm = this.validateSignupForm.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    componentDidMount() {
        document.getElementById("pageHeader").classList.add("loginMode");
        document.getElementById("pageFooter").classList.add("loginMode");
    }

    closeComponent() {
        if(window.location.pathname === '/login') {
            document.getElementById("loginForm").reset();
            if (document.getElementById("emailField").classList.contains("error"))
                document.getElementById("emailField").classList.remove("error");
            if (document.getElementById("passwordField").classList.contains("error"))
                document.getElementById("passwordField").classList.remove("error");
        }
        else {
            document.getElementById("signupForm").reset();
        }
        document.getElementById("errorMessage").innerHTML = '';
        document.getElementById("pageHeader").classList.remove("loginMode");
        document.getElementById("pageFooter").classList.remove("loginMode");
    }

    contentChange = event => this.setState({[event.target.name]: event.target.value});

    validateLoginForm(username, password) {
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (username === null || username === '') {
            document.getElementById("emailField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Email is a required field!"
            return;
        }

        if (password === null || password === '') {
            document.getElementById("passwordField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Password is a required field!"
            return;
        }

        if(!emailPattern.test(username)) {
            document.getElementById("emailField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = 'Email should follow format user@example.com';
            return;
        }

        this.validateUser(username, password);
    }

    validateUser(username, password) {
            // fetch("http://localhost:8080/api/users/login", {
            fetch("https://spoons-and-ladles-backend.herokuapp.com/api/users/login", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username: username, password: password})
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        result === 0 ?
                            this.handleLoginFailure() :
                            this.handleLoginSuccess(result);
                    },
                    (error) => {
                        window.location.replace('/serverError');
                    }
                );
    }

    handleLoginFailure() {
        document.getElementById("errorMessage").innerHTML = 'Incorrect email or password, Please try again';
    }

    handleLoginSuccess(loggedInUsersId) {
        this.closeComponent();
        this.props.toggleUserLogin();

        // fetch("http://localhost:8080/api/users/getInfo/" + loggedInUsersId)
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/users/getInfo/" + loggedInUsersId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.props.logUserIn(result);
                    this.props.setExpertChefFlag(result.expert);
                    this.props.history.push(this.props.redirectUrl);
                },
                (error) => {
                    console.log("Error fetching user data!")
                }
            );
    }

    validateSignupForm() {
        if(this.state.firstName === null || this.state.firstName === '') {
            document.getElementById("firstNameField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "First name cannot be left blank!";
            return;
        }
        if(this.state.lastName === null || this.state.lastName === '') {
            document.getElementById("lastNameField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Last name cannot be left blank!";
            return;
        }
        if(this.state.emailAddress === null || this.state.emailAddress === '') {
            document.getElementById("emailField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Email cannot be left blank!";
            return;
        }
        if(this.state.phone === null || this.state.phone === '') {
            document.getElementById("phoneField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Phone number cannot be left blank!";
            return;
        }
        if(this.state.enteredPassword === null || this.state.enteredPassword === '') {
            document.getElementById("enteredPasswordField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Password field cannot be left blank!";
            return;
        }
        if(this.state.confirmedPassword === null || this.state.confirmedPassword === '') {
            document.getElementById("confirmedPasswordField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Confirm password field cannot be left blank!";
            return;
        }

        // Validations

        if(this.state.firstName !== null && this.state.firstName.length > 20) {
            document.getElementById("firstNameField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "First name cannot exceed 20 characters!";
            return;
        }

        if(this.state.lastName !== null && this.state.lastName.length > 20) {
            document.getElementById("lastNameField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Last name cannot exceed 20 characters!";
            return;
        }

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if(this.state.emailAddress !== null && !emailPattern.test(this.state.emailAddress)) {
            document.getElementById("emailField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = 'Email should follow format user@example.com';
            return;
        }

        const phonePattern = /^\d{10}$/;
        if(this.state.phone !== null && !phonePattern.test(this.state.phone)) {
            document.getElementById("phoneField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Phone number should be exactly 10 digits without special characters!";
            return;
        }

        if(this.state.enteredPassword !== null && this.state.enteredPassword.length > 20) {
            document.getElementById("enteredPasswordField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Password cannot exceed 20 characters!";
            return;
        }

        if(this.state.enteredPassword !== this.state.confirmedPassword) {
            document.getElementById("enteredPasswordField").classList.add("error");
            document.getElementById("confirmedPasswordField").classList.add("error");
            document.getElementById("errorMessage").innerHTML = "Passwords do not match!";
            return;
        }

        this.registerUser();
    }

    registerUser() {
        const postRequestBody = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.emailAddress,
            password: this.state.enteredPassword,
            phone: this.state.phone
        };

        // fetch("http://localhost:8080/api/users/insert", {
        fetch("https://spoons-and-ladles-backend.herokuapp.com/api/users/insert", {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(postRequestBody)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    result ? this.handleSignupSuccess() : this.handleSignupFailure();
                },
                (error) => {
                    window.location.replace('/serverError');
                }
            );
    }

    handleSignupSuccess() {
        alert("Account created successfully! Click OK to go to log in page.");
        window.location.pathname = './login';
    }

    handleSignupFailure() {
        document.getElementById("errorMessage").innerHTML="User could not be created! Please try back later.";
    }

    render() {
        return (
            <div className="login-signup-component">
                {window.location.pathname === '/login' ?
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
                            <TextField id="emailField" label="Email" variant="outlined" name="username" required
                                       onChange={this.contentChange}
                                       onFocus={(event) => event.target.classList.remove("error")}
                            />
                            <TextField id="passwordField" label="Password" variant="outlined" name="password" required
                                       type="password"
                                       onChange={this.contentChange}
                                       onFocus={(event) => event.target.classList.remove("error")}
                            />
                            <p id="errorMessage"></p>
                            <Button
                                variant="contained"
                                id="loginButton"
                                onClick={() => this.validateLoginForm(this.state.username, this.state.password)}
                                size="large"
                            >
                                Log In
                            </Button>

                            <NavLink to="/signup" className="nav-links">
                                <Button
                                    variant="contained"
                                    id="createAccountButton"
                                >
                                    New user? Create account
                                </Button>
                            </NavLink>
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
                            </div>
                            <div className="signup-form-fields">
                                <TextField required id="firstNameField" label="First Name" variant="outlined"
                                           placeholder="Maximum 20 characters"
                                           name="firstName"
                                           onChange={this.contentChange}
                                           onFocus={(event) => event.target.classList.remove("error")}
                                />
                                <TextField required id="lastNameField" label="Last Name" variant="outlined"
                                           placeholder="Maximum 20 characters"
                                           name="lastName"
                                           onChange={this.contentChange}
                                           onFocus={(event) => event.target.classList.remove("error")}
                                />
                            </div>
                            <div className="signup-form-fields">
                                <TextField required id="emailField" label="Email Address" variant="outlined"
                                           placeholder="user@example.com"
                                           name="emailAddress"
                                           onChange={this.contentChange}
                                           onFocus={(event) => event.target.classList.remove("error")}
                                />
                                <TextField required id="phoneField" label="Phone" variant="outlined"
                                           placeholder="Just 10 digits"
                                           name="phone"
                                           onChange={this.contentChange}
                                           onFocus={(event) => event.target.classList.remove("error")}
                                />
                            </div>
                            <div className="signup-form-fields">
                                <TextField required id="enteredPasswordField" label="Enter a password"
                                           placeholder="Maximum 20 characters"
                                           type="password"
                                           variant="outlined" name="enteredPassword"
                                           onChange={this.contentChange}
                                           onFocus={(event) => event.target.classList.remove("error")}
                                />
                                <TextField required id="confirmedPasswordField" label="Confirm password"
                                           placeholder="Must match password"
                                           type="password"
                                           variant="outlined" name="confirmedPassword"
                                           onChange={this.contentChange}
                                           onFocus={(event) => event.target.classList.remove("error")}
                                />
                            </div>
                            <p id="errorMessage"></p>
                            <Button
                                variant="contained"
                                id="submitButton"
                                onClick={() => this.validateSignupForm()}
                                size="large"
                            >
                                REGISTER
                            </Button>
                            <NavLink to="/login" className="nav-links">
                                <Button
                                    variant="contained"
                                    id="goToLoginButton"
                                >
                                    Already have an account? Log in
                                </Button>
                            </NavLink>
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

export default connect(mapStateToProps, { toggleUserLogin, logUserIn: setUser, setExpertChefFlag })(withRouter(LoginOrSignupPage));
