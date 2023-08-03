import { Box, Button, Typography } from "@mui/material";
import React, { memo } from "react";
const EachTransaction = ({ payouts }) => {
  return (
    <Box
      sx={{
        width: 400,
        height: 400,
        background: "white",
        borderRadius: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <Box
        sx={{
          height: 300,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Typography>id: {payouts.id}</Typography>
        <Typography>Dest: {payouts.destination}</Typography>
        <Typography>Date: {payouts.createdAt}</Typography>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h3">{payouts.currency}</Typography>
          <Typography variant="h3">{payouts.amount}</Typography>
        </Box>
        <Typography
          sx={{
            padding: 1,
            borderRadius: 2,
            background:
              payouts.status === "pending"
                ? "#ffbe5c"
                : payouts.status === "completed"
                ? "#aaff9f"
                : "",
          }}
        >
          {payouts.status}
        </Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Button
          sx={{
            width: 160,
            height: 60,
            background: "#aaff9f",
            color: "#277c00",
          }}
        >
          Confirm
        </Button>
        <Button
          sx={{
            width: 160,
            height: 60,
            background: "#ffbe5c",
            color: "#5c3700",
          }}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
};

export default memo(EachTransaction);
