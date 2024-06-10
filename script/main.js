const counts = document.querySelectorAll('.count');
const speed = 80;

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = Number(entry.target.getAttribute('data-target'));
      const counter = entry.target;
      function update() {
        const count = Number(counter.innerText);
        const inc = target / speed;
        if (count < target) {
          counter.innerText = Math.floor(inc + count);
          setTimeout(update, 30);
        } else {
          counter.innerText = target;
        }
      }
      update();
      observer.unobserve(counter); // Stop observing once it starts counting
    }
  });
});

counts.forEach(count => {
  observer.observe(count); // Start observing each count element
});

const scrollers = document.querySelectorAll(".scroller");

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  addAnimation();
}

function addAnimation() {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".scroller__inner");
    const scrollerContent = Array.from(scrollerInner.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    });
  });
}
