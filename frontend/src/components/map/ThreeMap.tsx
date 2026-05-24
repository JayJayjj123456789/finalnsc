import React, { useEffect, useRef } from 'react';

export function ThreeMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const THREE = (window as any).THREE;
    if (!THREE) return;

    // Guard: don't double-init if container already has a canvas
    if (container.querySelector('canvas')) return;

    const scene = new THREE.Scene();
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 560;
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    camera.position.z = 22;
    camera.position.y = -2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.6));
    const dl = new THREE.DirectionalLight(0xffffff, 0.8);
    dl.position.set(5, 10, 7);
    dl.castShadow = true;
    scene.add(dl);
    const fl = new THREE.DirectionalLight(0xffffff, 0.4);
    fl.position.set(-5, 0, -5);
    scene.add(fl);

    // Floating particles
    const pCount = 60;
    const pGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 18;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x008282, size: 0.06, transparent: true, opacity: 0.6,
    });
    scene.add(new THREE.Points(pGeo, pMat));

    // Mouse tracking
    let mouseX = 0, mouseY = 0, curX = 0, curY = 0;
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.002;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.002;
    };
    document.addEventListener('mousemove', onMouseMove);

    // Animation ID hoisted so cleanup can access it
    let animId = 0;

    // Load map texture
    new THREE.TextureLoader().load(
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDusozV26AZp0-qWfnhr6EqJmXbqe6pZDiHpIlM1IuQ7EG7hT4kaHHkp9LwOi9re_7DFMtK70PPa7TKHIy7M82FjKyucEIxwcAehy9LVVNiRBFL3SjzEP44LT9xoVSh_JCg9pd7nR224L8IrTsIYK7YKNs8CV3EG1rU764X5XQBHp-HcZDuzngKWuT_-a5DkpVH-0GB2p3inJ60rdUk0rA2r-ZQd8zhdcVvJk_Mv_tuFrZCyxVR90430N5pI0Aut5h_h1UINaK7BYFV',
      (tex: any) => {
        const asp = tex.image.width / tex.image.height;
        const mw = 22, mh = mw / asp;
        const geo = new THREE.PlaneGeometry(mw, mh, 48, 48);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i), y = pos.getY(i);
          pos.setZ(i, Math.sin(x * 2) * 0.08 + Math.cos(y * 2) * 0.05);
        }
        geo.computeVertexNormals();

        const mat = new THREE.MeshStandardMaterial({
          map: tex, alphaMap: tex, transparent: true, alphaTest: 0.1,
          color: 0x6fd7d6, emissive: 0x006767, emissiveIntensity: 0.15,
          roughness: 0.35, metalness: 0.25, side: THREE.DoubleSide,
        });
        const grp = new THREE.Group();
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        grp.add(mesh);

        const bMat = new THREE.MeshStandardMaterial({
          alphaMap: tex, transparent: true, alphaTest: 0.1,
          color: 0x006767, emissive: 0x004f4f, emissiveIntensity: 0.1,
          side: THREE.DoubleSide,
        });
        const bMesh = new THREE.Mesh(geo, bMat);
        bMesh.position.z = -0.3;
        grp.add(bMesh);

        scene.add(grp);
        grp.rotation.x = -Math.PI / 4;
        grp.rotation.z = Math.PI / 12;
        const brx = grp.rotation.x;
        const bry = grp.rotation.y;

        const clock = new THREE.Clock();
        const animate = () => {
          animId = requestAnimationFrame(animate);
          const t = clock.getElapsedTime();
          curX += (mouseX - curX) * 0.04;
          curY += (mouseY - curY) * 0.04;
          grp.rotation.y = bry + curX * 1.2;
          grp.rotation.x = brx + curY * 1.0;
          grp.position.y += (Math.sin(t * 0.5) * 0.35 - grp.position.y) * 0.05;
          const pulse = 1 + Math.sin(t * 1.0) * 0.02;
          grp.scale.set(pulse, pulse, pulse);
          const pPos = pGeo.attributes.position;
          for (let j = 0; j < pCount; j++) {
            pPos.setY(j, pPos.getY(j) + Math.sin(t + j) * 0.003);
          }
          pPos.needsUpdate = true;
          renderer.render(scene, camera);
        };
        animate();
      }
    );

    // Resize handler
    const onResize = () => {
      const nw = container.clientWidth || 800;
      const nh = container.clientHeight || 560;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    };
    window.addEventListener('resize', onResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent',
        borderRadius: 16,
      }}
      id="map-canvas-container"
    >
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)',
        width: 700, height: 700,
        background: 'radial-gradient(circle, rgba(0,103,103,0.07) 0%, transparent 60%)',
        zIndex: -1, pointerEvents: 'none', borderRadius: '50%',
      }} />
    </div>
  );
}
