// Language & Direction Management
const translations = {
    ar: {
        home: 'الرئيسية',
        booking: 'حجز',
        services: 'الخدمات',
        contact: 'تواصل',
        heroTitle: 'تبريد منزلك بأفضل الأسعار',
        heroSubtitle: 'خدمة صيانة وفك وتركيب تكييف سريعة وموثوقة',
        bookNow: 'احجز الآن',
        callNow: 'اتصل الآن',
        name: 'الاسم',
        phone: 'رقم الهاتف',
        address: 'العنوان',
        acType: 'نوع التكييف',
        servicesTitle: 'خدماتنا',
        maintenance: 'صيانة دورية',
        installation: 'تركيب تكييف',
        diagnosis: 'تشخيص أعطال',
        contactTitle: 'تواصل معنا',
        phoneLabel: 'هاتف',
        addressLabel: 'العنوان',
        success: '✅ تم الحجز بنجاح! سنتصل بك قريباً'
    },
    en: {
        home: 'Home',
        booking: 'Booking',
        services: 'Services',
        contact: 'Contact',
        heroTitle: 'Cool Your Home at Best Prices',
        heroSubtitle: 'Fast and reliable AC maintenance and installation service',
        bookNow: 'Book Now',
        callNow: 'Call Now',
        name: 'Name',
        phone: 'Phone',
        address: 'Address',
        acType: 'AC Type',
        date: 'Date',
        time: 'Time',
        servicesTitle: 'Our Services',
        maintenance: 'Periodic Maintenance',
        installation: 'AC Installation',
        diagnosis: 'Fault Diagnosis',
        offersTitle: 'Current Offers',
        contactTitle: 'Contact Us',
        phoneLabel: 'Phone',
        addressLabel: 'Address',
        success: '✅ Booking successful! We will contact you soon'
    }
};

let currentLang = 'ar';

// Initialize app
document.addEventListener('DOMContentLoaded', function () {
    initLanguage();
    initNavbar();
});

// Language Toggle
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        currentLang = this.dataset.lang;
        document.documentElement.lang = currentLang;
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        updateLanguage();
    });
});

function initLanguage() {
    updateLanguage();
}

function updateLanguage() {
    const t = translations[currentLang];
    document.querySelector('#hero .hero-title').textContent = t.heroTitle;
    document.querySelector('#hero .hero-subtitle').textContent = t.heroSubtitle;
    const btn = document.querySelector('[onclick="scrollToBooking()"]');
    if (btn) btn.textContent = t.bookNow;
    document.querySelector('.btn-secondary').textContent = t.callNow;

    // Update nav
    document.querySelectorAll('.nav-link')[0].textContent = t.home;
    document.querySelectorAll('.nav-link')[1].textContent = t.booking;
    document.querySelectorAll('.nav-link')[2].textContent = t.services;

    document.querySelectorAll('.nav-link')[3].textContent = t.contact;

    // Form labels
    document.querySelector('#name').previousElementSibling.textContent = t.name;
    document.querySelector('#phone').previousElementSibling.textContent = t.phone;
    document.querySelector('#address').previousElementSibling.textContent = t.address;
    document.querySelector('#acType').previousElementSibling.textContent = t.acType;

    // #time field removed

    // Sections
    document.querySelectorAll('.section-title')[0].textContent = t.booking;
    document.querySelectorAll('.section-title')[1].textContent = t.servicesTitle;
    if (document.querySelectorAll('.section-title')[2]) document.querySelectorAll('.section-title')[2].textContent = t.offersTitle;
    if (document.querySelectorAll('.section-title')[3]) document.querySelectorAll('.section-title')[3].textContent = t.contactTitle;

    // Services
    document.querySelectorAll('.service-card h3')[0].textContent = t.maintenance;
    document.querySelectorAll('.service-card h3')[1].textContent = t.installation;
    document.querySelectorAll('.service-card h3')[2].textContent = t.diagnosis;

    // Success message
    document.querySelector('#successMessage').textContent = t.success;
}

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});




function scrollToBooking() {
    document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
}

function makeCall() {
    window.location.href = 'tel:+201005001739';
}



document.getElementById('bookingForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loading = submitBtn.querySelector('.loading');
    const successMsg = document.getElementById('successMessage');
    const errorMsg = document.getElementById('errorMessage');

    // Loading ON
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    loading.style.display = 'inline';

    const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        acType: document.getElementById('acType').value

    };

    try {
        await fetch('https://script.google.com/macros/s/AKfycbw53ypjPyWbWPHbec3Hbfuzfo1LvXvP74wRUyJ19_NJ41LeaYVL4uwvPHu0_1Ok5fW4/exec', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        // نجاح
        successMsg.classList.remove('hidden');
        window.open(`https://wa.me/+201005001739?text=تم حجز صيانة باسم ${formData.name}`, '_blank');
        this.reset();

    } catch (error) {
        errorMsg.classList.remove('hidden');
        console.error('Error:', error);
    } finally {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        loading.style.display = 'none';

        setTimeout(() => {
            successMsg.classList.add('hidden');
            errorMsg.classList.add('hidden');
        }, 5000);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const tracks = document.querySelectorAll('.testimonial-track');

    // التأكد من أن الأنميشن يعمل بسلاسة بعد تحميل الصور أو العناصر
    window.addEventListener('load', () => {
        tracks.forEach(track => {
            track.style.animationPlayState = 'running';
        });
    });

    // ميزة إضافية: لو المستخدم لمس الشاشة في الموبايل تقف الحركة
    tracks.forEach(track => {
        track.addEventListener('touchstart', () => {
            track.style.animationPlayState = 'paused';
        }, { passive: true });

        track.addEventListener('touchend', () => {
            track.style.animationPlayState = 'running';
        }, { passive: true });
    });
});
