import React, { useState } from "react";

// Mui
import {
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  IconButton,
  AvatarGroup,
  Box,
} from "@mui/material";

// react-ruoter-dom
import { Link } from "react-router-dom";

// icons
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import FavoriteIcon from "@mui/icons-material/Favorite";

// js function
import { fistename, sharePage } from "../../js/function";

// LazyLoadImage
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "../shared/lazy_load.css";

// Graph Ql
import { useQuery } from "@apollo/client";
import { GET_USER } from "../GraphQl/query";

const CardElement = ({
  title,
  author,
  slug,
  coverphoto,
  comments,
  category,
}) => {
  // Get data in localStorage
  const email_login = JSON.parse(localStorage.getItem("info_User"));

  // Get User
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { email: `${email_login && email_login.email}` },
  });

  // lick betting
  const [icon_like, setIcon_like] = useState(false);
  const likeHandeler = (e) => {
    setIcon_like(!icon_like);
  };

  return (
    <Card
      sx={{
        bgcolor: "white",
        borderRadius: "10px",
        cursor: "pointer",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        boxShadow: "0px 2px 15px 1px rgba(0, 0, 0, 0.2)",
        "&:hover": { boxShadow: "0px 2px 15px 3px rgba(0, 0, 0, 0.2)" },
        position: "relative",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.04)",
              marginLeft: "8px",
              width: 40,
              height: 40,
            }}
          >
            <LazyLoadImage
              width="100%"
              height="100%"
              src={author.image.url}
              effect="blur"
              alt={title}
              id="lazy_img"
            />
          </Avatar>
        }
        title={author.name}
      />
      <CardMedia width="100%" height="100%">
        <LazyLoadImage
          width="100%"
          height={194}
          src={coverphoto.url}
          effect="blur"
          alt={title}
          id="lazy_img"
        />
      </CardMedia>
      <Box
        sx={{
          position: "absolute",
          top: "78px",
          left: "5px",
          backgroundColor: "white",
          padding: "0px 10px 5px 10px",
          borderRadius: "31px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          component="span"
          variant="span"
          fontWeight="bold"
          fontSize="14px"
        >
          {category === "programming" && "برنامه نویسی"}
          {category === "digital-world" && "دنیای دیجیتال"}
          {category === "technology" && "تکنولوژی"}
        </Typography>
      </Box>
      <CardContent>
        <Link to={`blogs/${slug}`} style={{ color: "#666" }}>
          <Typography
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            component="h3"
            varianr="h5"
            fontWeight="bold"
          >
            {title}
          </Typography>
        </Link>
      </CardContent>
      <CardActions disableSpacing sx={{ direction: "ltr" }}>
        {!data ? (
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
        ) : data.person !== null ? (
          <IconButton onClick={likeHandeler} aria-label="add to favorites">
            {icon_like ? (
              <FavoriteIcon sx={{ color: "#ff6347" }} />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        ) : (
          <IconButton aria-label="add to favorites">
            <FavoriteBorderIcon />
          </IconButton>
        )}

        <IconButton
          aria-label="share"
          onClick={() => sharePage(title, `/blogs/${slug}`)}
        >
          <ShareIcon />
        </IconButton>
        {comments.length > 2 ? (
          <AvatarGroup
            total={comments.length}
            max={3}
            sx={{ direction: "ltr", marginLeft: "auto", width: 30, height: 30 }}
          >
            <Avatar
              src={`${
                comments[0].avatar !== null &&
                comments[0].avatar.url &&
                comments[0].avatar.url
              }`}
              sx={{
                bgcolor: "#f2f2f2",
                color: "#666",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                objectFit: "cover",
              }}
            >
              {comments[0].avatar === null && fistename(comments[0].name)}
            </Avatar>
            <Avatar
              src={`${
                comments[1].avatar !== null &&
                comments[1].avatar.url &&
                comments[1].avatar.url
              }`}
              sx={{
                bgcolor: "#f2f2f2",
                color: "#666",
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                objectFit: "cover",
              }}
            >
              {comments[1].avatar === null && fistename(comments[1].name)}
            </Avatar>
          </AvatarGroup>
        ) : (
          comments.length >= 1 && (
            <AvatarGroup
              total={comments.length}
              max={1}
              sx={{
                direction: "ltr",
                marginLeft: "auto",
                width: 30,
                height: 30,
              }}
            >
              <Avatar
                src={`${
                  comments[0].avatar !== null &&
                  comments[0].avatar.url &&
                  comments[0].avatar.url
                }`}
                sx={{
                  bgcolor: "#f2f2f2",
                  color: "#666",
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  objectFit: "cover",
                }}
              >
                {comments[0].avatar === null && fistename(comments[0].name)}
              </Avatar>
            </AvatarGroup>
          )
        )}

        {comments.length === 0 && (
          <Typography ml="auto" component="p" variant="p">
            بدون کامنت
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default CardElement;
