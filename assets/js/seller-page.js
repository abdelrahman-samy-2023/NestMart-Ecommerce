const stars = document.querySelectorAll('.star');

stars.forEach((star, index) => {
  // On click event
  star.addEventListener('click', () => {
    // Check if the clicked star is already active
    if (star.classList.contains('active')) {
      // If active, remove all colors (active and hover)
      stars.forEach(s => s.classList.remove('active', 'hover'));
    } else {
      // Remove the active class from all stars
      stars.forEach(s => s.classList.remove('active'));

      // Add the active class to all stars up to the clicked one
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add('active');
      }
    }
  });

  // On mouseover event
  star.addEventListener('mouseover', () => {
    // Remove the hover class from all stars
    stars.forEach(s => s.classList.remove('hover'));

    // Add the hover class to all stars up to the hovered one
    for (let i = 0; i <= index; i++) {
      stars[i].classList.add('hover');
    }
  });

  // On mouseout event
  star.addEventListener('mouseout', () => {
    // Remove the hover class from all stars
    stars.forEach(s => s.classList.remove('hover'));
  });
});                                                                                