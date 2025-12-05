import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useFBX, Environment } from '@react-three/drei';

const ChandrayaanModel = () => {
    const fbx = useFBX('/models/chandrayaan/Vikram_Sketchfab.fbx');
    return <primitive object={fbx} scale={1.1} />;
};

const CanvasModel = () => {
    return (
        <div style={{ width: '100%', height: '100%', minHeight: '4px' }}>
            <Canvas camera={{ position: [0, 2, 5] }}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <Suspense fallback={null}>
                    <ChandrayaanModel />
                    <Environment preset="city" />
                </Suspense>
                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
            </Canvas>
        </div >
    );
};

export default CanvasModel;
