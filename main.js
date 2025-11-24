'use strict'; 
    
    // *** GLOBAL FUNCTION: Used for the image error handler ***
    const PLACEHOLDER_URL = 'https://picsum.photos/900/500'; // Corrected variable name

    window.handleImageError = function(imageElement) {
        // This is a placeholder for the missing mockup image
        imageElement.src = PLACEHOLDER_URL; 
    }

    // --- NEW: Scroll Progress Bar Logic ---
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        const progressBar = document.getElementById("scroll-progress");
        if (progressBar) {
            progressBar.style.width = scrolled + "%";
        }
    });
    
    // --- 1. Background Parallax Effect ---
    const body = document.body;
    const parallaxStrength = 0.005; 

    function handleMouseMove(e) {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (mouseX - centerX) * parallaxStrength * -1;
        const moveY = (mouseY - centerY) * parallaxStrength * -1;
        
        body.style.setProperty('--bg-x', ${moveX}px);
        body.style.setProperty('--bg-y', ${moveY}px);
    }

    document.addEventListener('mousemove', handleMouseMove);

    // --- 2. Testimonial Slider Logic (Now with Dots) ---
    const slider = document.getElementById('testimonialSlider');
    const cards = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;

    function updateSlider() {
        cards.forEach((card, index) => {
            card.style.display = (index === currentIndex) ? 'block' : 'none';
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Manual dot navigation
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            currentIndex = parseInt(this.getAttribute('data-slide'));
            updateSlider();
        });
    });

    // Simple auto-advance for visual appeal (3 seconds)
    setInterval(() => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    }, 5000); 

    // Wait until the DOM is fully loaded to run initial element manipulation
    document.addEventListener("DOMContentLoaded", function() {
        // Initialize the slider display if elements exist
        if(slider) {
            updateSlider();
        }

        // --- 3. Blueprint Grid Animation Setup (Only needs to run once DOM is ready) ---
        const grid = document.querySelector('.blueprint-grid');
        if (grid) {
            for (let i = 0; i < 3; i++) {
                const line = document.createElement('span');
                grid.appendChild(line);
            }
            for (let i = 0; i < 15; i++) {
                const node = document.createElement('div');
                node.classList.add('node');
                node.style.top = Math.random() * 90 + '%';
                node.style.left = Math.random() * 90 + '%';
                grid.appendChild(node);
            }
        }
    
        // --- 4. Newsletter Submission Logic ---
        const form = document.getElementById('newsletter-form');
        const message = document.getElementById('form-message');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault(); 
                message.style.display = 'block';
                message.textContent = 'Success! Email received for beta access.';
                setTimeout(() => {
                    message.style.display = 'none';
                    message.textContent = '';
                    form.reset();
                }, 3000);
            });
        }
    
        // --- 5. Responsive Navigation Toggle ---
        const menuToggle = document.getElementById('menuToggle');
        const navLinks = document.getElementById('navLinks');
        const links = navLinks.querySelectorAll('a');
    
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
            links.forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 900) {
                        navLinks.classList.remove('active');
                    }
                });
            });
        }
    
        // --- 6. Upload Section Logic (Drag and Drop) ---
        const uploadBox = document.getElementById('uploadBox');
        const fileInput = document.getElementById('fileInput');
        const uploadPreview = document.getElementById('uploadPreview');
        const previewImage = document.getElementById('previewImage');
        const loading = document.getElementById('loading');
        const result = document.getElementById('result');
    
        if (uploadBox && fileInput) {
            // Handle click event for manual file selection
            uploadBox.addEventListener('click', () => fileInput.click());
            
            // Prevent default behavior for all drag events
            document.addEventListener('dragover', (e) => e.preventDefault());
            document.addEventListener('drop', (e) => e.preventDefault());
            
            // Add visual feedback class on dragover
            uploadBox.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadBox.classList.add('dragover-effect');
            });
            
            // Remove visual feedback on dragleave
            uploadBox.addEventListener('dragleave', () => {
                uploadBox.classList.remove('dragover-effect');
            });
            
            // Handle file drop
            uploadBox.addEventListener('drop', (e) => {
                e.preventDefault();
                e.stopPropagation(); 
                uploadBox.classList.remove('dragover-effect');
                handleFile(e.dataTransfer.files[0]);
            });
    
            // Handle file selected manually
            fileInput.addEventListener('change', (e) => handleFile(e.target.files[0]));
    
            function handleFile(file) {
                if (!file || !file.type.match('image.*')) return; 
    
                // Hide initial upload box and show loading/preview
                uploadBox.style.display = 'none';
                // Ensure result and loading are hidden before processing
                result.style.display = 'none';
                loading.style.display = 'none';
    
                previewImage.src = URL.createObjectURL(file);
                uploadPreview.style.display = 'block';
                loading.style.display = 'block';
    
                // Simulate AI processing time
                setTimeout(() => {
                    loading.style.display = 'none';
                    result.style.display = 'block';
                }, 3000);
            }
        }
    });