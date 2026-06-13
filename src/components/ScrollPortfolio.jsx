import React, { useState, useRef, Suspense, useLayoutEffect, useMemo, lazy } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, useGLTF, useTexture, Environment } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';

// 1. Lazy load your sections
const Hero = lazy(() => import('../sections/Hero'));
const About = lazy(() => import('../sections/About'));
const Contact = lazy(() => import('../sections/Contact'));
const Skills = lazy(() => import('../sections/Skills'));
const Experience = lazy(() => import('../sections/Experience'));
const Projects = lazy(() => import('../sections/Projects'));

// ==========================================
// 1. IMPORT ALL 3D MODELS
// ==========================================
import sunModel from '../assets/Planets/sun/source/UnstableStar_compressed.glb';
import coruscantModel from '../assets/Planets/coruscant/source/courscant_compressed.glb';
import qonosModel from '../assets/Planets/green-planet/source/QonoS_compressed.glb';
import cybertronModel from '../assets/Planets/transformers-the-planet-cybertron/source/extracted/untitled_compressed.glb'; 

// ==========================================
// 2. IMPORT ALL TEXTURES 
// ==========================================
import sunTextureImg from '../assets/Planets/sun/textures/suncyl1.jpg';
import coruscantColor from '../assets/Planets/coruscant/textures/planet_albedo.jpg';
import coruscantEmissive from '../assets/Planets/coruscant/textures/courscant_planet_Emissive.jpg';
import qonosColor from '../assets/Planets/green-planet/textures/QonoS_Ground_Diff.png';
import qonosNormal from '../assets/Planets/green-planet/textures/QonoS_Ground_Normal.png';
import qonosEmissive from '../assets/Planets/green-planet/textures/QonoS_Ground_Emit.png';
import qonosRoughness from '../assets/Planets/green-planet/textures/QonoS_Ground_Rough.png';
import alienColor from '../assets/Planets/alien-planet/textures/RockPlanet_Color_lighter.png';
import alienBump from '../assets/Planets/alien-planet/textures/RockPlanet_Bump.png';
import alienEmission from '../assets/Planets/alien-planet/textures/RockPlanet_Emission.png';
import alienRoughness from '../assets/Planets/alien-planet/textures/RockPlanet_Roughness.png';
import purpleColor from '../assets/Planets/purple-planet/textures/surface_diff.tga.png';
import purpleNormal from '../assets/Planets/purple-planet/textures/surface_norm.tga.png';

// ==========================================
// COMPONENTS
// ==========================================

const GLTFPlanet = ({ path, scale }) => {
    const { scene } = useGLTF(path, true);
    return <primitive object={scene} scale={scale} />;
};

const TexturedGLTF = ({ path, scale, texturePaths }) => {
    const { scene } = useGLTF(path, true);
    const textures = useTexture(texturePaths);

    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        clone.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({
                    map: textures.map || null,
                    normalMap: textures.normalMap || null,
                    emissiveMap: textures.emissiveMap || null,
                    emissive: textures.emissiveMap ? new THREE.Color(0xffffff) : new THREE.Color(0x000000),
                    emissiveIntensity: textures.emissiveMap ? 1 : 0,
                    roughnessMap: textures.roughnessMap || null,
                    roughness: 0.8,
                });
                child.material.needsUpdate = true;
            }
        });
        return clone;
    }, [scene, textures]);

    return <primitive object={clonedScene} scale={scale} />;
};

const TexturedPlanet = ({ textures, size, displacementScale = 0.05 }) => {
    const props = useTexture(textures);
    return (
        <mesh>
            <sphereGeometry args={[size, 64, 64]} />
            <meshStandardMaterial {...props} displacementScale={displacementScale} />
        </mesh>
    );
};

const Planet = ({ planet, isActive }) => {
    const meshRef = useRef();
    const { id, position, size, type, path, textures, scale, texturePaths, displacementScale } = planet;

    useFrame(() => {
        if (meshRef.current && !isActive) {
            meshRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group name={id} ref={meshRef} position={position}>
            {type === 'gltf' && !texturePaths && <GLTFPlanet path={path} scale={scale} />}
            {type === 'gltf' && texturePaths && <TexturedGLTF path={path} scale={scale} texturePaths={texturePaths} />}
            {type === 'texture' && <TexturedPlanet textures={textures} size={size} displacementScale={displacementScale} />}
        </group>
    );
};

const Sun = () => {
    const { scene } = useGLTF(sunModel, true);
    const texture = useTexture(sunTextureImg);
    const meshRef = useRef();

    const clonedScene = useMemo(() => {
        const clone = scene.clone();
        clone.traverse((child) => {
            if (child.isMesh) {
                child.material = new THREE.MeshBasicMaterial({
                    map: texture,
                    color: new THREE.Color(0xffaa00),
                });
            }
        });
        return clone;
    }, [scene, texture]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.002;
        }
    });

    return (
        <group ref={meshRef}>
            <primitive object={clonedScene} scale={0.1} />
            <pointLight intensity={300} distance={100} color="#FDB813" />
        </group>
    );
};

