import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import { useNavigate } from "react-router-dom";

const ChooseProfile = () => {
  const navigate = useNavigate();

  return (
    <Box
      minHeight="70vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)", // Soft blue/gray gradient
        py: 8,
      }}

    >
      <Stack direction={{ xs: "column", sm: "row" }} spacing={6}>
        {/* User Card */}
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 4,
            minWidth: 260,
            textAlign: "center",
            cursor: "pointer",
            color: "#fff",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-8px) scale(1.04)",
              boxShadow: 12,
              background: "linear-gradient(135deg, #e0c3fc 0%,rgb(61, 148, 236) 100%)",
            },
            background: "linear-gradient(135deg, #e0c3fc 0%,rgb(67, 146, 224) 100%)",
          }}
          onClick={() => navigate("/login?role=user")}
        >
          <PersonIcon sx={{ fontSize: 60, color: "#fff", mb: 2 }} />
          <Typography variant="h6" fontWeight="bold" mb={1}>
            User
          </Typography>
          <Typography variant="body2" color="#fff">
            Shop, explore, and enjoy exclusive deals as a valued customer.
          </Typography>
        </Paper>
        {/* Merchant Card */}
        <Paper
          elevation={8}
          sx={{
            p: 5,
            borderRadius: 4,
            minWidth: 260,
            textAlign: "center",
            cursor: "pointer",
            color: "#fff",
            transition: "transform 0.2s, box-shadow 0.2s",
            "&:hover": {
              transform: "translateY(-8px) scale(1.04)",
              boxShadow: 12,
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            },
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          }}
          onClick={() => navigate("/login?role=merchant")}
        >
          <StoreIcon sx={{ fontSize: 60, color: "#fff", mb: 2 }} />
          <Typography variant="h6" fontWeight="bold" mb={1}>
            Merchant
          </Typography>
          <Typography variant="body2" color="#fff">
            Sell your products, manage your store, and reach more customers.
          </Typography>
        </Paper>
      </Stack>
    </Box>
  );
};

export default ChooseProfile;