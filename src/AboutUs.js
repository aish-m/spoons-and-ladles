import React from 'react';
import { connect } from 'react-redux';
import './AboutUs.css';
import { withRouter } from 'react-router-dom';
import UserCard from './UserCard';
import Grid from '@material-ui/core/Grid';
import { changeTabValue } from "./redux/actionCreators";
import hello from './images/hello-about-us.gif';

class AboutUs extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,
        };
    }

    componentDidMount(){
        this.props.changeTabValue(3);
    }

    render(){
        const membersList = [
            {
                memberName: "Aishwarya Manjunatha",
                memberImg: "aishwarya-manjunatha.jpg",
                memberDesc: "Web Developer",
                memberLinkedin: "https://www.linkedin.com/in/amanjunatha/",
                memberGithub: "https://github.com/aish-m",
                memberEmail: "mailto:aishwarya.shastri94@gmail.com",
                memberFacebook: "https://www.facebook.com/aishwarya.shastri94",
                memberInstagram: "https://www.instagram.com/aish_shastri/",
            },
            {
                memberName: "Jathin Dhulipalla",
                memberImg: "jathin-dhulipalla.jpg",
                memberDesc: "Web Developer",
                memberLinkedin: "https://www.linkedin.com/in/jathin-dhulipalla/",
                memberGithub: "https://github.com/jathinjd",
                memberEmail: "mailto:jathin57@gmail.com",
                memberFacebook: "https://www.facebook.com/jathin.dhulipalla",
                memberInstagram: "https://www.instagram.com/jathin.jd/",
            },
            {
                memberName: "Mrinalini Dey",
                memberImg: "mrinalini-dey.jpg",
                memberDesc: "Business Analyst",
                memberLinkedin: "https://www.linkedin.com/in/mrinalini-dey/",
                memberGithub: "https://github.com/",
                memberEmail: "mailto:mrinalini.dey@gmail.com",
                memberFacebook: "https://www.facebook.com/dey.mrinalini",
                memberInstagram: "https://www.instagram.com/mrinalinidey/",
            },
            {
                memberName: "Neeraj Aduri",
                memberImg: "Neeraj.jpg",
                memberDesc: " Web Developer",
                memberLinkedin: "https://www.linkedin.com/in/neeraj-aduri/",
                memberGithub: "https://github.com/NeerajAduri",
                memberEmail: "mailto:neeraj26@tamu.edu",
                memberFacebook: "https://www.facebook.com/neeraj.aduri",
                memberInstagram: "https://www.instagram.com/neerajaduri/",
            },
        ];

        return(
            <div className="about-us-entire-div">
                <div id="about-us-title"> ABOUT US </div>
                <div className="about-us-deets">
                    <img
                        src={hello}
                        alt="Ms. Sassy-Hass says Hello!"
                    />
                    <div id="about-us-details">
                        Spoons &amp; Ladles™ is a project spearheaded by BlueMango Ventures, an elite group of
                        food enthusiasts. This website hosts a plethora of recipes from all over the world, aiming to enhance the culinary experience
                        of users who are new to the art of cooking. While catering to inexperienced cooks is the main goal, sourcing recipes
                        from the public and rewarding them with points for it is one of the features we soon plan to implement.
                        Spoons &amp; Ladles™ will, in the future, offer financial rewards for users in exchange for the points they have accumulated.
                        The firm has employed expert chefs from all over the world for policing and monitoring the recipes that try to enter the S&amp;L digital
                        cookbook.
                        Creating a haven for recipes is the heart of this project. Come help us make this dream come true!
                        Create an account with us today!
                    </div>
                </div>
                <div id="meet-the-team-title"> MEET THE TEAM </div>
                <Grid container className = "grid-cont" spacing = {0}>
                    {membersList.map(member =>
                        <UserCard
                            member = {member}
                        />
                    )}
                </Grid>
            </div>

        );
    }
}

export default connect(null, { changeTabValue }) (withRouter(AboutUs));