// ==========================================
// DATA CONFIGURATION
// ==========================================
const planets = [
    { id: 'about', position: [-2, -1, 6], type: 'gltf', path: coruscantModel, scale: 0.6, texturePaths: { map: coruscantColor, emissiveMap: coruscantEmissive } },
    { id: 'skills', position: [-4, 1, 4], type: 'gltf', path: qonosModel, scale: 0.5, texturePaths: { map: qonosColor, normalMap: qonosNormal, emissiveMap: qonosEmissive, roughnessMap: qonosRoughness } },
    { id: 'experience', position: [6, -1, 5], type: 'texture', textures: { map: alienColor, displacementMap: alienBump, emissiveMap: alienEmission, roughnessMap: alienRoughness }, size: 0.6, displacementScale: 0.05 },
    { id: 'projects', position: [-5, 0, -6], type: 'texture', textures: { map: purpleColor, normalMap: purpleNormal }, size: 0.8 },
    { id: 'contact', position: [3, 2, 7], type: 'gltf', path: cybertronModel, scale: 0.008 },
];

const SolarSystem = ({ planets, activePlanetId }) => {
    const groupRef = useRef();
    const isFocused = planets.some(p => p.id === activePlanetId);
    useFrame((state, delta) => { if (!isFocused && groupRef.current) groupRef.current.rotation.y += 0.05 * delta; });
    return (
        <group ref={groupRef}>
            {planets.map((planet) => <Planet key={planet.id} planet={planet} isActive={activePlanetId === planet.id} />)}
        </group>
    );
};

const CameraController = ({ activePlanetId }) => {
    const { scene, controls } = useThree();
    useFrame((state) => {
        const targetPos = new THREE.Vector3(0, 15, 20);
        const targetLookAt = new THREE.Vector3(-7, 2, 10);
        if (activePlanetId && activePlanetId !== 'home') {
            const planetObject = scene.getObjectByName(activePlanetId);
            if (planetObject) {
                const planetWorldPos = new THREE.Vector3();
                planetObject.getWorldPosition(planetWorldPos);
                targetPos.copy(planetWorldPos).add(new THREE.Vector3(0, 2, 4));
                targetLookAt.copy(planetWorldPos);
            }
        }
        state.camera.position.lerp(targetPos, 0.05);
        if (controls) { controls.target.lerp(targetLookAt, 0.05); controls.update(); }
    });
    return null;
};

const ScrollPortfolio = () => {
    const [activeSection, setActiveSection] = useState(-1);
    const sections = [
        { id: 'home', planet: 'home', component: Hero },
        { id: 'about', planet: 'about', component: About },
        { id: 'skills', planet: 'skills', component: Skills },
        { id: 'projects', planet: 'projects', component: Projects },
        { id: 'experience', planet: 'experience', component: Experience },
        { id: 'contact', planet: 'contact', component: Contact }
    ];

    return (
        <div className="scroll-portfolio">
            <div className="solar-system-fixed">
                <Canvas camera={{ position: [0, 15, 20], fov: 60 }} gl={{ alpha: true }} style={{ background: 'transparent' }}>
                    <ambientLight intensity={0.4} />
                    <Suspense fallback={null}>
                        <Sun />
                        <SolarSystem planets={planets} activePlanetId={sections[activeSection]?.planet} />
                    </Suspense>
                    <Stars radius={100} depth={50} count={1500} factor={4} saturation={0} fade speed={1} />
                    <Environment preset="city" />
                    <OrbitControls enableZoom={false} enablePan={false} makeDefault />
                    <CameraController activePlanetId={sections[activeSection]?.planet} />
                </Canvas>
            </div>
            <div className="scroll-content">
                {sections.map((section, index) => (
                    <motion.section key={section.id} className="portfolio-section" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: false, amount: 0.5 }} onViewportEnter={() => setActiveSection(index)}>
                        <div className="section-content">
                            {/* Suspense handles the lazy loading of each section */}
                            <Suspense fallback={<div className="loading-spinner">Loading...</div>}>
                                <section.component />
                            </Suspense>
                        </div>
                    </motion.section>
                ))}
            </div>
        </div>
    );
};

useGLTF.preload(sunModel, true);
useGLTF.preload(cybertronModel, true);
useGLTF.preload(coruscantModel, true);
useGLTF.preload(qonosModel, true);

export default ScrollPortfolio;
