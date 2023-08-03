import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import HandleSign from "./HandleSign";
import { Close, Menu } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { ACTIONS } from "../../redux/actions";

const Dashboard = ({ activeBtn, setActiveBtn }) => {
  const max600 = useMediaQuery("(max-width:600px)");
  const [showMenu, setShowMenu] = useState(false);

  const dispatch = useDispatch();
  const handleLogOut = useCallback(() => {
    dispatch({ type: ACTIONS.LOG_OUT });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleButtonClick = useCallback(
    (btnNumber) => () => {
      setActiveBtn(btnNumber);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps

    [setActiveBtn]
  );

  useEffect(() => {
    setShowMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBtn]);
  return (
    <>
      {max600 && (
        <Button
          onClick={() => setShowMenu(!showMenu)}
          sx={{ display: showMenu ? "none" : "" }}
        >
          <Menu />
        </Button>
      )}
      <Box
        sx={{
          width: "345px",
          height: "100vh",
          background: "#0e243a",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          padding: "48px 16px 16px 16px",
          position: max600 && showMenu ? "relative" : max600 ? "absolute" : "",
          left: max600 && showMenu ? 0 : max600 ? "-350px" : "",
          zIndex: 2,
        }}
      >
        {max600 && (
          <Button
            onClick={() => setShowMenu(!showMenu)}
            sx={{ position: "absolute", right: 2, top: 2, color: "white" }}
          >
            <Close />
          </Button>
        )}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              background: "white",
              borderRadius: 2,
              padding: 2,
              textAlign: "center",
              fontSize: { sm: 22, xs: 16 },
            }}
          >
            Drive Media
          </Typography>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick(1)}
            sx={{
              background: activeBtn === 1 ? "white" : "#193755",
              color: activeBtn === 1 ? "black" : "white",

              borderTopLeftRadius: activeBtn === 1 ? 40 : 0,
              borderBottomLeftRadius: activeBtn === 1 ? 40 : 0,
              boxShadow: "none",

              height: 50,
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Upload File
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick(2)}
            sx={{
              background: activeBtn === 2 ? "white" : "#193755",
              color: activeBtn === 2 ? "black" : "white",
              boxShadow: "none",
              borderTopLeftRadius: activeBtn === 2 ? 40 : 0,
              borderBottomLeftRadius: activeBtn === 2 ? 40 : 0,
              height: 50,

              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Users
          </Button>
          <Button
            variant="contained"
            fullWidth
            onClick={() => handleButtonClick(3)}
            sx={{
              background: activeBtn === 3 ? "white" : "#193755",
              color: activeBtn === 3 ? "black" : "white",
              boxShadow: "none",
              borderTopLeftRadius: activeBtn === 3 ? 40 : 0,
              borderBottomLeftRadius: activeBtn === 3 ? 40 : 0,
              height: 50,

              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
          >
            Transactions
          </Button>
        </Box>
        <HandleSign />
        <Box sx={{ width: "100%" }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              background: "#39b54a",
              height: 50,
              color: "black",
              "&:hover": {
                backgroundColor: "#118621",
                color: "black",
              },
              justifyItems: "flex-end",
            }}
            onClick={handleLogOut}
          >
            Log Out
          </Button>
        </Box>
      </Box>
      <Box></Box>
    </>
  );
};

export default Dashboard;
