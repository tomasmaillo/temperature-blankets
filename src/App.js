import React, { Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { Stats, OrbitControls } from "drei";

import Loader from "./components/Loader";
import Flag from "./components/Flag";

import Images from "./assets/images";

const flags = [];

const w = 5;
const h = 5;
const dx = 250;
const dy = 350;
for (let y = 0; y < h; y += 1) {
  for (let x = 0; x < w; x += 1) {
    if (x + y * w > Images.length - 1) continue;
    console.log(`${x + y * w} ${Images.length - 1}`);
    flags.push({
      id: `${x}-${y}`,
      position: [dx * x - (dx * w) / 2 + 120, dy * y - (dy * h) / 2 + dy, -600],
      flagSrc: Images[x + y * h],
      year: 2000 + x,
    });
  }
}

function App() {
  return (
    <Canvas camera={{ near: 1, far: 1000 }}>
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
