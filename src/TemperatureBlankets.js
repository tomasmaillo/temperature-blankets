import React, { Suspense, useRef } from "react";
import { Canvas, useThree, useFrame } from "react-three-fiber";
import { Stats, OrbitControls } from "drei";

import * as THREE from "three";

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

function TemperatureBlankets() {
  return (
    <>
      <pointLight position={[10, 10, 10]} color={0xffffff} intensity={0.5} />
      <Suspense fallback={<Loader />}>
        {flags.map((flag) => (
          <Flag key={flag.id} flag={flag} flagSrc={flag.flagSrc} />
        ))}
        <Dolly />
      </Suspense>
    </>
  );
}

const Controls = () => {
  const { camera, gl } = useThree();
  const ref = useRef();
  useFrame(() => ref.current.update());
  return (
    <OrbitControls
      ref={ref}
      target={[0, 0, -650]}
      enableDamping
      panSpeed={0}
      enableZoom={false}
      maxAzimuthAngle={Math.PI / 4}
      maxPolarAngle={(Math.PI * 3) / 4}
      minAzimuthAngle={-Math.PI / 4}
      minPolarAngle={Math.PI / 4}
      args={[camera, gl.domElement]}
    />
  );
};

function Dolly() {
  useFrame(({ clock, camera }) => {
    // such an ugly solution, im not proud
    if (clock.getElapsedTime() > 1)
      camera.position.z = THREE.MathUtils.lerp(camera.position.z, 100, 0.05);
    camera.rotation.x = Math.sin(clock.getElapsedTime()) * 0.005;
    camera.rotation.y = Math.sin(clock.getElapsedTime()) * 0.008;
  });
  return null;
}

function Content() {
  return (
    <Canvas linear camera={{ near: 1, far: 10000, position: [0, 0, 2000] }}>
      <Controls />
      <ambientLight intensity={0.5} />
      <TemperatureBlankets />
    </Canvas>
  );
}

export default Content;
