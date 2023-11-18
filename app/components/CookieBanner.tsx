"use client";
import { useEffect, useState } from "react";
import { useCookies } from "next-client-cookies";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const cookies = useCookies();

  useEffect(
    () => {
      if (!cookies.get("cookieBannerDisplayed")) {
        setShowBanner(true);
      }
    },
    [cookies]
  );

  const acceptCookies = () => {
    setShowBanner(false);
    cookies.set("cookieBannerDisplayed", "true", { path: "/" });
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div role="alert" className="alert">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.</span>
      <div>
       
        <button className="btn btn-sm btn-primary onClick={acceptCookies}">Accept</button>
      </div>
    </div>
    // <div>
    //   <p>We use cookies to improve your experience on our website. By browsing this website, you agree to our use of cookies.</p>
    //   <button onClick={acceptCookies}>Accept</button>
    // </div>
  );
}
