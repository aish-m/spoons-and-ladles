import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from'@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import GitHubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import './UserCard.css';

const useStyles = makeStyles({
    root: {
        margin: 10,
        maxHeight: 480,
        maxWidth: 280,
    },
});

function UserCard(props) {
    const classes = useStyles();
    return (
        <Card className = {classes.root}>
            <CardActionArea>
                <img className = 'card-img'
                    src = {require("./images/Team/placholder.png")}
                    alt = {props.memberName}
                />
                <CardContent className = "content">
                    <Typography className = "content-head" gutterBottom variant = "h5" component = "h2">
                        {props.memberName}
                    </Typography>
                    <Typography className = "content-text" variant="body2" color="textSecondary" component="p">
                        {props.memberDesc}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions className = "card-bottom">
                <a target = "_blank" href = {props.memberLinkedin}>
                    <IconButton component="span">
                        <LinkedInIcon />
                    </IconButton>
                </a>
                <a target = "_blank" href = {props.memberGithub}>
                    <IconButton component="span">
                        <GitHubIcon />
                    </IconButton>
                </a>
                <a target = "_blank" href = {props.memberEmail}>
                    <IconButton component="span">
                        <EmailIcon />
                    </IconButton>
                </a>
                <a target = "_blank" href = {props.memberFacebook}>
                    <IconButton component="span">
                        <FacebookIcon />
                    </IconButton>
                </a>
                <a target = "_blank" href = {props.memberInstagram}>
                    <IconButton component="span">
                        <InstagramIcon />
                    </IconButton>
                </a>
            </CardActions>
        </Card>
    );
}

export default UserCard;
