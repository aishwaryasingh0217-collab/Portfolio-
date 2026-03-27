let currentSection = 0;
const totalSections = 5;
const scrollContainer = document.querySelector('.scroll-container');
const navDots = document.querySelectorAll('.nav-dot');
const themeToggle = document.getElementById('themeToggle');

// Theme Toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
}

// Function to scroll to a specific section
function scrollToSection(index) {
    if (index < 0 || index >= totalSections) return;
    
    currentSection = index;
    const translateX = -currentSection * 100;
    scrollContainer.style.transform = `translateX(${translateX}vw)`;
    
    // Update active dot
    navDots.forEach((dot, i) => {
        if (i === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
    
    // Update arrow visibility
    updateArrows();
}

// Update arrow visibility
function updateArrows() {
    const leftArrow = document.querySelector('.nav-arrow-left');
    const rightArrow = document.querySelector('.nav-arrow-right');
    
    if (currentSection === 0) {
        leftArrow.style.opacity = '0.3';
        leftArrow.style.pointerEvents = 'none';
    } else {
        leftArrow.style.opacity = '1';
        leftArrow.style.pointerEvents = 'auto';
    }
    
    if (currentSection === totalSections - 1) {
        rightArrow.style.opacity = '0.3';
        rightArrow.style.pointerEvents = 'none';
    } else {
        rightArrow.style.opacity = '1';
        rightArrow.style.pointerEvents = 'auto';
    }
}

// Navigation dots click handlers
navDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        scrollToSection(index);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        scrollToSection(currentSection + 1);
    } else if (e.key === 'ArrowLeft') {
        scrollToSection(currentSection - 1);
    }
});

// Mouse wheel navigation - only on horizontal scroll container
let isScrolling = false;
let wheelTimeout;

scrollContainer.addEventListener('wheel', (e) => {
    // Check if we're at the top or bottom of the current section
    const currentSectionElement = document.querySelectorAll('.section')[currentSection];
    const isAtTop = currentSectionElement.scrollTop === 0;
    const isAtBottom = currentSectionElement.scrollTop + currentSectionElement.clientHeight >= currentSectionElement.scrollHeight - 5;
    
    // Only change sections if scrolling horizontally OR at top/bottom
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) || (e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
        e.preventDefault();
        
        if (isScrolling) return;
        isScrolling = true;
        
        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
            if (e.deltaY > 0 || e.deltaX > 0) {
                scrollToSection(currentSection + 1);
            } else if (e.deltaY < 0 || e.deltaX < 0) {
                scrollToSection(currentSection - 1);
            }
            
            setTimeout(() => {
                isScrolling = false;
            }, 800);
        }, 50);
    }
}, { passive: false });

// Touch swipe navigation for mobile
let touchStartX = 0;
let touchEndX = 0;
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
}, { passive: true });

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const swipeThreshold = 75;
    const diffX = touchStartX - touchEndX;
    const diffY = touchStartY - touchEndY;
    
    // Only trigger horizontal swipe if horizontal movement is greater than vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
        if (diffX > 0) {
            // Swipe left - go to next section
            scrollToSection(currentSection + 1);
        } else {
            // Swipe right - go to previous section
            scrollToSection(currentSection - 1);
        }
    }
}

// Initialize
updateArrows();

// Instagram confirmation function
function openInstagram() {
    const confirmed = confirm('Are you sure you want to send a follow request to @ashwarya_17?');
    if (confirmed) {
        window.open('https://www.instagram.com/ashwarya_17/', '_blank');
    }
}
