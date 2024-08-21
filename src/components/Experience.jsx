import { Environment, Float, OrbitControls, Html } from "@react-three/drei";
import { Book } from "./Book";
import { RGBELoader } from 'three-stdlib';
import * as THREE from 'three';
import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';

export const Experience = () => {
  const { scene } = useThree();
  const [isLoaded, setIsLoaded] = useState(false); 

  useEffect(() => {
    new RGBELoader().load('/envmap/morning2.hdr', (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.background = texture;
      scene.environment = texture;
      setIsLoaded(true);
    });
  
    
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const keyElement = document.querySelector(`.arrow-${event.key === 'ArrowLeft' ? 'left' : 'right'}`);
        keyElement.style.backgroundColor = 'orange';
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const keyElement = document.querySelector(`.arrow-${event.key === 'ArrowLeft' ? 'left' : 'right'}`);
        keyElement.style.backgroundColor = 'black';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [scene]);

  if (!isLoaded) {
    return (
      <Html center>
        <div style={{ color: 'white', fontSize: '10px', fontFamily: 'Arial, sans-serif' }}>
          Loading...
        </div>
      </Html>
    );
  }

  return (
    <>
      <Float
        rotation-x={-Math.PI / 5}
        floatIntensity={0.5}
        speed={1}
        rotationIntensity={1}
      >
        <Book />
      </Float>
      <OrbitControls />
      <directionalLight
        position={[2, 5, 2]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
      />
      <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>

      {/* Arrow Keys Container */}
      <Html position={[0, -1.5, 0]} center>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
          <div className="arrow-left" style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'black',
            borderRadius: '8px',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            fontSize: '30px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            ←
          </div>
          <div className="arrow-right" style={{
            width: '60px',
            height: '60px',
            backgroundColor: 'black',
            borderRadius: '8px',
            color: 'white',
            fontFamily: 'Arial, sans-serif',
            fontSize: '30px',
            fontWeight: 'bold',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            →
          </div>
        </div>
      </Html>
    </>
  );
};
