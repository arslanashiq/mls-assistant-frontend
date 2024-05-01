"use client";
import ScrollToTop from "@/components/common/ScrollTop";
import Aos from "aos";
import "../../node_modules/react-modal-video/scss/modal-video.scss";
import "aos/dist/aos.css";
import "../../public/scss/main.scss";
import "../../public/starter/styles/bootstrap.min.css";
import "../../public/starter/styles/starter.css";
import "../../public/starter/styles/custom.css";
import "../../public/scss/custom.scss";
import { DM_Sans, Poppins } from "next/font/google";
import { useEffect, useState } from "react";
import "react-chatbot-kit/build/main.css";
import Chat from "./Chat";
import { SnackbarProvider } from "notistack";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googleAPIKey, googleKey } from "../../config/config";
import AppContext from "@/custom-hooks/AppContext";
import LoginModal from "@/components/modal/LoginModal";
import EmailVerificationModal from "@/components/modal/EmailVerificationModal";
import domainsData from "../data/domains.json"
if (typeof window !== "undefined") {
  import("bootstrap");
}
// DM_Sans font
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--body-font-family",
});
// Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--title-font-family",
});
export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);
  useEffect(() => {
    // Initialize Google Maps API script
    const googleMapsScript = document.createElement("script");
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${googleAPIKey}&libraries=places`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    // Set a callback to handle script loading completion
    googleMapsScript.onload = () => {
      // Initialize any components or logic that depend on Google Maps API here
      //console.log("Google Maps API script loaded successfully");
    };
    // Append the script element to the document body
    document.body.appendChild(googleMapsScript);
    // Initialize jQuery
    const jqueryScript = document.createElement("script");
    jqueryScript.src = "https://code.jquery.com/jquery-3.7.1.min.js";
    jqueryScript.integrity = "sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=";
    jqueryScript.crossOrigin = "anonymous";
    jqueryScript.async = true;
    // Append jQuery script to the document body
    document.body.appendChild(jqueryScript);
  }, []);
  useEffect(() => {
    // Check domain availability and pro user status when component mounts
    const currentDomain = window.location.hostname;
    const isDomainAvailable = checkDomainAvailability(currentDomain);
    const proUsername = extractUsernameFromPath(window.location.pathname);
    const isProUser = checkProSlugAvailability(proUsername);
    // Set domain and pro user status in localStorage
    localStorage.setItem('currentDomain', currentDomain);
    localStorage.setItem('isDomainAvailable', isDomainAvailable.toString());
    if (isProUser) {
      localStorage.setItem('proUsername', proUsername);
    } else {
    }
  }, []);
  const checkDomainAvailability = (domain) => {
    return domainsData.domains.some(item => item.domain === domain);
  };
  const extractUsernameFromPath = (path) => {
    const parts = path.split('/pro/');
    if (parts.length === 2) {
      return parts[1].split('/')[0]; // This ensures we only get the username part
    }
    return null;
  };
  const checkProSlugAvailability = (username) => {
    return domainsData.domains.some(item => item.slug === username);
  };
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="./images/apple-touch-icon.png"/>
        <link rel="icon" type="image/png" sizes="32x32" href="./images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="./images/favicon-16x16.png"/>
      </head>
      <body
        className={`body  ${poppins.className} ${dmSans.className}`}
        cz-shortcut-listen="false"
      >
        <AppContext>
          <GoogleOAuthProvider clientId={googleKey}>
            <SnackbarProvider
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              maxSnack={3}
              autoHideDuration={2000}
            >
              <LoginModal />
              <EmailVerificationModal />
              <div className="wrapper ovh">
                {children}
                {/* <Chat></Chat> */}
              </div>
              <ScrollToTop />
            </SnackbarProvider>
          </GoogleOAuthProvider>
        </AppContext>
      </body>
    </html>
  );
}
