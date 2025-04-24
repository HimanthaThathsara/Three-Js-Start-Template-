import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const { scene, animations } = useGLTF("./Model/Idel Stand with 2 animetion.glb");
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    if (!actions) return;

    // Function to play animations in sequence
    const playAnimationsInSequence = async () => {
      for (let i = 0; i < Object.keys(actions).length; i++) {
        const animationAction = actions[Object.keys(actions)[i]];
        await new Promise((resolve) => {
          animationAction.reset().play().onFinish(() => {
            resolve();
          });
        });
      }
    };

    playAnimationsInSequence();
  }, [actions]);

  return (
    <mesh>
      <hemisphereLight intensity={1} groundColor='black' />
      <spotLight
        position={[-20, 50, 10]}
        angle={1}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={1} />
      <primitive
        object={scene}
        scale={isMobile ? 0.9 : 2}
        position={isMobile ? [5, -1, -2.2] : [5, -1.5, -1.5]}
        rotation={[0, 1.25, 0]} // Adjust Y rotation to turn the model to face the user interface side
      />
    </mesh>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop='demand'
      shadows
      dpr={[1, 2]}
      camera={{ position: [25, 3, 5], fov: 13 }} // Adjust X to align with the model's new position
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          enableRotate={false}
        />
        <Computers isMobile={isMobile} />
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default ComputersCanvas;
