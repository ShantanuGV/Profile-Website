import React, { useState, useRef, Suspense, useLayoutEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF, useFBX, useTexture, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

import Hero from '../sections/Hero';
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

// Inner component to handle texture loading for FBX
const TexturedFBX = ({ fbx, texturePaths, scale }) => {
    const textures = useTexture(texturePaths);

    useLayoutEffect(() => {
        fbx.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    map: textures.map,
                    normalMap: textures.normalMap,
                    emissiveMap: textures.emissiveMap,
                    emissive: textures.emissiveMap ? new THREE.Color(0xffffff) : new THREE.Color(0x000000),
                    emissiveIntensity: textures.emissiveMap ? 1 : 0,
                    roughnessMap: textures.roughnessMap,
                    roughness: 0.8,
                });
            }
        });
    }, [fbx, textures]);

    return <primitive object={fbx} scale={scale} />;
};

// Component to load FBX models
const FBXPlanet = ({ path, scale, texturePaths }) => {
    const fbx = useFBX(path);

    if (texturePaths) {
        return <TexturedFBX fbx={fbx} texturePaths={texturePaths} scale={scale} />;
    }

    return <primitive object={fbx} scale={scale} />;
};

// Component to load Textured Spheres
const TexturedPlanet = ({ textures, size, displacementScale = 0.05 }) => {
    const props = useTexture(textures);
    return (
        <mesh>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial
                {...props}
                displacementScale={displacementScale}
            />
        </mesh>
    );
};

// Planet component that can be focused
const Planet = ({ planet, isActive }) => {
    const meshRef = useRef();
    const { id, position, size, color, type, path, textures, scale, texturePaths, displacementScale } = planet;

    useFrame(() => {
        if (meshRef.current && !isActive) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group name={id} ref={meshRef} position={position}>
            {type === 'gltf' && <GLTFPlanet path={path} scale={scale} />}
            {type === 'fbx' && <FBXPlanet path={path} scale={scale} texturePaths={texturePaths} />}
            {type === 'texture' && <TexturedPlanet textures={textures} size={size} displacementScale={displacementScale} />}
            {!type && (
                <mesh>
                    <sphereGeometry args={[size, 32, 32]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                    />
                </mesh>
            )}
        </group>
    );
};

// Sun component
const Sun = () => {
    const fbx = useFBX('/models/sun/UnstableStar.fbx');
    const texture = useTexture('/models/sun/suncyl1.jpg');
    const meshRef = useRef();

    useLayoutEffect(() => {
        fbx.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({
                    map: texture,
                    color: new THREE.Color(0xffaa00), // Tint it slightly orange/yellow
                });
            }
        });
    }, [fbx, texture]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group ref={meshRef}>
            <primitive object={fbx} scale={0.1} />
            <pointLight intensity={300} distance={100} color="#FDB813" />
        </group>
    );
};

const planets = [
    {
        id: 'about',
        position: [-2, -1, 6],
        type: 'fbx',
        path: '/models/coruscant/courscant.fbx',
        scale: 0.005,
        texturePaths: {
            map: '/models/coruscant/planet_albedo.jpg',
            emissiveMap: '/models/coruscant/courscant_planet_Emissive.jpg'
        }
    },
    {
        id: 'skills',
        position: [-4, 1, 4],
        type: 'fbx',
        path: '/models/green-planet/QonoS.fbx',
        scale: 0.005,
        texturePaths: {
            map: '/models/green-planet/QonoS_Ground_Diff.png',
            normalMap: '/models/green-planet/QonoS_Ground_Normal.png',
            emissiveMap: '/models/green-planet/QonoS_Ground_Emit.png',
            roughnessMap: '/models/green-planet/QonoS_Ground_Rough.png'
        }
    },
    {
        id: 'experience',
        position: [6, -1, 5],
        type: 'texture',
        textures: {
            map: '/models/alien-planet/RockPlanet_Color_lighter.png',
            displacementMap: '/models/alien-planet/RockPlanet_Bump.png',
            emissiveMap: '/models/alien-planet/RockPlanet_Emission.png',
            roughnessMap: '/models/alien-planet/RockPlanet_Roughness.png'
        },
        size: 0.6,
        displacementScale: 0.05 // Reduced displacement to fix "messed up" look
    },
    {
        id: 'projects',
        position: [-5, 0, -6],
        type: 'texture',
        textures: {
            map: '/models/purple-planet/surface_diff.tga.png',
            normalMap: '/models/purple-planet/surface_norm.tga.png',
        },
        size: 0.8
    },
    {
        id: 'contact',
        position: [3, 2, 7],
        type: 'gltf',
        path: '/models/cybertron/untitled.gltf',
        scale: 0.008
    },
];

