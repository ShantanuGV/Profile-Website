{/*import React, { Suspense } from 'react';
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

export default CanvasModel;*/}

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Trail } from "@react-three/drei";
import {
    EffectComposer,
    SelectiveBloom
} from "@react-three/postprocessing";

function OrbitRing({
    radius = 2,
    rotation = [0, 0, 0],
    speed = 1,
    color = "#00f3ff",
}) {
    const group = useRef();

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.z =
                state.clock.elapsedTime * speed;
        }
    });

    return (
        <group
            ref={group}
            rotation={rotation}
        >
            <Trail
                width={2.5}
                length={8}
                color={color}
                attenuation={(t) => t * t}
            >
                <mesh position={[radius, 0, 0]}>
                    <sphereGeometry
                        args={[0.15, 32, 32]}
                    />

                    <meshStandardMaterial
                        color="#00f3ff"
                        emissive="#00f3ff"
                        emissiveIntensity={25}
                        toneMapped={false}
                        metalness={0}
                        roughness={1}
                    />
                </mesh>
            </Trail>
        </group>
    );
}

function NexusCore() {
    const coreRef = useRef();

    useFrame((state) => {
        if (!coreRef.current) return;

        coreRef.current.rotation.y =
            state.clock.elapsedTime * 0.4;

        const pulse =
            1 +
            Math.sin(
                state.clock.elapsedTime * 2
            ) *
                0.08;

        coreRef.current.scale.set(
            pulse,
            pulse,
            pulse
        );
    });

    return (
        <group ref={coreRef}>
            <mesh>
                <sphereGeometry
                    args={[0.4, 64, 64]}
                />

                <meshStandardMaterial
                    color="#00f3ff"
                    emissive="#00f3ff"
                    emissiveIntensity={30}
                    toneMapped={false}
                    metalness={0}
                    roughness={1}
                />
            </mesh>

            <pointLight
                color="#00f3ff"
                intensity={2}
                distance={4}
            />
        </group>
    );
}

function DigitalNexus() {
    return (
        <>
            <NexusCore />

            <OrbitRing
                radius={1}
                rotation={[0, 0, 0]}
                speed={1.9}
            />

            <OrbitRing
                radius={1.4}
                rotation={[Math.PI / 2, 0, 0]}
                speed={2.1}
            />

            <OrbitRing
                radius={1.5}
                rotation={[0.8, 0.4, 0]}
                speed={2.3}
            />

            <OrbitRing
                radius={1.8}
                rotation={[-0.8, 0.4, 0]}
                speed={3}
            />
        </>
    );
}

const CanvasModel = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100%",
                minHeight: "100px",
                background: "transparent",
            }}
        >
            <Canvas
                gl={{
                    alpha: true,
                    antialias: true,
                }}
                camera={{
                    position: [0, 0, 6],
                    fov: 50,
                }}
                onCreated={({ gl, scene }) => {
                    gl.setClearColor(0x000000, 0);
                    scene.background = null;
                }}
            >
                <ambientLight intensity={0.1} />

                <directionalLight
                    position={[5, 5, 5]}
                    intensity={0.8}
                />

                <Suspense fallback={null}>
                    <DigitalNexus />
                </Suspense>

                <OrbitControls
                    enableZoom={false}
                    autoRotate
                    autoRotateSpeed={0.4}
                />

                <EffectComposer autoClear={false}>
                    <SelectiveBloom
                        intensity={0.5}
                        luminanceThreshold={0}
                        luminanceSmoothing={0}
                        radius={0.7}
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
};

export default CanvasModel;
