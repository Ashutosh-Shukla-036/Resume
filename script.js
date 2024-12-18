document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add hover effect to project cards
    const projectCards = document.querySelectorAll('.project');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'scale(1.02)';
            card.style.transition = 'transform 0.3s ease-in-out';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Typewriter effect for the main heading
    const mainHeading = document.querySelector('h1');
    if (mainHeading) {
        const text = mainHeading.textContent;
        mainHeading.textContent = '';
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                mainHeading.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        typeWriter();
    }

    // Scroll-triggered animations for sections
    const sections = document.querySelectorAll('section');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Dynamic age calculation
    const dobElement = document.querySelector('#personal-details li:first-child');
    if (dobElement) {
        const dob = new Date('2005-05-08');
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const monthDiff = today.getMonth() - dob.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
            age--;
        }
        dobElement.innerHTML = `<strong>Date of Birth:</strong> 08/05/2005 (Age: ${age})`;
    }

    // Skills progress bars
    const skills = {
        'JavaScript': 80,
        'React': 75,
        'Node.js': 70,
        'Python': 65,
        'Java': 60
    };

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        const skillsList = document.createElement('div');
        skillsList.className = 'skills-list';
        
        for (const [skill, level] of Object.entries(skills)) {
            const skillItem = document.createElement('div');
            skillItem.className = 'skill-item';
            skillItem.innerHTML = `
                <span class="skill-name">${skill}</span>
                <div class="skill-bar">
                    <div class="skill-level" style="width: 0%"></div>
                </div>
            `;
            skillsList.appendChild(skillItem);
        }
        
        skillsSection.appendChild(skillsList);

        // Animate skill bars on scroll
        const animateSkills = () => {
            const skillBars = document.querySelectorAll('.skill-level');
            skillBars.forEach((bar, index) => {
                const skill = Object.keys(skills)[index];
                bar.style.width = `${skills[skill]}%`;
            });
        };

        const skillsObserver = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateSkills();
                skillsObserver.unobserve(entries[0].target);
            }
        }, observerOptions);

        skillsObserver.observe(skillsSection);
    }

    // Back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '↑';
    backToTopButton.className = 'back-to-top';
    document.body.appendChild(backToTopButton);

    const toggleBackToTopButton = () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    };

    window.addEventListener('scroll', toggleBackToTopButton);

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});