const SolarSystem = ({ planets, activePlanetId }) => {
    const groupRef = useRef();

    // Check if we are currently focused on a valid planet
    const isFocused = planets.some(p => p.id === activePlanetId);

    useFrame((state, delta) => {
        if (!isFocused && groupRef.current) {
            groupRef.current.rotation.y += 0.05 * delta;
        }
    });

    return (
        <group ref={groupRef}>
            {planets.map((planet) => (
                <Planet
                    key={planet.id}
                    planet={planet}
                    isActive={activePlanetId === planet.id}
                />
            ))}
        </group>
    );
};

const CameraController = ({ activePlanetId }) => {
    const { scene, camera, controls } = useThree();

    useFrame((state, delta) => {
        // Default position (Home view)
        const targetPos = new THREE.Vector3(0, 15, 20);
        const targetLookAt = new THREE.Vector3(-7, 2, 10);

        if (activePlanetId && activePlanetId !== 'home') {
            const planetObject = scene.getObjectByName(activePlanetId);
            if (planetObject) {
                const planetWorldPos = new THREE.Vector3();
                planetObject.getWorldPosition(planetWorldPos);
                // Zoom in: offset by (0, 2, 4) relative to planet world position
                targetPos.copy(planetWorldPos).add(new THREE.Vector3(0, 2, 4));
                targetLookAt.copy(planetWorldPos);
            }
        }

        // Smooth animation
        state.camera.position.lerp(targetPos, 0.05);

        if (controls) {
            controls.target.lerp(targetLookAt, 0.05);
            controls.update();
        }
    });

    return null;
};

const ScrollPortfolio = () => {
    const [activeSection, setActiveSection] = useState(-1);

    const sections = [
        {
            id: 'home',
            planet: 'home',
            component: Hero
        },
        {
            id: 'about',
            planet: 'about',
            component: About
        },
        {
            id: 'skills',
            planet: 'skills',
            component: Skills
        },
        {
            id: 'projects',
            planet: 'projects',
            component: Projects
        },
        {
            id: 'experience',
            planet: 'experience',
            component: Experience
        },
        {
            id: 'contact',
            planet: 'contact',
            component: Contact
        }
    ];

    return (
        <div className="scroll-portfolio">
            <div className="solar-system-fixed">
                <Canvas
                    camera={{ position: [0, 15, 20], fov: 60 }}
                    gl={{ alpha: true }}
                    style={{ background: 'transparent' }}
                >
                    <ambientLight intensity={0.4} />
                    <Suspense fallback={null}>
                        <Sun />
                        <SolarSystem planets={planets} activePlanetId={sections[activeSection]?.planet} />
                    </Suspense>
                    <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <Environment preset="city" />
                    <OrbitControls enableZoom={false} enablePan={false} makeDefault />
                    <CameraController activePlanetId={sections[activeSection]?.planet} />
                </Canvas>
            </div>

            {/* Scrollable Content */}
            <div className="scroll-content">
                {sections.map((section, index) => (
                    <motion.section
                        key={section.id}
                        className="portfolio-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: false, amount: 0.5 }}
                        onViewportEnter={() => setActiveSection(index)}
                    >
                        <div className="section-content">
                            {section.component ? (
                                <section.component />
                            ) : (
                                <>
                                    <motion.h1
                                        initial={{ x: -50, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.6, delay: 0.2 }}
                                    >
                                        {section.title}
                                    </motion.h1>
                                    {section.description && (
                                        <motion.p
                                            initial={{ x: -50, opacity: 0 }}
                                            whileInView={{ x: 0, opacity: 1 }}
                                            transition={{ duration: 0.6, delay: 0.4 }}
                                        >
                                            {section.description}
                                        </motion.p>
                                    )}
                                    <motion.div
                                        className="section-number"
                                        initial={{ scale: 0 }}
                                        whileInView={{ scale: 1 }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        {String(index + 1).padStart(2, '0')}
                                    </motion.div>
                                </>
                            )}
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
};

export default ScrollPortfolio;
