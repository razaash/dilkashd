AOS.init();

// Button Effect
document.querySelectorAll(".cta").forEach((button) => {
  button.addEventListener("mouseenter", function (e) {
    const button = e.currentTarget;

    // Remove any existing ripple element
    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    const rect = button.getBoundingClientRect();
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - rect.left - radius}px`;
    circle.style.top = `${e.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    button.appendChild(circle);

    // Trigger the ripple effect
    setTimeout(() => {
      circle.style.transform = "scale(2)";
      circle.style.opacity = "1";
    }, 0);
  });

  button.addEventListener("mouseleave", function (e) {
    const button = e.currentTarget;
    const ripple = button.querySelector(".ripple");

    if (ripple) {
      const rect = button.getBoundingClientRect();
      // Adjust the position of the ripple to the mouse leave position
      ripple.style.left = `${e.clientX - rect.left - ripple.offsetWidth / 2}px`;
      ripple.style.top = `${e.clientY - rect.top - ripple.offsetHeight / 2}px`;

      // Trigger the shrinking effect
      setTimeout(() => {
        ripple.style.transform = "scale(0)";
        ripple.style.opacity = "0";
      }, 0);

      // Remove the ripple after the animation
      ripple.addEventListener("transitionend", () => {
        ripple.remove();
      });
    }
  });
});

// Image Explorer
document.querySelectorAll(".image-container").forEach((container) => {
  const image = container.querySelector(".zoom-image");

  container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left; // X-coordinate relative to the container
    const y = e.clientY - rect.top; // Y-coordinate relative to the container

    // Calculate the transform origins based on mouse position
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    image.style.transformOrigin = `${xPercent}% ${yPercent}%`;
    image.style.transform = "scale(2)"; // Adjust scale as needed
  });

  container.addEventListener("mouseleave", () => {
    image.style.transform = "scale(1)";
  });
});
