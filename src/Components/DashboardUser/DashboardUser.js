import React, { useEffect, useState } from "react";

// function
import { fistename } from "../../js/function";

// Mui
import {
  Box,
  Grid,
  Typography,
  Divider,
  ListItemButton,
  List,
  ListItemIcon,
  ListItemText,
  styled,
  Avatar,
  Alert,
  Snackbar,
  IconButton,
} from "@mui/material";

// Mui Icons
import PersonIcon from "@mui/icons-material/Person";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ForumIcon from "@mui/icons-material/Forum";
import LogoutIcon from "@mui/icons-material/Logout";
import CloseIcon from "@mui/icons-material/Close";

// Graph QL
import { useQuery } from "@apollo/client";
import {
  GET_POSTS_FOR_USER,
  GET_POSTS_SAVED_BY_USER,
  GET_USER_DASHBOARD,
} from "../GraphQl/query";
import { useNavigate } from "react-router-dom";
import CardDashboard from "../Card/CardDashboard";

// Customize Mui
const Customize_ListItemText = styled(ListItemText)({
  "& span": {
    fontWeight: "bold",
    color: "#666",
    fontSize: "15px !important",
  },
});

const DashboardUser = () => {
  // Get data in localStorage
  const email_login = JSON.parse(localStorage.getItem("info_User"));

  // Get User
  const { loading, error, data } = useQuery(GET_USER_DASHBOARD, {
    variables: { email: `${email_login && email_login.email}` },
  });

  // betting for click to list item
  const [account, setAccount] = useState(true);
  const [favorite_posts, setFavorite_posts] = useState(false);
  const [followauthor, setFollowauthor] = useState(false);
  const [ticket, setTicketauthor] = useState(false);

  const accountHandeler = () => {
    setAccount(true);
    setFavorite_posts(false);
    setFollowauthor(false);
    setTicketauthor(false);
  };

  const favorite_postsHandeler = () => {
    setFavorite_posts(true);
    setAccount(false);
    setFollowauthor(false);
    setTicketauthor(false);
  };

  const followingHandeler = () => {
    setFollowauthor(true);
    setFavorite_posts(false);
    setAccount(false);
    setTicketauthor(false);
  };

  const ticketHandeler = () => {
    setTicketauthor(true);
    setFollowauthor(false);
    setFavorite_posts(false);
    setAccount(false);
  };

  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  // GET POST SAVED
  const {
    data: dataGetSavePOST,
    loading: loadingGetPOST,
    refetch: refetchSavePost,
  } = useQuery(GET_POSTS_FOR_USER, {
    variables: {
      emailPersonPost_Betting: `${
        data && data.person !== null && data.person.email
      }`,
    },
  });

  // const {data:dataPostsSaved} = useQuery(GET_POSTS_SAVED_BY_USER, {
  //   variables:{
  //     slug_post_saved:
  //   }
  // })

  // useEffect(() => {
  //   if(!loadingGetPOST){
  //     if(dataGetSavePOST)
  //   }
  // },[dataGetSavePOST])

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const exitHandeler = () => {
    setOpen(true);
    setTimeout(() => {
      localStorage.removeItem("info_User");
      navigate("/");
    }, 1000);
  };

  if (loading) return <Typography>Loading ...</Typography>;

  if (error) return <Typography>Error ...</Typography>;

  if (data && data.person === null)
    return <Typography>شما هنوز وارد سایت نشدید!!!</Typography>;

  if (data && data.person !== null)
    return (
      <Box
        maxWidth="100%"
        mx="auto"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Grid
          container
          spacing={2}
          mx="auto"
          my={3}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid
            xs={12}
            md={2.5}
            item
            sx={{
              minHeight: "fit-content",
              height: "100%",
              padding: "8px !important",
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "rgb(233 233 233) 0px 8px 24px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
            mr={2}
          >
            <Avatar
              sx={{
                backgroundColor: "#BDBDBD",
                color: "#fff",
                fontWeight: "bold",
                width: "100px",
                height: "100px",
                fontSize: "3rem",
                marginBottom: "16px",
              }}
            >
              {fistename(data.person.userName)}
            </Avatar>
            <Typography
              component="span"
              sx={{ fontWeight: "bold" }}
              color="#666"
              variant="h6"
            >
              {data.person.userName}
            </Typography>
            <Typography component="span" color="#666" variant="span">
              {data.person.email}
            </Typography>
            <Divider variant="middle" sx={{ width: "100%", pt: 1, pb: 2 }} />
            <List
              sx={{ width: "100%" }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <ListItemButton
                onClick={accountHandeler}
                sx={{ borderRadius: "5px" }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: "8px",
                    color: "#666",
                    minWidth: "fit-content !important",
                  }}
                >
                  <PersonIcon />
                </ListItemIcon>
                <Customize_ListItemText primary="حساب کاربری" />
              </ListItemButton>
              <ListItemButton
                onClick={favorite_postsHandeler}
                sx={{ borderRadius: "5px" }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: "8px",
                    color: "#666",
                    minWidth: "fit-content !important",
                  }}
                >
                  <TurnedInIcon />
                </ListItemIcon>
                <Customize_ListItemText primary="پست های سیو شده" />
              </ListItemButton>
              <ListItemButton
                onClick={followingHandeler}
                sx={{ borderRadius: "5px" }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: "8px",
                    color: "#666",
                    minWidth: "fit-content !important",
                  }}
                >
                  <PeopleAltIcon />
                </ListItemIcon>
                <Customize_ListItemText primary="نویسنده های دنبال شده" />
              </ListItemButton>
              <ListItemButton
                onClick={ticketHandeler}
                sx={{ borderRadius: "5px" }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: "8px",
                    color: "#666",
                    minWidth: "fit-content !important",
                  }}
                >
                  <ForumIcon />
                </ListItemIcon>
                <Customize_ListItemText primary="تیکت" />
              </ListItemButton>
              <ListItemButton
                onClick={exitHandeler}
                sx={{ borderRadius: "5px" }}
              >
                <ListItemIcon
                  sx={{
                    marginRight: "8px",
                    color: "#ff6347",
                    minWidth: "fit-content !important",
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <Customize_ListItemText
                  sx={{ color: "#ff6347" }}
                  primary="خروج"
                />
              </ListItemButton>
            </List>
          </Grid>

          {account && (
            <Grid
              xs={12}
              md={8.5}
              item
              sx={{
                height: "fit-content",
                padding: "24px !important",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "rgb(233 233 233) 0px 8px 24px",
              }}
              ml={2}
            >
              <Typography component="h6" variant="h6" mb={2} fontWeight="bold">
                سلام {data.person.userName} عزیز❤️
              </Typography>
              <Typography component="span" variant="span">
                به پنل خودت خوش اومدی رفیق 👌
              </Typography>
              <Alert
                severity="warning"
                sx={{ fontWeight: "bold", mt: 5, fontSize: "15px" }}
              >
                لطفا اگه جایی به مشکل خوردی از بخش تیکت از ما بپرس
              </Alert>
            </Grid>
          )}
          {favorite_posts && (
            <Grid
              xs={12}
              md={8.5}
              item
              sx={{
                height: "fit-content",
                padding: "24px !important",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "rgb(233 233 233) 0px 8px 24px",
              }}
              ml={2}
              container
              spacing={2}
            >
              {data &&
                dataGetSavePOST &&
                dataGetSavePOST.saveposts.length > 0 &&
                dataGetSavePOST.saveposts.map((item) => (
                  <CardDashboard key={item.slugPostSaved} {...item} />
                ))}
            </Grid>
          )}

          {followauthor && (
            <Grid
              xs={12}
              md={8.5}
              item
              sx={{
                height: "fit-content",
                padding: "24px !important",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "rgb(233 233 233) 0px 8px 24px",
              }}
              ml={2}
            >
              followauthor
            </Grid>
          )}

          {ticket && (
            <Grid
              xs={12}
              md={8.5}
              item
              sx={{
                height: "fit-content",
                padding: "24px !important",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "rgb(233 233 233) 0px 8px 24px",
              }}
              ml={2}
            >
              ticket
            </Grid>
          )}
          <Snackbar
            open={open}
            autoHideDuration={3500}
            onClose={handleClose}
            action={action}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "fit-content" }}
            >
              از حساب خود خارج شدید
            </Alert>
          </Snackbar>
        </Grid>
      </Box>
    );
};

export default DashboardUser;
