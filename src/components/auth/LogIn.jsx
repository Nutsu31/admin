import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [logIn, setLogIn] = useState({
    email: "",
    password: "",
  });
  const max512px = useMediaQuery("(max-width:512px)");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.admin.message);
  const errorStatus = useSelector((state) => state.admin.status);

  const handleLogin = (e) => {
    e.preventDefault();
    if (logIn.email && logIn.password) {
      axios({
        method: "POST",
        url: `${BASE_URL}admin-login`,
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          email: logIn.email,
          password: logIn.password,
        },
      })
        .then((res) => {
          dispatch({
            type: ACTIONS.ADMIN_LOGGED_IN,
            payload: res.data,
          });
          res.data.status === "ok" && navigate("/");
        })
        .catch((err) =>
          dispatch({
            type: ACTIONS.ADMIN_LOGGED_IN,
            payload: err.response.data,
          })
        );
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: 4,
        background: "#0e243a",
      }}
    >
      <Typography variant="h3" sx={{ color: "white", fontWeight: 700 }}>
        Drive Media Panel
      </Typography>

      <form
        style={{
          width: max512px ? "100%" : "500px",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 12,
          border: "1px solid #bebebe",
          borderRadius: "10px",
          background: "white",
          padding: 16,
        }}
        onSubmit={handleLogin}
      >
        <Typography variant="h5">Login</Typography>
        <TextField
          fullWidth
          label="Email"
          onChange={(e) =>
            setLogIn((curr) => ({
              ...curr,
              email: e.target.value,
            }))
          }
        />
        <TextField
          fullWidth
          type="password"
          label="Password"
          onChange={(e) =>
            setLogIn((curr) => ({
              ...curr,
              password: e.target.value,
            }))
          }
        />
        {errorStatus === "bad" && (
          <Typography component="p" sx={{ color: "red" }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ background: "#39b54a" }}
        >
          Log in
        </Button>
      </form>
    </Box>
  );
};

export default LogIn;
