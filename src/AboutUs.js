import React from 'react';
import { connect } from 'react-redux';
import './AboutUs.css';
import { withRouter } from 'react-router-dom';
import UserCard from './UserCard';
import Grid from '@material-ui/core/Grid';
import { changeTabValue } from "./redux/actionCreators";
import aishwarya from './images/Users/aishwarya-manjunatha.jpg';

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
                memberDesc: "Developer",
                memberLinkedin: "https://google.com",
                memberGithub: "https://google.com",
                memeberEmail: "https://google.com",
                memeberFacebook: "https://google.com",
                memeberInstagram: "https://google.com",
            },
            {
                memberName: "Mrinalini Dey",
                memberImg: "mrinalini-dey.jpg",
                memberDesc: "Business Analyst",
                memberLinkedin: "https://google.com",
                memberGithub: "https://google.com",
                memeberEmail: "https://google.com",
                memeberFacebook: "https://google.com",
                memeberInstagram: "https://google.com",
            },
            {
                memberName: "Jathin Dhulipalla",
                memberImg: "user-picture.jpg",
                memberDesc: "Developer",
                memberLinkedin: "https://google.com",
                memberGithub: "https://google.com",
                memeberEmail: "https://google.com",
                memeberFacebook: "https://google.com",
                memeberInstagram: "https://google.com",
            },
            {
                memberName: "Neeraj Aduri",
                memberImg: "user-picture.jpg",
                memberDesc: "Developer",
                memberLinkedin: "https://google.com",
                memberGithub: "https://google.com",
                memeberEmail: "https://google.com",
                memeberFacebook: "https://google.com",
                memeberInstagram: "https://google.com",
            },
        ];

        return(
            <div className="about-us-entire-div">
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
