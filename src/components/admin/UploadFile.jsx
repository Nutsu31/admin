import {
  Alert,
  Box,
  Button,
  FormControl,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../utils";
import CircularProgress from "@mui/material/CircularProgress";

const UploadFile = () => {
  const [files, setFiles] = useState();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({});
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFiles(e.target.files[0]);
    }
  };

  useEffect(() => {
    let alertTimeOut;
    if (alert.message && alert.result) {
      alertTimeOut = setTimeout(() => setAlert({}), 3000);
    }

    return () => {
      if (alertTimeOut) {
        clearTimeout(alertTimeOut);
      }
    };
  }, [alert.message, alert.result]);

  const max600px = useMediaQuery("(max-width:600px)");

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    if (files) {
      formData.append("file", files.name);
    } else {
      return;
    }

    try {
      axios
        .post(`${BASE_URL}upload-file`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => setAlert(res.data))
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <Box
      sx={{
        width: "85%",
        position: max600px ? "absolute" : "",
        top: 28,
        left: 20,
      }}
    >
      {alert?.status === "ok" && (
        <Alert severity="success" sx={{ height: 70, fontSize: 24 }}>
          {alert?.message}
        </Alert>
      )}
      <form
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onSubmit={onSubmit}
      >
        <FormControl>
          <Typography variant="h4" sx={{ fontSize: { sm: 20, xs: 18 } }}>
            Upload File(csv,xlsx)
          </Typography>
          <TextField
            type="file"
            onChange={handleFileChange}
            sx={{ height: 70 }}
          />
          {files ? (
            <>
              <Typography variant="h6">Name: {files.name}</Typography>
              <Typography variant="h6">
                Size: {files.size?.toLocaleString()} kb
              </Typography>
            </>
          ) : null}
          {loading ? (
            <>
              <Box
                sx={{
                  width: "100%",
                  height: 50,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            </>
          ) : null}
          <Button
            type="submit"
            variant="contained"
            sx={{ background: "#193755", "&:hover": { background: "#39b54a" } }}
          >
            Upload
          </Button>
        </FormControl>
      </form>
    </Box>
  );
};

export default UploadFile;
