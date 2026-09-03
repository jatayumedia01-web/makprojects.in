(function () {
  var cfg = window.FERN_SITE;
  if (!cfg) return;

  function setText(sel, value) {
    if (!value) return;
    document.querySelectorAll(sel).forEach(function (el) {
      el.textContent = value;
    });
  }

  setText('[data-cms="hero_brand"]', cfg.hero_brand);
  setText('[data-cms="hero_eyebrow"]', cfg.hero_eyebrow);
  setText('[data-cms="hero_seo_line"]', cfg.hero_seo_line);
  setText('[data-cms="rera"]', cfg.rera);
  setText('[data-cms="email"]', cfg.email);

  if (cfg.hero_title_line1 || cfg.hero_title_line2) {
    var title = document.querySelector('.banner-title');
    if (title) {
      title.innerHTML =
        (cfg.hero_title_line1 || '') +
        '<br>' +
        (cfg.hero_title_line2 || '');
    }
  }

  if (cfg.email) {
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.setAttribute('href', 'mailto:' + cfg.email);
      if (a.matches('[data-cms="email"]') || !a.children.length) {
        a.textContent = cfg.email;
      }
    });
  }
  if (cfg.brochure_path) {
    document.querySelectorAll('a[href*="fern_brochure.pdf"]').forEach(function (a) {
      a.setAttribute('href', cfg.brochure_path);
    });
  }

  // WhatsApp FAB
  if (cfg.whatsapp_fab_enabled && cfg.whatsapp) {
    var existing = document.getElementById('fernWhatsappFab');
    if (!existing) {
      var a = document.createElement('a');
      a.id = 'fernWhatsappFab';
      a.className = 'fern-wa-fab';
      a.href =
        'https://wa.me/' +
        String(cfg.whatsapp).replace(/\D/g, '') +
        '?text=' +
        encodeURIComponent(cfg.whatsapp_message || 'Hi');
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', 'WhatsApp');
      a.innerHTML =
        '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill="currentColor" d="M20.5 3.5A11 11 0 0 0 3.2 17.7L2 22l4.4-1.2A11 11 0 1 0 20.5 3.5zm-8.5 17a9 9 0 0 1-4.6-1.3l-.3-.2-2.6.7.7-2.5-.2-.3A9 9 0 1 1 12 20.5zm5-6.6c-.3-.1-1.6-.8-1.8-.9s-.4-.1-.6.1-.7.9-.8 1-.3.2-.6.1a7.4 7.4 0 0 1-2.2-1.4 8.2 8.2 0 0 1-1.5-1.9c-.2-.3 0-.4.1-.6l.4-.5c.1-.1.2-.3.3-.4s0-.3 0-.4-.6-1.5-.8-2-.2-.4-.5-.4h-.4c-.2 0-.4.1-.6.3s-.8.8-.8 1.9.8 2.2.9 2.3c.1.2 1.6 2.5 3.9 3.5 2.3 1 2.3.7 2.7.7s1.3-.5 1.5-1 .2-.9.1-1-.2-.2-.5-.3z"/></svg>';
      document.body.appendChild(a);
    }
  }
})();
