
      // Loader
      window.addEventListener("load", () => {
        document.getElementById("loader").classList.add("hide");
      });

      // Custom cursor
      const cursorDot = document.getElementById("cursorDot");
      const cursorRing = document.getElementById("cursorRing");
      let mouseX = window.innerWidth / 2,
        mouseY = window.innerHeight / 2;
      let ringX = mouseX,
        ringY = mouseY;

      window.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + "px";
        cursorDot.style.top = mouseY + "px";
      });

      function animateRing() {
        ringX += (mouseX - ringX) * 0.15;
        ringY += (mouseY - ringY) * 0.15;
        cursorRing.style.left = ringX + "px";
        cursorRing.style.top = ringY + "px";
        requestAnimationFrame(animateRing);
      }
      animateRing();

      document
        .querySelectorAll(
          "a, button, .btn, .chip, .project-card, .contact-item",
        )
        .forEach((el) => {
          el.addEventListener("mouseenter", () => {
            cursorRing.style.transform = "translate(-50%,-50%) scale(1.35)";
            cursorRing.style.borderColor = "rgba(46,230,255,.7)";
          });
          el.addEventListener("mouseleave", () => {
            cursorRing.style.transform = "translate(-50%,-50%) scale(1)";
            cursorRing.style.borderColor = "rgba(255,255,255,.35)";
          });
        });

      // Scroll reveal
      const revealEls = document.querySelectorAll(".reveal");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("show");
            }
          });
        },
        { threshold: 0.14 },
      );

      revealEls.forEach((el) => observer.observe(el));

      // Skill bars
      const skillBars = document.querySelectorAll(".bar-fill");
      const skillObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const bar = entry.target;
              bar.style.width = bar.dataset.width;
              bar.classList.add("filled");
              skillObserver.unobserve(bar);
            }
          });
        },
        { threshold: 0.4 },
      );

      skillBars.forEach((bar) => skillObserver.observe(bar));

      // Active nav highlight
      const sections = document.querySelectorAll("section[id]");
      const navLinks = document.querySelectorAll(".nav-links a");

      const navObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              navLinks.forEach((link) => {
                link.classList.toggle(
                  "active",
                  link.getAttribute("href") === "#" + entry.target.id,
                );
              });
            }
          });
        },
        { threshold: 0.45 },
      );

      sections.forEach((section) => navObserver.observe(section));

      // Particle network canvas
      const canvas = document.getElementById("particles");
      const ctx = canvas.getContext("2d");
      let particles = [];
      const colorPool = ["#5b4dff", "#ff4fa3", "#2ee6ff", "#ffb224"];

      function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initParticles();
      }

      function initParticles() {
        const count = Math.min(
          110,
          Math.max(55, Math.floor(window.innerWidth / 16)),
        );
        particles = [];
        for (let i = 0; i < count; i++) {
          particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.55,
            vy: (Math.random() - 0.5) * 0.55,
            r: Math.random() * 2.1 + 1.2,
            c: colorPool[Math.floor(Math.random() * colorPool.length)],
          });
        }
      }

      function drawParticles() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
          if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = p.c;
          ctx.globalAlpha = 0.9;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const q = particles[j];
            const dx = p.x - q.x;
            const dy = p.y - q.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(q.x, q.y);
              ctx.strokeStyle = p.c;
              ctx.globalAlpha = (1 - dist / 120) * 0.28;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          }

          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);

          if (md < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.strokeStyle = p.c;
            ctx.globalAlpha = (1 - md / 130) * 0.22;
            ctx.stroke();
          }
        }

        ctx.globalAlpha = 1;
        requestAnimationFrame(drawParticles);
      }

      window.addEventListener("resize", resizeCanvas);
      resizeCanvas();
      drawParticles();

      // 3D card pointer response
      const floatCard = document.querySelector(".floating-card");
      const heroRight = document.querySelector(".hero-right");

      heroRight.addEventListener("mousemove", (e) => {
        const rect = heroRight.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rx = (y / rect.height - 0.5) * -10;
        const ry = (x / rect.width - 0.5) * 12;
        floatCard.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
      });

      heroRight.addEventListener("mouseleave", () => {
        floatCard.style.transform = "";
      });
    