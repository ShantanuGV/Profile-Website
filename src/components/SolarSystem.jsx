import React, { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Stars, useGLTF, useFBX, useTexture } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import About from '../sections/About';
import Contact from '../sections/Contact';
import Skills from '../sections/Skills';
import Experience from '../sections/Experience';
import Projects from '../sections/Projects';

// Component to load GLTF models
const GLTFPlanet = ({ path, scale }) => {
    const { scene } = useGLTF(path);
    return <primitive object={scene} scale={scale} />;
};

// Component to load FBX models
const FBXPlanet = ({ path, scale }) => {
    const fbx = useFBX(path);
    return <primitive object={fbx} scale={scale} />;
};

// Component to load Textured Spheres
const TexturedPlanet = ({ textures, size }) => {
    const props = useTexture(textures);
    return (
        <mesh>
            <sphereGeometry args={[size, 32, 32]} />
            <meshStandardMaterial {...props} />
        </mesh>
    );
};

// Planet component that orbits
const Planet = ({ planet, onClick }) => {
    const meshRef = useRef();
    const { distance, speed, type, path, textures, size, scale, label, color } = planet;

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime() * speed;
        if (meshRef.current) {
            meshRef.current.position.x = Math.cos(t) * distance;
            meshRef.current.position.z = Math.sin(t) * distance;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <group ref={meshRef} onClick={() => onClick(planet.id)}>
            {type === 'gltf' && <GLTFPlanet path={path} scale={scale} />}
            {type === 'fbx' && <FBXPlanet path={path} scale={scale} />}
            {type === 'texture' && <TexturedPlanet textures={textures} size={size} />}
            {!type && (
                <mesh>
                    <sphereGeometry args={[size, 32, 32]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
                </mesh>
            )}
            <Html distanceFactor={10}>
                <div className="planet-label">{label}</div>
            </Html>
        </group>
    );
};

// Sun component
const Sun = () => {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2, 32, 32]} />
            <meshStandardMaterial color="#FDB813" emissive="#FDB813" emissiveIntensity={1} />
            <pointLight intensity={2} distance={50} />
        </mesh>
    );
};

// Orbit ring component
const OrbitRing = ({ radius }) => {
    const points = [];
    for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line geometry={lineGeometry}>
            <lineBasicMaterial color="#00f3ff" opacity={0.2} transparent />
        </line>
    );
};

const SolarSystem = ({ activeSection, setActiveSection }) => {
    const planets = [
        {
            id: 'home',
            label: 'Home',
            distance: 5,
            speed: 0.3,
            type: 'gltf',
            path: '/models/cybertron/untitled.gltf',
            scale: 0.002
        },
        {
            id: 'about',
            label: 'About',
            distance: 7,
            speed: 0.25,
            type: 'fbx',
            path: '/models/coruscant/courscant.fbx',
            scale: 0.005
        },
        {
            id: 'skills',
            label: 'Skills',
            distance: 9,
            speed: 0.2,
            type: 'fbx',
            path: '/models/green-planet/QonoS.fbx',
            scale: 0.005
        },
        {
            id: 'experience',
            label: 'Experience',
            distance: 11,
            speed: 0.15,
            type: 'texture',
            textures: {
                map: '/models/alien-planet/RockPlanet_Color_lighter.png',
                displacementMap: '/models/alien-planet/RockPlanet_Bump.png',
                emissiveMap: '/models/alien-planet/RockPlanet_Emission.png',
                roughnessMap: '/models/alien-planet/RockPlanet_Roughness.png'
            },
            size: 0.65
        },
        {
            id: 'projects',
            label: 'Projects',
            distance: 13,
            speed: 0.12,
            type: 'texture',
            textures: {
                map: '/models/purple-planet/surface_diff.tga.png',
                normalMap: '/models/purple-planet/surface_norm.tga.png',
            },
            size: 0.7
        },
        {
            id: 'contact',
            label: 'Contact',
            distance: 15,
            speed: 0.1,
            type: 'gltf',
            path: '/models/cybertron/untitled.gltf',
            scale: 0.002
        },
    ];

    const getSectionContent = (sectionId) => {
        switch (sectionId) {
            case 'home':
                return (
                    <div className="section-content">
                        <h2>Welcome to My Universe</h2>
                        <p>Hi, I'm Shantanu Vispute, a Computer Engineering student exploring the cosmos of code and creativity.</p>
                        <br />
                        <p>Click on the planets to explore different sections of my portfolio!</p>
                    </div>
                );
            case 'about':
                return <About />;
            case 'skills':
                return <Skills />;
            case 'experience':
                return <Experience />;
            case 'projects':
                return <Projects />;
            case 'contact':
                return <Contact />;
            default:
                return null;
        }
    };

    return (
        <div className="solar-system-container">
            <div className="canvas-wrapper">
                <Canvas camera={{ position: [0, 20, 25], fov: 60 }}>
                    <ambientLight intensity={0.3} />
                    <Sun />
                    <Suspense fallback={null}>
                        {planets.map((planet) => (
                            <React.Fragment key={planet.id}>
                                <OrbitRing radius={planet.distance} />
                                <Planet
                                    planet={planet}
                                    onClick={(id) => setActiveSection(id)}
                                />
                            </React.Fragment>
                        ))}
                    </Suspense>
                    <OrbitControls
                        enableZoom={true}
                        minDistance={10}
                        maxDistance={40}
                        enablePan={false}
                    />
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                </Canvas>
            </div>

            <AnimatePresence>
                {activeSection && (
                    <motion.div
                        className="section-modal"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button className="close-btn" onClick={() => setActiveSection(null)}>×</button>
                        <div className="modal-content">
                            {getSectionContent(activeSection)}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="instructions">
                <p>🖱️ Click and drag to rotate • Scroll to zoom • Click planets to explore</p>
            </div>
        </div>
    );
};

export default SolarSystem;
