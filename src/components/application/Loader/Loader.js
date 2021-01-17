import React from "react";
import "./Loader.css";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Logo from '../../../Assets/logo.png'
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: "100%",
    borderRadius: 22,
    background: "#061336",
    color:'#ffffff'

  },
  media: {
    height: 180,
    maxHeight:300
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const Loading = () => {
  const classes = useStyles();

  return (
    <>
      <div
        style={{
          height: window.outerHeight,
          width: window.outerWidth,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <div class="box">
          <div class="box-inner">
            <div class="box-front">
              <Card className={[classes.root, classes.card]}>
                <img src={Logo} alt={"logo"} className={classes.media}/>
              </Card>
            </div>
            <div class="box-back">
              <Card className={[classes.root, classes.card]}>
                <CardContent>
                  <Typography component="h5" variant="h5">
                    ByBrisk
                  </Typography>
                </CardContent>
              </Card>{" "}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
