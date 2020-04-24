import React from 'react';
import { connect } from 'react-redux';
import './AboutUs.css';
import { withRouter } from 'react-router-dom';
import UserCard from './UserCard';
import Grid from '@material-ui/core/Grid';

class AboutUs extends React.Component {
        
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,
        };
    }

    componentDidMount(){
        
    }

    render(){

        const membersList = [
            {
                memberName: "Patrick",
                memberImg: "placeholder.png",
                memberDesc: "lorem ipsum calcium sulphate is gypsum",
                memberLinkedin: "https://google.com",
                memberGithub: "https://google.com",
                memeberEmail: "https://google.com",
                memeberFacebook: "https://google.com",
                memeberInstagram: "https://google.com",
            },
            {
                memberName: "Patrick",
                memberImg: "placeholder.png",
                memberDesc: "lorem ipsum calcium sulphate is gypsum",
                memberLinkedin: "https://google.com",
                memberGithub: "https://google.com",
                memeberEmail: "https://google.com",
                memeberFacebook: "https://google.com",
                memeberInstagram: "https://google.com",
            },
            {
                memberName: "Patrick",
                memberImg: "placeholder.png",
                memberDesc: "lorem ipsum calcium sulphate is gypsum",
                memberLinkedin: "https://google.com",
                memberGithub: "https://google.com",
                memeberEmail: "https://google.com",
                memeberFacebook: "https://google.com",
                memeberInstagram: "https://google.com",
            },
            {
                memberName: "Patrick",
                memberImg: "placeholder.png",
                memberDesc: "lorem ipsum calcium sulphate is gypsum",
                memberLinkedin: "https://google.com",
                memberGithub: "https://google.com",
                memeberEmail: "https://google.com",
                memeberFacebook: "https://google.com",
                memeberInstagram: "https://google.com",
            },
        ]

        return(
            <Grid container className = "grid-cont" spacing = {0}>
                {membersList.map(member =>
                    <UserCard
                        member = {member}
                    />
                )}
            </Grid>

        );
    }
}

export default withRouter(AboutUs);
