const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const year = document.getElementById("year");

menuBtn.addEventListener("click", () => {
  const isExpanded = menuBtn.getAttribute("aria-expanded") === "true";
  menuBtn.setAttribute("aria-expanded", !isExpanded);
  nav.classList.toggle("show");
});

year.textContent = new Date().getFullYear();

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) { // όταν κάνουμε scroll πάνω από 100px
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Contact form with AJAX
// ...existing code...
(function(){
  var form = document.getElementById('contactForm');
  var modal = document.getElementById('successModal');
  var closeBtn = document.getElementById('closeModal');

  if (!form || !modal || !closeBtn) return;

  // show modal and focus close button
  function showModal(){
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    closeBtn.focus();
  }

  // hide modal
  function hideModal(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
  }

  // after successful submit (AJAX), call showModal() and reset form
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var formData = new FormData(form);
    fetch('https://formspree.io/f/xanaylwl', {
      method: 'POST',
      body: formData,
      headers: {'Accept': 'application/json'}
    }).then(function(res){
      if (res.ok) {
        form.reset();
        showModal();
      } else {
        alert('Error sending message. Please try again.');
      }
    }).catch(function(){
      alert('Error sending message. Please try again.');
    });
  });

  closeBtn.addEventListener('click', function(){ hideModal(); });

  // click outside to close
  modal.addEventListener('click', function(e){
    if (e.target === modal) hideModal();
  });

  // optional: close on Escape
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && modal.classList.contains('show')) hideModal();
  });
})();


(function(){
  var btn = document.getElementById('menuBtn');
  var closeBtn = document.getElementById('closeNav');
  var nav = document.getElementById('nav');
  var body = document.body;
  if (!btn || !nav) { console.warn('menuBtn or nav missing'); return; }

  // create overlay once
  var overlay = document.querySelector('.nav-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
  }

  function openMenu(){
    body.classList.add('nav-open');
    btn.setAttribute('aria-expanded','true');
    var first = nav.querySelector('a');
    if (first) first.focus();
  }

  function closeMenu(){
    body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded','false');
    btn.focus();
  }

  btn.addEventListener('click', function(e){
    e.preventDefault();
    if (body.classList.contains('nav-open')) closeMenu();
    else openMenu();
  });

  overlay.addEventListener('click', closeMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  nav.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  window.addEventListener('resize', function(){
    if (window.innerWidth > 980 && body.classList.contains('nav-open')) closeMenu();
  });
})();
