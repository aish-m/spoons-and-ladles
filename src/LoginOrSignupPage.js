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
import { toggleUserLogin, logUserIn, setExpertChefFlag } from './redux/actionCreators';
import {NavLink} from "react-router-dom";

var styles = {
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center bottom',
    backgroundPositionY: '90%',
    height: '100vh'
};

function closeComponent() {
    document.getElementById("pageHeader").classList.remove("loginMode");
    document.getElementById("pageFooter").classList.remove("loginMode");
}

const mapStateToProps = state => ({
    isLogin: state.loginMode
});

class LoginOrSignupPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        document.getElementById("pageHeader").classList.add("loginMode");
        document.getElementById("pageFooter").classList.add("loginMode");
    }

    contentChange = event => this.setState({ [event.target.name]: event.target.value });

    validateLogin(username, password) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
        fetch("http://localhost:8080/api/users/login", requestOptions)
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

    handleLoginFailure() {
        document.getElementById("incorrectCredentials").classList.add("error");
    }

    handleLoginSuccess(loggedInUsersId) {
        closeComponent();
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
                this.props.isLogin ?
                     <div className="login-component" style={styles}>
                        <div className="header-logo">
                            <img src={mascot} alt="Mascot" id="loginPageMascotImage"/>
                            <img src={snlText} alt="Spoons & Ladles text" id="loginPageSnlText"/>
                        </div>
                        <form className="login-or-signup-form" noValidate autoComplete="off">
                            <div className="form-title">
                                <h1> Welcome back! </h1>
                                <p> Log in with your email and password </p>
                            </div>
                            <TextField id="emailField" label="Email" variant="outlined" name="username"
                                       onChange={this.contentChange}/>
                            <TextField id="passwordField" label="Password" variant="outlined" name="password"
                                       onChange={this.contentChange}/>
                            <div id="incorrectCredentials">
                                Incorrect email or password. Please try again!
                            </div>
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
                                onClick={() => console.log('Sign up')}
                            >
                                Create account
                            </Button>
                        </form>
                        <Tooltip title="Go back">
                            <NavLink to="/">
                                <ArrowBackIcon onClick={closeComponent} id="backButton" fontSize="large"/>
                            </NavLink>
                        </Tooltip>
                    </div> :
                    <div> Sign up!</div>
        )
    }
}

export default connect(mapStateToProps, { toggleUserLogin, logUserIn, setExpertChefFlag })(LoginOrSignupPage);
