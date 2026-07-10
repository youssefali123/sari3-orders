import { useEffect } from "react";

export default function SocialBarAd() {
  useEffect(() => {
    // Prevent loading it twice
    if (document.getElementById("adsterra-social-bar")) return;

    const script = document.createElement("script");
    script.id = "adsterra-social-bar";
    script.src =
      "https://pl30283502.effectivecpmnetwork.com/ee/05/7d/ee057dcdd9348c2c410e7753609ed598.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
}
