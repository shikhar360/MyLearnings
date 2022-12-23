import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function App() {

  const cuberef = useRef()
 const groupref = useRef()

  useFrame((state , delta)=>{

    cuberef.current.rotation.y += delta 
    groupref.current.rotation.y += delta 

  })
  return (
    <>
      <group ref={groupref}>

        
        <mesh position={[2, 0, 0]} ref={cuberef} rotation-y={Math.PI *0.50}  >
          <boxGeometry  args={[2,2,2]} />
          <meshBasicMaterial color={"red"} wireframe  />
        </mesh>
        <mesh position={[-1 , 0, 0]}>
          <sphereGeometry   />
          <meshBasicMaterial color={"purple"}  />
        </mesh>
      
      </group>
      

      <mesh scale={5} position={[0, -1, 0]} rotation-x={- Math.PI *0.5} >
        <planeGeometry  />
        <meshBasicMaterial color={"orange"}  />
      </mesh>
    </>
  );
}
