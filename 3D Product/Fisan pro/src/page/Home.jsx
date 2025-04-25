import { gsap } from "gsap";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline();

    if (isLoading) {
      timeline
        .fromTo(
          ".text-initializing",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 }
        )
        .fromTo(
          ".text-fusion",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "+=0.5"
        )
        .to(containerRef.current, {
          y: "-100%",
          duration: 1,
          ease: "power2.inOut",
          delay: 3,
        })
        .eventCallback("onComplete", () => setIsLoading(false));
    }
  }, [isLoading]);

useEffect(() => {
    const handleScroll = () => {
        const scrollY = window.scrollY;
        const mainText = document.querySelector(".Main_Text");

        if (scrollY < window.innerHeight) {
            let scale = 1 - scrollY / window.innerHeight;
            scale = Math.max(scale, 0.741);
            mainText.style.transform = `scale(${scale})`;
        } else {
            mainText.style.transform = `scale(0)`;
        }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
        window.removeEventListener("scroll", handleScroll);
    };
}, []);

return (
    <div>
        {isLoading && (
            <div
                ref={containerRef}
                className="flex items-center justify-center h-screen bg-black overflow-hidden fixed inset-0 z-50"
            >
                <div className="text-center">
                    <h1 className="text-white text-3xl font-semibold">
                        <span className="text-initializing">Initializing</span>{" "}
                        <span className="text-fusion">Fusion Pro</span>
                    </h1>
                </div>
            </div>
        )}

        {!isLoading && (
            <div>
                <main className="flex flex-col items-center justify-center min-h-screen text-center">
                    <section id="intro" className="h-screen flex items-center justify-center">
                        <h1 className="Main_Text">Fusion Pro</h1>
                    </section>
                    <section className="flex items-center justify-center">
                      <h2 className="second_text">Welcome to the future of vision. The Fusion Pro XR headset establishes new standards in minimalist design and delivers an unparalleled virtual experience. Immerse yourself in a world full of possibilities and let your senses come alive.</h2>
                    </section>
                    <section className="h-screen flex items-center justify-center">
                      <video className="w-screen h-screen object-cover" loop autoPlay muted>
                        <source src="./video.mp4" type="video/mp4"  />
                      </video>
                    </section>
                </main>
            </div>
        )}
    </div>
);
};

export default Home;