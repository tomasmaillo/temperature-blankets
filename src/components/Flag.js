import React, { useRef, useState, useEffect } from "react";
import { useFrame, useLoader } from "react-three-fiber";
import { DoubleSide, TextureLoader } from "three";

import Cloth from "../lib/cloth";

const TIMESTEP = 10 / 1000;
const DEBUG = false;

function Flag({ flag, flagSrc }) {
  const [cloth, setCloth] = useState(null);
  const [flagTexture] = useLoader(TextureLoader, [flagSrc]);
  const mesh = useRef();
  const geometry = useRef();

  useEffect(() => {
    setCloth(new Cloth(13, 20, 16));
  }, []);

  useFrame(() => {
    if (!cloth || !geometry.current) return;
    cloth.windEnabled = true;
    cloth.update(TIMESTEP, geometry.current);
    geometry.current.vertices.forEach((vertex, i) =>
      vertex.copy(cloth.particles[i].position)
    );

    geometry.current.computeFaceNormals();
    geometry.current.computeVertexNormals();
    geometry.current.computeBoundingSphere();

    geometry.current.normalsNeedUpdate = true;
    geometry.current.verticesNeedUpdate = true;
  });

  if (!cloth) return null;
  if (flagTexture) flagTexture.anisotropy = 16;

  return (
    <group position={flag.position}>
      <mesh ref={mesh} castShadow>
        <parametricGeometry
          attach="geometry"
          args={cloth.toGeometryArgs()}
          ref={geometry}
          dynamic
        />
        <meshLambertMaterial
          attach="material"
          side={DoubleSide}
          map={flagTexture}
          color={"white"}
        />
      </mesh>
      {DEBUG &&
        cloth.particles.map((p, i) => (
          <mesh key={i} position={p.position}>
            <boxBufferGeometry attach="geometry" args={[10, 10, 10]} />
            <meshStandardMaterial attach="material" color={"orange"} />
          </mesh>
        ))}
    </group>
  );
}

export default Flag;
