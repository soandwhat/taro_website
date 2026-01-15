// ========================================
// THREE.JS BACKGROUND - Starry Sky with Floating Logo
// Vanilla JS version based on React implementation
// ========================================

class ThreeBackground {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.starMesh = null;
        this.cardMesh = null;
        this.mainObject = null;
        this.cardData = [];
        this.clock = null;
        this.animationFrameId = null;

        // Interaction state
        this.mouseX = 0;
        this.mouseY = 0;
        this.scrollY = 0;

        // Config
        this.cardCount = 15;
        this.starsCount = 1000;

        this.init();
    }

    init() {
        // Create container
        this.container = document.getElementById('three-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'three-container';
            this.container.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 0;
                pointer-events: none;
                opacity: 0;
                transition: opacity 1s ease;
            `;
            document.body.prepend(this.container);
        }

        // Scene Setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Color space - with fallback for older Three.js versions
        if (THREE.SRGBColorSpace !== undefined) {
            this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        } else if (this.renderer.outputEncoding !== undefined) {
            this.renderer.outputEncoding = THREE.sRGBEncoding;
        }

        this.container.appendChild(this.renderer.domElement);

        // Camera position
        const isMobile = window.innerWidth < 768;
        this.camera.position.z = isMobile ? 6 : 5;

        // Create elements
        this.createStars();
        this.createCards();
        this.createMainObject();

        // Event listeners
        this.bindEvents();

        // Start animation
        this.clock = new THREE.Clock();
        this.animate();

        // Show container after a small delay
        setTimeout(() => {
            this.container.style.opacity = '1';
        }, 100);
    }

    createStars() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(this.starsCount * 3);

        for (let i = 0; i < this.starsCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 50 - 15;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

        const material = new THREE.PointsMaterial({
            size: 0.05,
            color: 0xff9ff3, // Pink stars
            transparent: true,
            opacity: 0.6
        });

        this.starMesh = new THREE.Points(geometry, material);
        this.starMesh.renderOrder = -1;
        this.scene.add(this.starMesh);
    }

    createCards() {
        const geometry = new THREE.PlaneGeometry(0.35, 0.55);

        const textureLoader = new THREE.TextureLoader();
        // Use base64 data to avoid CORS issues
        const textureSource = typeof CARD_IMAGE_BASE64 !== 'undefined' ? CARD_IMAGE_BASE64 : 'card.webp';
        const texture = textureLoader.load(textureSource,
            // Success callback
            (tex) => {
                console.log('✅ Card texture loaded');
                if (THREE.SRGBColorSpace !== undefined) {
                    tex.colorSpace = THREE.SRGBColorSpace;
                }
            },
            // Progress callback
            undefined,
            // Error callback
            (err) => {
                console.warn('⚠️ Card texture failed to load:', err);
            }
        );

        const material = new THREE.MeshBasicMaterial({
            map: texture,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.95,
            color: 0xffffff,
            depthWrite: false,
            depthTest: true
        });

        this.cardMesh = new THREE.InstancedMesh(geometry, material, this.cardCount);

        const dummy = new THREE.Object3D();

        for (let i = 0; i < this.cardCount; i++) {
            const x = (Math.random() - 0.5) * 10;
            const y = (Math.random() - 0.5) * 16;
            const z = (Math.random() * 9) - 5;

            const rotX = (Math.random() - 0.5) * 0.5;
            const rotY = (Math.random() - 0.5) * 0.5;
            const rotZ = (Math.random() - 0.5) * 0.5;

            dummy.position.set(x, y, z);
            dummy.rotation.set(rotX, rotY, rotZ);
            dummy.updateMatrix();
            this.cardMesh.setMatrixAt(i, dummy.matrix);

            this.cardData.push({
                initialPos: new THREE.Vector3(x, y, z),
                randomPhase: Math.random() * Math.PI * 2,
                rotSpeed: 0.5 + Math.random() * 0.5
            });
        }

        this.scene.add(this.cardMesh);
    }

    createMainObject() {
        const textureLoader = new THREE.TextureLoader();
        const self = this;

        console.log('🔄 Loading girl.webp texture...');

        // Use base64 data to avoid CORS issues
        const textureSource = typeof GIRL_IMAGE_BASE64 !== 'undefined' ? GIRL_IMAGE_BASE64 : 'girl.webp';
        textureLoader.load(
            textureSource,
            // Success callback
            function(texture) {
                console.log('✅ Girl texture loaded successfully!');

                // Color space with fallback
                if (THREE.SRGBColorSpace !== undefined) {
                    texture.colorSpace = THREE.SRGBColorSpace;
                }

                const aspect = texture.image.width / texture.image.height;
                const config = self.getResponsiveConfig();

                console.log('📐 Creating mesh with scale:', config.scale, 'aspect:', aspect);

                const geometry = new THREE.PlaneGeometry(
                    config.scale * aspect,
                    config.scale
                );

                const material = new THREE.MeshBasicMaterial({
                    map: texture,
                    transparent: true,
                    side: THREE.DoubleSide,
                    depthTest: true,
                    depthWrite: false,
                    color: 0xffffff
                });

                self.mainObject = new THREE.Mesh(geometry, material);
                self.mainObject.position.y = config.yOffset;
                self.mainObject.position.z = 0;

                self.scene.add(self.mainObject);
                console.log('✅ Main object added to scene!');
            },
            // Progress callback
            function(xhr) {
                console.log('📊 Loading progress:', (xhr.loaded / xhr.total * 100) + '%');
            },
            // Error callback
            function(error) {
                console.error('❌ Error loading girl.webp:', error);
            }
        );
    }

    getResponsiveConfig() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const isLandscapeMobile = width > height && height < 500;
        const isMobile = width < 768;

        let scale = 3.8;  // Desktop
        let yOffset = 0;

        if (isLandscapeMobile) {
            scale = 2.5;
            yOffset = -0.5;
        } else if (isMobile) {
            scale = 2.7;
            yOffset = -0.3;
        }

        return { scale, yOffset, isMobile, isLandscapeMobile };
    }

    bindEvents() {
        window.addEventListener('mousemove', (e) => {
            this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            this.mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('touchmove', (e) => {
            if (e.touches.length > 0) {
                const t = e.touches[0];
                this.mouseX = (t.clientX / window.innerWidth) * 2 - 1;
                this.mouseY = -(t.clientY / window.innerHeight) * 2 + 1;
            }
        });

        window.addEventListener('scroll', () => {
            this.scrollY = window.scrollY;
        });

        window.addEventListener('resize', () => {
            const config = this.getResponsiveConfig();

            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.position.z = config.isMobile ? 6 : 5;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);

            if (this.mainObject) {
                this.mainObject.position.y = config.yOffset;

                const texture = this.mainObject.material.map;
                if (texture && texture.image) {
                    const aspect = texture.image.width / texture.image.height;
                    this.mainObject.geometry.dispose();
                    this.mainObject.geometry = new THREE.PlaneGeometry(
                        config.scale * aspect,
                        config.scale
                    );
                }
            }
        });
    }

    animate() {
        this.animationFrameId = requestAnimationFrame(() => this.animate());

        const time = this.clock.getElapsedTime();
        const config = this.getResponsiveConfig();

        // Animate main object (girl)
        if (this.mainObject) {
            // Levitation effect
            this.mainObject.position.y = config.yOffset + Math.sin(time * 1.5) * 0.1;

            // Mouse interaction
            const sensitivity = config.isMobile ? 0.2 : 0.5;
            this.mainObject.rotation.y += (this.mouseX * sensitivity - this.mainObject.rotation.y) * 0.05;
            this.mainObject.rotation.x += (this.mouseY * 0.1 - this.mainObject.rotation.x) * 0.05;

            // Scroll parallax
            this.mainObject.position.y -= this.scrollY * 0.002;

            // Fade on scroll
            const brightness = Math.max(0.1, 1 - this.scrollY * 0.0025);
            this.mainObject.material.color.setScalar(brightness);
        }

        // Animate stars
        if (this.starMesh) {
            this.starMesh.rotation.y = time * 0.03;
            this.starMesh.rotation.x = this.scrollY * 0.0005;
        }

        // Animate cards
        if (this.cardMesh) {
            const dummy = new THREE.Object3D();
            const scrollOffset = this.scrollY * 0.005;

            for (let i = 0; i < this.cardCount; i++) {
                const data = this.cardData[i];

                this.cardMesh.getMatrixAt(i, dummy.matrix);
                dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);

                const visualY = data.initialPos.y +
                    Math.sin(time * 0.3 + data.randomPhase) * 0.5 +
                    scrollOffset;

                dummy.rotation.x = Math.sin(time * data.rotSpeed + data.randomPhase) * 0.3;
                dummy.rotation.y = Math.cos(time * data.rotSpeed * 0.8 + data.randomPhase) * 0.3;
                dummy.rotation.z = Math.sin(time * 0.1 + data.randomPhase) * 0.1;

                dummy.position.x = data.initialPos.x;
                dummy.position.y = visualY;
                dummy.position.z = data.initialPos.z;

                dummy.updateMatrix();
                this.cardMesh.setMatrixAt(i, dummy.matrix);
            }
            this.cardMesh.instanceMatrix.needsUpdate = true;
        }

        this.renderer.render(this.scene, this.camera);
    }

    destroy() {
        cancelAnimationFrame(this.animationFrameId);

        if (this.container && this.renderer) {
            this.container.removeChild(this.renderer.domElement);
        }

        // Dispose resources
        if (this.mainObject) {
            this.mainObject.geometry.dispose();
            this.mainObject.material.dispose();
        }

        if (this.starMesh) {
            this.starMesh.geometry.dispose();
            this.starMesh.material.dispose();
        }

        if (this.cardMesh) {
            this.cardMesh.geometry.dispose();
            this.cardMesh.material.dispose();
        }

        if (this.renderer) {
            this.renderer.dispose();
        }
    }
}

// Initialize when DOM is ready
let threeBackground = null;

function initThreeBackground() {
    if (typeof THREE !== 'undefined') {
        threeBackground = new ThreeBackground();
    } else {
        console.warn('Three.js not loaded');
    }
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThreeBackground, initThreeBackground };
}
