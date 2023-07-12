import { Canvas } from '@react-three/fiber';
import { Intro } from '../../components';
import { CustomGeometryParticles } from './three/InteractiveParticles';
import { OrbitControls } from '@react-three/drei';

function Home() {
  return (
    <div className="w-full x-5 flex  h-screen flex-row items-end justify-end">
      <Intro />
      <div className="absolute mt-20">
        <Canvas className="w-screen h-screen bg-black" style={{ height: '', width: '' }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <CustomGeometryParticles count={7000} shape="sphere"/>
          <OrbitControls autoRotate />
        </Canvas>
      </div>
    </div>
  );
}

export default Home;
