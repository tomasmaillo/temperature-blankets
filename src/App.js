import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Stats, OrbitControls } from "drei";

import Loader from "./components/Loader";
import Flag from "./components/Flag";

import Images from "./assets/images";

const flags = [];

const w = 20;
const dx = 500;
const r = () => Math.random() * 30 - 60;
for (let x = 0; x < w; x += 1) {
  flags.push({
    id: `${x}`,
    position: [dx * x - (dx * w) / 2 + r(), 0, -350],
    flagSrc: Images[x],
    year: 2000 + x,
  });
}

function App() {
  return (
    <Canvas camera={{ near: 1, far: 500 }}>
      <OrbitControls />
      <pointLight position={[10, 10, 10]} color={0xffffff} intensity={0.8} />
      <Suspense fallback={<Loader />}>
        {flags.map((flag) => (
          <>
            <Flag key={flag.id} flag={flag} flagSrc={flag.flagSrc} />
          </>
        ))}
      </Suspense>
      <Stats showPanel={0} />
    </Canvas>
  );
}

export default App;
