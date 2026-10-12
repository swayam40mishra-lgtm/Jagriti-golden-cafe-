
/* =====================================================
   JAAGRIT GOLDEN CAFE & BAKERY — script.js
   Features:
   1. Mobile navigation toggle
   2. Reveal animations
   3. Menu category filters
   4. Automatic footer year
===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. MOBILE NAVIGATION
  const menuToggle = document.querySelector(
    ".menu-toggle, #menu-toggle, .hamburger"
  );

  const navigation = document.querySelector(
    "#primary-nav, .primary-nav, .nav-links"
  );

  if (menuToggle && navigation) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navigation.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // 2. REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  // Show hero content immediately to avoid a permanently blank hero.
  const hero = document.querySelector(".hero");

  if (hero) {
    hero.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px 40px 0px"
      }
    );

    revealElements.forEach((element) => {
      if (!element.classList.contains("is-visible")) {
        observer.observe(element);
      }
    });
  } else {
    // Fallback for browsers without IntersectionObserver.
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // 3. MENU CATEGORY FILTERS
  const menuTabs = document.querySelectorAll(".menu-tab");
  const dishCards = document.querySelectorAll(".dish-card");

  function normalise(value) {
    return (value || "").trim().toLowerCase().replace(/\s+/g, "-");
  }

  function getTabCategory(tab) {
    return (
      tab.dataset.category ||
      tab.dataset.filter ||
      tab.getAttribute("aria-label") ||
      tab.textContent
    ).trim();
  }

  function getCardCategory(card) {
    return (
      card.dataset.category ||
      card.dataset.filter ||
      ""
    ).trim();
  }

  function filterMenu(selectedTab) {
    const selectedCategory = normalise(getTabCategory(selectedTab));
    const showAll =
      !selectedCategory ||
      selectedCategory === "all" ||
      selectedCategory === "all-items";

    menuTabs.forEach((tab) => {
      const isActive = tab === selectedTab;

      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-pressed", String(isActive));
    });

    dishCards.forEach((card) => {
      const cardCategory = normalise(getCardCategory(card));

      // If a card has no category in the HTML, leave it visible.
      const shouldShow =
        showAll ||
        !cardCategory ||
        cardCategory === selectedCategory;

      card.hidden = !shouldShow;
    });
  }

  menuTabs.forEach((tab) => {
    tab.addEventListener("click", () => filterMenu(tab));
  });

  // 4. FOOTER YEAR
  const yearElements = document.querySelectorAll(
    "#current-year, .current-year, [data-current-year]"
  );

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  // 5. WHATSAPP LINKS — keep existing link destinations unchanged.
  document.querySelectorAll('a[href*="wa.me"]').forEach((link) => {
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });

  console.log("Jaagrit Golden Cafe: script.js loaded successfully.");
});
      
