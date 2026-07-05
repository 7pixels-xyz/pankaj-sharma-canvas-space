"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const projectLocations = [
    { name: "Pune", lat: 18.52, lng: 73.86 },
    { name: "Mumbai", lat: 19.08, lng: 72.88 },
    { name: "Bangalore", lat: 12.97, lng: 77.59 },
    { name: "Delhi", lat: 28.61, lng: 77.21 },
    { name: "Dubai", lat: 25.2, lng: 55.27 },
];

function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lng + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    return new THREE.Vector3(x, y, z);
}

export default function Globe() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        // Scene
        const scene = new THREE.Scene();

        // Camera
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 4;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Wireframe sphere
        const sphereGeom = new THREE.SphereGeometry(1.5, 32, 32);
        const wireframeMat = new THREE.MeshBasicMaterial({
            color: 0x111111,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
        });
        const sphere = new THREE.Mesh(sphereGeom, wireframeMat);
        scene.add(sphere);

        // Outer ring
        const ringGeom = new THREE.RingGeometry(1.52, 1.54, 64);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0x111111,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3,
        });
        const ring = new THREE.Mesh(ringGeom, ringMat);
        ring.rotation.x = Math.PI / 2;
        scene.add(ring);

        // Project location pins
        const pinGroup = new THREE.Group();
        projectLocations.forEach((loc) => {
            const pos = latLngToVector3(loc.lat, loc.lng, 1.52);
            const pinGeom = new THREE.SphereGeometry(0.03, 16, 16);
            const pinMat = new THREE.MeshBasicMaterial({ color: 0xd92b2b });
            const pin = new THREE.Mesh(pinGeom, pinMat);
            pin.position.copy(pos);
            pinGroup.add(pin);

            // Tiny ring around pin
            const haloGeom = new THREE.RingGeometry(0.04, 0.06, 16);
            const haloMat = new THREE.MeshBasicMaterial({
                color: 0xd92b2b,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.4,
            });
            const halo = new THREE.Mesh(haloGeom, haloMat);
            halo.position.copy(pos);
            halo.lookAt(0, 0, 0);
            pinGroup.add(halo);
        });
        scene.add(pinGroup);

        // Drag interaction
        let isDragging = false;
        let previousMouse = { x: 0, y: 0 };
        let rotationVelocity = { x: 0, y: 0 };
        const autoRotateSpeed = 0.003;

        const handlePointerDown = (e: PointerEvent) => {
            isDragging = true;
            previousMouse = { x: e.clientX, y: e.clientY };
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (!isDragging) return;
            const dx = e.clientX - previousMouse.x;
            const dy = e.clientY - previousMouse.y;
            rotationVelocity.x = dy * 0.005;
            rotationVelocity.y = dx * 0.005;
            previousMouse = { x: e.clientX, y: e.clientY };
        };

        const handlePointerUp = () => {
            isDragging = false;
        };

        container.addEventListener("pointerdown", handlePointerDown);
        container.addEventListener("pointermove", handlePointerMove);
        container.addEventListener("pointerup", handlePointerUp);
        container.addEventListener("pointerleave", handlePointerUp);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            if (!isDragging) {
                sphere.rotation.y += autoRotateSpeed;
                pinGroup.rotation.y += autoRotateSpeed;
                ring.rotation.y += autoRotateSpeed;
            }

            // Apply drag rotation
            sphere.rotation.x += rotationVelocity.x;
            sphere.rotation.y += rotationVelocity.y;
            pinGroup.rotation.x += rotationVelocity.x;
            pinGroup.rotation.y += rotationVelocity.y;
            ring.rotation.y += rotationVelocity.y;

            // Damping
            rotationVelocity.x *= 0.95;
            rotationVelocity.y *= 0.95;

            renderer.render(scene, camera);
        };
        animate();

        // Resize handler
        const handleResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            container.removeEventListener("pointerdown", handlePointerDown);
            container.removeEventListener("pointermove", handlePointerMove);
            container.removeEventListener("pointerup", handlePointerUp);
            container.removeEventListener("pointerleave", handlePointerUp);
            renderer.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
    }, []);

    return (
        <section className="relative w-full py-24 md:py-40 px-6 md:px-12" id="globe-section">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-0 items-center">
                {/* Left — Text */}
                <div>
                    <p
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.6rem",
                            letterSpacing: "0.2em",
                            color: "var(--charcoal-ink)",
                            opacity: 0.4,
                            marginBottom: "1.5rem",
                        }}
                    >
                        [ GLOBAL FOOTPRINT ]
                    </p>
                    <h2
                        style={{
                            fontSize: "clamp(1.8rem, 4vw, 3.5rem)",
                            fontWeight: 800,
                            lineHeight: 1.05,
                            letterSpacing: "-0.03em",
                            maxWidth: "500px",
                        }}
                    >
                        DISCOVER THE ARCHITECTURE OF CANVAS SPACE AROUND THE GLOBE
                    </h2>
                    <div
                        className="mt-8 flex flex-col gap-2"
                        style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "0.65rem",
                            letterSpacing: "0.1em",
                            color: "var(--charcoal-ink)",
                            opacity: 0.5,
                        }}
                    >
                        {projectLocations.map((loc) => (
                            <div key={loc.name} className="flex items-center gap-3">
                                <span
                                    className="inline-block w-2 h-2 rounded-full"
                                    style={{ backgroundColor: "var(--accent-red)" }}
                                />
                                <span>{loc.name.toUpperCase()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right — Globe */}
                <div
                    ref={containerRef}
                    className="globe-canvas w-full"
                    style={{ height: "60vh", minHeight: "400px" }}
                    data-cursor-hover
                />
            </div>
        </section>
    );
}
