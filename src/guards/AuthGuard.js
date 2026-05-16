import PropTypes from "prop-types";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { styled } from "@mui/material/styles";

import { Typography, Dialog, DialogContent, Button, Card } from "@mui/material";
import { logoutPartner } from "src/services/JRMPartnerAuthService";
import { getAuthInfo, removeAuthInfo } from "src/auth/AppAuthStorage";
import ContactFormPopup from "src/sections/auth/register/ContactFormPopup";

// ----------------------------------------------------------------------
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    backgroundColor: "transparent",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
AuthGuard.propTypes = {
  children: PropTypes.node,
};

const decodeJWT = (token) => {
  try {
    const base64Url = token.split(".")[1]; // Extract payload part
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // Fix URL encoding
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    console.log(JSON.parse(jsonPayload));
    return JSON.parse(jsonPayload);
    // Parse into JSON
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

const isIatValid = (token) => {
  const decoded = decodeJWT(token);
  if (!decoded || !decoded.iat) {
    console.log("❌  Invalid JWT: No 'iat' field found");
    return false;
  }

  else {
    console.log("✅   JWT is valid: 'iat' is after 15-03-2025");
    return true;
  }

  // const issuedAt = new Date(decoded.iat * 1000); // Convert seconds to milliseconds
  // const cutoffDate = new Date("2025-03-15 16:00:00");

  // if (issuedAt < cutoffDate) {
  //   console.log("❌ JWT is invalid: 'iat' is before 15-03-2025");
  //   return false;
  // } else {
  //   console.log("✅   JWT is valid: 'iat' is after 15-03-2025");
  //   return true;
  // }
};

export default function AuthGuard({ children }) {
  const jwt = localStorage.getItem("jwt");
  const status = localStorage.getItem("profileStatus");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const storedLocation = localStorage.getItem("storedLocation");
    // {
    //   console.log("Stored location:", storedLocation);
    // }

    if (storedLocation) {
      navigate(storedLocation);
    }
    // else
    // {
    //   console.log('Current URL:', location.pathname);
    //   console.log('profileStatus', status);
    //   localStorage.setItem('storedLocation', location.pathname);
    // }
  }, [navigate]);

  const logout = async () => {
    const authInfo = await getAuthInfo();
    await logoutPartner(authInfo);
    await removeAuthInfo();
    localStorage.clear();
    window.location.reload();
    return <Navigate to="/" state={{ from: location }} replace />;
  };

  if (!jwt) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  } else if (isIatValid(jwt) === false) {
    async function logout() {
      const authInfo = await getAuthInfo();
      await logoutPartner(authInfo);
      await removeAuthInfo();
      localStorage.clear();

      return (
        <Navigate to="/auth/login" state={{ from: location }} replace />
      );
    }
    logout();
  } else if (status === 0) {
    console.log("inside profile status 0");
    return (
      <>
        <br />
        <BootstrapDialog
          open={status === 0 ? true : false}
          // scroll={scroll}
          BackdropProps={{ invisible: true }}
          closeAfterTransition={false}
          fullScreen={true}
        >
          <DialogContent sx={{ backgroundColor: "#000000" }}>
            <br />
            <Card
              sx={{
                marginTop: "30px",
                marginLeft: "20px",
                marginRight: "20px",
                padding: "30px",
                backgroundColor: "transparent",
              }}
            >
              <Typography align="center" variant="h4">
                Dear Partner
              </Typography>
              <Typography align="center" variant="h4">
                Please provide your information
              </Typography>
              <ContactFormPopup />
              <Button onClick={logout} color="error">
                Logout
              </Button>
            </Card>
          </DialogContent>
        </BootstrapDialog>
        <br />
      </>
    );
  } else {
    return children;
  }
}
