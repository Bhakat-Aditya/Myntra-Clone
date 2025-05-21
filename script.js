document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.homebanners');
    const banners = document.querySelectorAll('.banner');
    const dotsContainer = document.querySelector('.dots-container');
    let currentIndex = 0;
    let interval;
    
    // Create dots
    banners.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.dot');
    
    // Auto-scroll function
    function startAutoScroll() {
        interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % banners.length;
            updateCarousel();
        }, 2000);
    }
    
    // Update carousel position
    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Update active dot
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
        // Restart auto-scroll without delay
        restartAutoScroll();
    }
    
    // Restart auto-scroll immediately
    function restartAutoScroll() {
        clearInterval(interval);
        startAutoScroll();
    }
    
    // Start auto-scroll initially
    startAutoScroll();
    
    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        clearInterval(interval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        restartAutoScroll();
    });
    
    // Handle touch events for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        clearInterval(interval);
    }, {passive: true});
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        restartAutoScroll();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            // Swipe left - next slide
            currentIndex = (currentIndex + 1) % banners.length;
        } else if (touchEndX - touchStartX > threshold) {
            // Swipe right - previous slide
            currentIndex = (currentIndex - 1 + banners.length) % banners.length;
        }
        updateCarousel();
    }
});

// Rising Star Carousel - Scrolls groups of 5 items
document.addEventListener('DOMContentLoaded', function() {
    const risingStarContainer = document.querySelector('.risingstar');
    const items = document.querySelectorAll('.risingstarcontent');
    const totalItems = items.length;
    const itemsPerGroup = 5;
    const totalGroups = Math.ceil(totalItems / itemsPerGroup);
    
    // Create container and content divs
    const containerDiv = document.createElement('div');
    containerDiv.className = 'risingstar-container';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'risingstar-content';
    
    // Group items into sets of 5
    for (let i = 0; i < totalGroups; i++) {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'risingstar-group';
        
        const startIndex = i * itemsPerGroup;
        const endIndex = Math.min(startIndex + itemsPerGroup, totalItems);
        
        for (let j = startIndex; j < endIndex; j++) {
            groupDiv.appendChild(items[j].cloneNode(true));
        }
        
        contentDiv.appendChild(groupDiv);
    }
    
    // Create navigation arrows
    const navDiv = document.createElement('div');
    navDiv.className = 'risingstar-nav';
    
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&lt;';
    prevButton.addEventListener('click', scrollPrev);
    
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&gt;';
    nextButton.addEventListener('click', scrollNext);
    
    // Create dots indicator
    const dotsDiv = document.createElement('div');
    dotsDiv.className = 'risingstar-dots';
    
    for (let i = 0; i < totalGroups; i++) {
        const dot = document.createElement('div');
        dot.className = 'risingstar-dot';
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToGroup(i));
        dotsDiv.appendChild(dot);
    }
    
    // Assemble everything
    containerDiv.appendChild(contentDiv);
    containerDiv.appendChild(navDiv);
    
    // Replace existing content
    const nameDiv = document.querySelector('.namerisingstar');
    risingStarContainer.innerHTML = '';
    risingStarContainer.appendChild(nameDiv);
    risingStarContainer.appendChild(containerDiv);
    risingStarContainer.appendChild(dotsDiv);
    
    // Carousel functionality
    let currentGroup = 0;
    const groups = document.querySelectorAll('.risingstar-group');
    const dots = document.querySelectorAll('.risingstar-dot');
    
    function updateCarousel() {
        contentDiv.style.transform = `translateX(-${currentGroup * 100}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentGroup);
        });
        
        // Disable buttons at boundaries
        prevButton.disabled = currentGroup === 0;
        nextButton.disabled = currentGroup === totalGroups - 1;
    }
    
    function scrollNext() {
        if (currentGroup < totalGroups - 1) {
            currentGroup++;
            updateCarousel();
            resetAutoScroll();
        }
    }
    
    function scrollPrev() {
        if (currentGroup > 0) {
            currentGroup--;
            updateCarousel();
            resetAutoScroll();
        }
    }
    
    function goToGroup(index) {
        currentGroup = index;
        updateCarousel();
        resetAutoScroll();
    }
    
    // Auto-scroll functionality
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            if (currentGroup === totalGroups - 1) {
                currentGroup = 0;
            } else {
                currentGroup++;
            }
            updateCarousel();
        }, 2000);
    }
    
    function resetAutoScroll() {
        clearInterval(autoScrollInterval);
        startAutoScroll();
    }
    
    // Start auto-scroll
    startAutoScroll();
    
    // Pause on hover
    containerDiv.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    containerDiv.addEventListener('mouseleave', () => {
        startAutoScroll();
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    containerDiv.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].clientX;
        clearInterval(autoScrollInterval);
    }, { passive: true });
    
    containerDiv.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
        startAutoScroll();
    }, { passive: true });
    
    function handleSwipe() {
        const threshold = 50;
        if (touchStartX - touchEndX > threshold) {
            scrollNext();
        } else if (touchEndX - touchStartX > threshold) {
            scrollPrev();
        }
    }
});