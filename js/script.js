function updateClocks() {
    const nepalClock = document.getElementById('nepalClock');
    const localClock = document.getElementById('localClock');
    
    if (nepalClock) {
        const nepalTime = new Date().toLocaleTimeString('en-US', {
            timeZone: 'Asia/Kathmandu',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        nepalClock.textContent = nepalTime;
    }
    
    if (localClock) {
        const localTime = new Date().toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        localClock.textContent = localTime;
    }
}

function getUserTimeZone() {
    const userTimeZone = document.getElementById('userTimeZone');
    if (userTimeZone) {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        userTimeZone.textContent = timeZone;
    }
}

function setThemeByTime() {
    const now = new Date();
    const currentHour = now.getHours();
    
    if (currentHour >= 6 && currentHour < 18) {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
    } else {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
    }
}

function setupContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (!form) return;
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = 'green';
                form.reset();
            } else {
                formStatus.textContent = 'Error sending message. Please try again.';
                formStatus.style.color = 'red';
            }
        } catch (error) {
            formStatus.textContent = 'Error sending message. Please try again.';
            formStatus.style.color = 'red';
        }
        
        setTimeout(() => {
            formStatus.textContent = '';
        }, 5000);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    updateClocks();
    setInterval(updateClocks, 1000);
    getUserTimeZone();
    setThemeByTime();
    setInterval(setThemeByTime, 60000);
    setupContactForm();
});