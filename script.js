/**
 * SLOW RECICLAJE TEXTIL - CLONE SCRIPT
 */

if (!window.__slowWhatsAppTrackingInstalled) {
  window.__slowWhatsAppTrackingInstalled = true;

  const whatsappHosts = new Set([
    'wa.me',
    'api.whatsapp.com',
    'web.whatsapp.com',
    'www.whatsapp.com',
    'whatsapp.com'
  ]);

  document.addEventListener('click', (event) => {
    const clickedElement = event.target instanceof Element ? event.target : null;
    const link = clickedElement ? clickedElement.closest('a[href]') : null;
    if (!link) return;

    const destination = new URL(link.href, window.location.href);
    if (!whatsappHosts.has(destination.hostname.toLowerCase())) return;

    const linkText = (link.innerText || link.textContent || '')
      .replace(/\s+/g, ' ')
      .trim() || link.getAttribute('aria-label') || link.title || '';

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'whatsapp_click',
      link_url: destination.href,
      link_text: linkText,
      page_url: window.location.href,
      element_id: link.id || null,
      element_classes: link.getAttribute('class') || ''
    });
  }, true);
}

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.querySelector('[data-slow-header]');
  const menuToggle = header ? header.querySelector('.slow-lovable-header__menu-toggle') : null;
  const searchToggle = header ? header.querySelector('[data-slow-search-toggle]') : null;
  const searchPanel = header ? header.querySelector('[data-slow-search-panel]') : null;
  const searchClose = header ? header.querySelector('[data-slow-search-close]') : null;
  const searchInput = header ? header.querySelector('[data-slow-search-input]') : null;
  const productsItem = header ? header.querySelector('.slow-lovable-header__item--products') : null;
  const productsTrigger = header ? header.querySelector('.slow-lovable-header__products-trigger') : null;
  const cartToggle = header ? header.querySelector('.slow-lovable-header__cart') : null;
  const cartBadge = header ? header.querySelector('[data-slow-cart-count]') : null;
  const cartCountText = header ? header.querySelector('[data-slow-cart-count-text]') : null;

  // Cart Drawer Elements
  const cartDrawer = document.getElementById('slow-cart-drawer');
  const cartBackdrop = document.getElementById('slow-cart-backdrop');
  const cartClose = document.getElementById('slow-cart-close');
  const cartItemsContainer = document.getElementById('slow-cart-items');
  const cartSubtotal = document.getElementById('slow-cart-subtotal');
  const toast = document.getElementById('slow-toast');

  let cart = [];

  // ==========================================
  // HEADER SCROLL
  // ==========================================
  function handleScroll() {
    if (!header) return;
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // ==========================================
  // SEARCH PANEL
  // ==========================================
  function openSearch() {
    if (!header) return;
    header.classList.add('is-search-open');
    header.classList.remove('is-menu-open');
    if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'true');
    if (searchPanel) searchPanel.setAttribute('aria-hidden', 'false');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 150);
    }
  }

  function closeSearch() {
    if (!header) return;
    header.classList.remove('is-search-open');
    if (searchToggle) searchToggle.setAttribute('aria-expanded', 'false');
    if (searchPanel) searchPanel.setAttribute('aria-hidden', 'true');
  }

  if (searchToggle) searchToggle.addEventListener('click', (e) => {
    e.preventDefault();
    if (header.classList.contains('is-search-open')) {
      closeSearch();
    } else {
      openSearch();
    }
  });

  if (searchClose) searchClose.addEventListener('click', (e) => {
    e.preventDefault();
    closeSearch();
  });

  // Search input live filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const productCards = document.querySelectorAll('.slow-selection__product');
      productCards.forEach(card => {
        const titleEl = card.querySelector('.slow-selection__title');
        const title = titleEl ? titleEl.textContent.toLowerCase() : '';
        if (!query || title.includes(query)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }

  // ==========================================
  // MOBILE MENU
  // ==========================================
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      closeSearch();
      const isOpen = header.classList.toggle('is-menu-open');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  // Close menus on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeSearch();
      closeCart();
      if (header && header.classList.contains('is-menu-open')) {
        header.classList.remove('is-menu-open');
        if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    }
  });

  // ==========================================
  // PRODUCTS DROPDOWN
  // ==========================================
  if (productsTrigger && productsItem) {
    productsTrigger.addEventListener('click', (e) => {
      if (window.innerWidth <= 991) {
        e.preventDefault();
        productsItem.classList.toggle('is-open');
        productsTrigger.setAttribute(
          'aria-expanded',
          productsItem.classList.contains('is-open') ? 'true' : 'false'
        );
      }
    });

    document.addEventListener('click', (e) => {
      if (!productsItem.contains(e.target)) {
        productsItem.classList.remove('is-open');
        productsTrigger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ==========================================
  // CUSTOM TABS (SOLUCIONES A LA MEDIDA)
  // ==========================================
  const customTabs = document.querySelectorAll('.slow-custom__tabs span');
  const customHeading = document.querySelector('.slow-custom__heading');
  const customDesc = document.querySelector('.slow-custom__description p');

  const tabContents = {
    0: {
      heading: 'Soluciones a la medida',
      desc: 'Desarrollamos soluciones personalizadas en materiales, mobiliario, revestimientos y objetos para todo tipo de proyectos como retail, residencial, hospitality y espacios corporativos.'
    },
    1: {
      heading: 'Línea B2B para Empresas & Marcas',
      desc: 'Colaboramos con marcas globales y locales transformando sus propios residuos textiles en dotación, mobiliario comercial, revestimientos y regalos corporativos con impacto medible.'
    },
    2: {
      heading: 'Línea B2C para Hogares Contemporáneos',
      desc: 'Piezas exclusivas de diseño regenerativo para quienes buscan dar vida a sus espacios residenciales con objetos y mobiliario conscientes, bellos y duraderos.'
    }
  };

  customTabs.forEach((tab, index) => {
    tab.style.cursor = 'pointer';
    tab.addEventListener('click', () => {
      customTabs.forEach(t => t.style.opacity = '0.5');
      tab.style.opacity = '1';
      tab.style.fontWeight = '600';
      
      if (tabContents[index] && customHeading && customDesc) {
        customHeading.textContent = tabContents[index].heading;
        customDesc.textContent = tabContents[index].desc;
      }
    });
  });
  if (customTabs[0]) {
    customTabs[0].style.opacity = '1';
    customTabs[0].style.fontWeight = '600';
    for (let i = 1; i < customTabs.length; i++) {
      customTabs[i].style.opacity = '0.5';
    }
  }

  // ==========================================
  // CART DRAWER & BUY INTERACTIONS
  // ==========================================
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  function openCart() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.add('is-open');
      cartBackdrop.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.remove('is-open');
      cartBackdrop.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  if (cartToggle) {
    cartToggle.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  }

  if (cartClose) cartClose.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    if (cartCountText) cartCountText.textContent = totalCount;
    if (cartBadge) {
      cartBadge.classList.toggle('is-empty', totalCount === 0);
      cartBadge.setAttribute('aria-label', `${totalCount} productos en el carrito`);
    }

    if (cartSubtotal) {
      cartSubtotal.textContent = `$${totalPrice.toLocaleString('es-CO')},00`;
    }

    if (cartItemsContainer) {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="slow-cart-drawer__empty">Tu carrito está actualmente vacío.</div>';
      } else {
        cartItemsContainer.innerHTML = cart.map((item, idx) => `
          <div class="slow-cart-item">
            <img src="${item.image}" alt="${item.title}">
            <div class="slow-cart-item__info">
              <div class="slow-cart-item__title">${item.title}</div>
              <div class="slow-cart-item__price">${item.qty} × $${item.price.toLocaleString('es-CO')},00</div>
              <button type="button" data-remove="${idx}" style="font-size:0.75rem; color:#999; margin-top:4px; text-decoration:underline;">Eliminar</button>
            </div>
          </div>
        `).join('');

        cartItemsContainer.querySelectorAll('[data-remove]').forEach(btn => {
          btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-remove'), 10);
            cart.splice(index, 1);
            updateCartUI();
          });
        });
      }
    }
  }

  // Buy buttons
  const buyButtons = document.querySelectorAll('.slow-selection__buy');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productCard = btn.closest('.slow-selection__product');
      if (!productCard) return;

      const titleEl = productCard.querySelector('.slow-selection__title');
      const priceEl = productCard.querySelector('.slow-selection__price');
      const imgEl = productCard.querySelector('.slow-selection__image--primary') || productCard.querySelector('img');

      const title = titleEl ? titleEl.textContent.trim() : 'Producto SLOW';
      const priceRaw = priceEl ? priceEl.textContent.replace(/[^0-9]/g, '') : '0';
      // in Colombian peso format e.g. 19500000 -> 195000
      let price = parseInt(priceRaw, 10);
      if (priceRaw.endsWith('00')) {
        price = parseInt(priceRaw.slice(0, -2), 10);
      }
      const image = imgEl ? (imgEl.getAttribute('src') || '') : '';

      const existing = cart.find(i => i.title === title);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ title, price, image, qty: 1 });
      }

      updateCartUI();
      showToast(`¡"${title}" agregado al carrito!`);
      openCart();
    });
  });

  // Smooth scroll for internal hashes
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ==========================================
  // PROJECTS CATEGORY FILTER
  // ==========================================
  const projectFilters = document.querySelectorAll('[data-project-filter]');
  const projectCards = document.querySelectorAll('.slow-projects-grid__project');

  if (projectFilters.length > 0 && projectCards.length > 0) {
    projectFilters.forEach(filterBtn => {
      filterBtn.addEventListener('click', () => {
        const selected = filterBtn.getAttribute('data-project-filter');
        projectFilters.forEach(btn => btn.classList.remove('is-active'));
        filterBtn.classList.add('is-active');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-project-category');
          if (selected === 'all' || category === selected) {
            card.classList.remove('is-hidden');
          } else {
            card.classList.add('is-hidden');
          }
        });
      });
    });
  }

  console.log('SLOW Reciclaje Textil clone initialized.');
});
