import { Button } from "@/components/ui/button";
import { Monitor } from "lucide-react";
import demoScreenshot from "@/assets/demo-screenshot.png";
import theme1 from "@/assets/theme5.png";
import theme2 from "@/assets/theme2.png";
import theme3 from "@/assets/theme3.png";
import theme4 from "@/assets/theme4.png";
import { useState } from "react";

const HeroSection = () => {
  const [images, setImages] = useState({
    main: demoScreenshot,
    leftBack: theme3,
    leftFront: theme4,
    rightBack: theme1,
    rightFront: theme2,
  });

  const handleSwap = (position: keyof typeof images) => {
    setImages((prev) => ({
      ...prev,
      main: prev[position],
      [position]: prev.main,
    }));
  };

  return (
    <section className="relative flex flex-col items-center text-center pt-12 pb-0 px-4 overflow-hidden">

      {/* ── Math grid background ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right,  rgba(252, 191, 73, 0.45) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(252, 191, 73, 0.45) 2px, transparent 2px)
          `,
          backgroundSize: "48px 48px",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, black 20%, black 60%, transparent 85%)",
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, black 20%, black 60%, transparent 85%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center w-full">

        {/* Top Tagline */}
        <div className="mb-6 animate-fade-in">
          <span className="text-xl md:text-2xl font-bold text-foreground">
            Your <span className="underline decoration-primary decoration-4 underline-offset-4">all in one</span> POS
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground leading-[1.05] max-w-5xl mb-6 animate-fade-in-up">
          Elevate Your{" "}
          <span className="italic underline decoration-primary decoration-4 underline-offset-8">
            Business
          </span>{" "}
          with QuickBiza
        </h1>

        {/* Subtitle */}
        <p
          className="text-muted-foreground text-lg max-w-xl mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.15s", opacity: 0 }}
        >
          Elevate your business with QuickBiza — the all-in-one platform for
          managing products, sales, and inventory with ease.
        </p>

        {/* Download button — sole CTA */}
        <div
          className="flex items-center mb-6 animate-fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          <a href="/downloads/QuickBiza_Setup_1.0.3.exe" download>
            <Button
              size="lg"
              className="rounded-full px-14 py-6 text-base font-semibold shadow-lg gap-2 hover-glow hover-scale"
            >
              <Monitor className="w-5 h-5" />
              Download App
            </Button>
          </a>
        </div>

        {/* Social proof */}
        <div
          className="flex items-center gap-2 mb-12 animate-fade-in"
          style={{ animationDelay: "0.45s", opacity: 0 }}
        >
          <div className="flex -space-x-2">
            <div className="w-7 h-7 rounded-full bg-primary/80 border-2 border-card" />
            <div className="w-7 h-7 rounded-full bg-foreground/60 border-2 border-card" />
            <div className="w-7 h-7 rounded-full bg-primary/50 border-2 border-card" />
          </div>
          <span className="text-sm text-muted-foreground">
            Loved by over 3 million users
          </span>
        </div>

        {/* ── Demo image block ── */}
        <div
          className="relative w-full max-w-5xl mx-auto animate-scale-in"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >

          {/* ── Left stacked theme cards ── */}
          <div
            className="hidden lg:flex flex-col items-center absolute z-20"
            style={{ left: "-280px", bottom: "40px" }}
          >
            {/* back card */}
            <div
              onClick={() => handleSwap("leftBack")}
              className="rounded-2xl overflow-hidden border-2 border-border shadow-2xl cursor-pointer hover:scale-105 hover:z-30 hover:shadow-[0_0_30px_rgba(252,191,73,0.5)] transition-all duration-300"
              style={{
                width: "320px",
                height: "208px",
                transform: "rotate(-10deg) translateY(45px) translateX(16px)",
                zIndex: 1,
              }}
            >
              <img src={images.leftBack} alt="Theme option" className="w-full h-full object-cover" />
            </div>
            {/* front card */}
            <div
              onClick={() => handleSwap("leftFront")}
              className="rounded-2xl overflow-hidden border-2 border-border shadow-2xl cursor-pointer hover:scale-105 hover:z-30 hover:shadow-[0_0_30px_rgba(252,191,73,0.5)] transition-all duration-300"
              style={{
                width: "320px",
                height: "208px",
                transform: "rotate(-4deg)",
                zIndex: 2,
              }}
            >
              <img src={images.leftFront} alt="Theme option" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* ── Right stacked theme cards ── */}
          <div
            className="hidden lg:flex flex-col items-center absolute z-20"
            style={{ right: "-280px", bottom: "40px" }}
          >
            {/* back card */}
            <div
              onClick={() => handleSwap("rightBack")}
              className="rounded-2xl overflow-hidden border-2 border-border shadow-2xl cursor-pointer hover:scale-105 hover:z-30 hover:shadow-[0_0_30px_rgba(252,191,73,0.5)] transition-all duration-300"
              style={{
                width: "320px",
                height: "208px",
                transform: "rotate(10deg) translateY(45px) translateX(-16px)",
                zIndex: 1,
              }}
            >
              <img src={images.rightBack} alt="Theme option" className="w-full h-full object-cover" />
            </div>
            {/* front card */}
            <div
              onClick={() => handleSwap("rightFront")}
              className="rounded-2xl overflow-hidden border-2 border-border shadow-2xl cursor-pointer hover:scale-105 hover:z-30 hover:shadow-[0_0_30px_rgba(252,191,73,0.5)] transition-all duration-300"
              style={{
                width: "320px",
                height: "208px",
                transform: "rotate(4deg)",
                zIndex: 2,
              }}
            >
              <img src={images.rightFront} alt="Theme option" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* ── Main screenshot container ── */}
          <div className="bg-foreground rounded-3xl p-4 pt-8 md:p-8 md:pt-12 shadow-2xl">
            <img
              key={images.main} // Adding key forces a re-render/animation if we wanted to add a fade-in on the image itself
              src={images.main}
              alt="QuickBiza Dashboard"
              className="w-full h-full max-h-[700px] object-cover rounded-2xl shadow-lg border border-border/20 animate-fade-in"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;