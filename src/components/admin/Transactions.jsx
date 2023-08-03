import axios from "axios";
import EachTransaction from "./EachTransaction";
import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { BASE_URL } from "../../utils";
import { ACTIONS } from "../../redux/actions";
import { v4 as uuid } from "uuid";
import { useSelector, useDispatch } from "react-redux";

const Transactions = () => {
  const payouts = useSelector((state) => state.transactions);
  const [payOuts, setPayOuts] = useState([]);

  const dispatch = useDispatch();
  useEffect(() => {
    let isMounted = true;
    async function getPayouts() {
      const res = await axios.get(`${BASE_URL}get-payouts`);
      const data = res.data;
      if (isMounted) {
        setPayOuts(data);
        return dispatch({ type: ACTIONS.FETCH_TRANSACTIONS, payload: data });
      }
    }
    getPayouts();

    return () => {
      isMounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterCompleted = useCallback(() => {
    const completed = [...payouts].filter(
      (payout) => payout.status === "completed"
    );
    dispatch({ type: ACTIONS.FILTER_TRANSACTIONS, payload: completed });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterActive = useCallback(() => {
    return dispatch({
      type: ACTIONS.FILTER_TRANSACTIONS,
      payload: payOuts,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterFailed = useCallback(() => {
    const failed = [...payouts].filter((payout) => payout.status === "failed");
    dispatch({ type: ACTIONS.FILTER_TRANSACTIONS, payload: failed });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box sx={{ width: "100%", padding: 3, height: "100vh", overflow: "auto" }}>
      <Box sx={{ width: "100%", height: 70 }}>
        <Typography variant="h3">Incoming Payouts</Typography>
      </Box>
      <Box
        sx={{
          width: 500,
          height: 70,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
        }}
      >
        <Button
          fullWidth
          onClick={handleFilterActive}
          variant="contained"
          sx={{
            background: "white",
            color: "black",
            "&:hover": {
              background: "#23f03e",
            },
          }}
        >
          Active
        </Button>
        <Button
          fullWidth
          onClick={handleFilterCompleted}
          variant="contained"
          sx={{
            background: "white",
            color: "black",
            "&:hover": {
              background: "#23f03e",
            },
          }}
        >
          Completed
        </Button>
        <Button
          fullWidth
          onClick={handleFilterFailed}
          variant="contained"
          sx={{
            background: "white",
            color: "black",
            "&:hover": {
              background: "#23f03e",
            },
          }}
        >
          Failed
        </Button>
      </Box>
      <Box sx={{ width: "100%", display: "flex", gap: 2, flexWrap: "wrap" }}>
        {payouts.map((payout) => (
          <EachTransaction key={uuid()} payouts={payout} />
        ))}
      </Box>
    </Box>
  );
};

export default Transactions;
