// Responsive Toggle Button
let menuToggle = document.querySelector(".responsive-toggle");
menuToggle.onclick = function() {
    menuToggle.classList.toggle("active");
}

document.getElementById('toggleButton').addEventListener('click', function() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active'); // Toggle the 'active' class to show/hide the sidebar
});

// Hide the sidebar when clicking anywhere outside of it
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const toggleButton = document.getElementById('toggleButton');

    // Check if the click is outside the sidebar and the toggle button
    if (!sidebar.contains(event.target) && !toggleButton.contains(event.target)) {
        sidebar.classList.remove('active'); // Remove the 'active' class to hide the sidebar
    }
});

// Top Arrow Button
const topArrow = document.getElementById('topArrow');

    window.onscroll = function() {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            topArrow.classList.add('show'); // Add class to show arrow
            topArrow.classList.remove('hide'); // Ensure hide class is removed
        } else {
            topArrow.classList.add('hide'); // Add class to hide arrow
            setTimeout(() => {
                topArrow.classList.remove('show'); // Remove class to hide arrow after animation
            }, 300); // Match this duration with the fadeOut animation duration
        }
    };

    topArrow.onclick = function() {
        window.scrollTo({top: 0, behavior: 'smooth'}); // Smooth scroll to top
    };