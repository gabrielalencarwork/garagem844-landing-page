document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const body = document.body;
    const gateScreen = document.getElementById('gate-screen');
    const autoPanel = document.getElementById('gate-btn-auto');
    const eventsPanel = document.getElementById('gate-btn-events');
    const toggleServiceBtn = document.getElementById('toggle-service-btn');
    const navLogoLink = document.getElementById('nav-logo-link');
    
    // Navigation & Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Floating WhatsApp Button
    const whatsappFloatBtn = document.getElementById('whatsapp-float-btn');
    const headerWhatsappCta = document.getElementById('header-whatsapp-cta');
    
    // Lightbox Gallery
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxModal = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    
    // WhatsApp Base Configuration
    const baseWhatsappUrl = 'https://wa.me/553899501938';
    const templates = {
        general: 'Olá! Gostaria de obter informações gerais sobre os serviços da Garagem 844.',
        auto: 'Olá, gostaria de agendar uma lavagem/serviço ou tirar dúvidas sobre o estacionamento rotativo ou mensal!',
        events: 'Olá, gostaria de solicitar um orçamento e verificar datas disponíveis para locação do espaço de eventos!'
    };

    // --- 1. GATE NAVIGATION LOGIC ---
    function selectService(serviceType, bypassAnimation = false) {
        if (serviceType === 'auto') {
            body.classList.remove('show-events');
            
            if (bypassAnimation) {
                body.classList.remove('gate-active');
                body.classList.add('content-active', 'show-auto');
            } else {
                body.classList.add('auto-selected');
                setTimeout(() => {
                    body.classList.remove('gate-active', 'auto-selected');
                    body.classList.add('content-active', 'show-auto');
                }, 600);
            }
            window.location.hash = '#automotivo';
            updateWhatsappLinks('auto');
        } else if (serviceType === 'events') {
            body.classList.remove('show-auto');
            
            if (bypassAnimation) {
                body.classList.remove('gate-active');
                body.classList.add('content-active', 'show-events');
            } else {
                body.classList.add('events-selected');
                setTimeout(() => {
                    body.classList.remove('gate-active', 'events-selected');
                    body.classList.add('content-active', 'show-events');
                }, 600);
            }
            window.location.hash = '#eventos';
            updateWhatsappLinks('events');
        }
        updateActiveNavLink();
    }

    function resetToGate() {
        window.location.hash = '';
        body.className = 'gate-active';
        updateWhatsappLinks('general');
        
        mobileMenuBtn.classList.remove('open');
        navMenu.classList.remove('mobile-open');
    }

    autoPanel.addEventListener('click', () => selectService('auto'));
    eventsPanel.addEventListener('click', () => selectService('events'));
    
    function updateWhatsappLinks(type) {
        const text = encodeURIComponent(templates[type]);
        const finalUrl = `${baseWhatsappUrl}?text=${text}`;
        
        if (whatsappFloatBtn) whatsappFloatBtn.setAttribute('href', finalUrl);
        if (headerWhatsappCta) headerWhatsappCta.setAttribute('href', finalUrl);
    }

    toggleServiceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        resetToGate();
    });

    navLogoLink.addEventListener('click', (e) => {
        e.preventDefault();
        resetToGate();
    });

    // --- 2. ROUTER & HASH HANDLING ---
    function checkHash() {
        const hash = window.location.hash;
        if (hash === '#automotivo' || hash.startsWith('#inicio-auto') || hash.startsWith('#servicos') || hash.startsWith('#orcamento-auto') || hash.startsWith('#unidades')) {
            selectService('auto', true);
        } else if (hash === '#eventos' || hash.startsWith('#inicio-events') || hash.startsWith('#diferenciais') || hash.startsWith('#orcamento-eventos') || hash.startsWith('#galeria')) {
            selectService('events', true);
        } else if (hash === '#horarios' || hash === '#contato') {
            if (!body.classList.contains('show-events')) {
                selectService('auto', true);
            }
        } else if (!hash) {
            resetToGate();
        }
    }

    window.addEventListener('hashchange', checkHash);
    checkHash();

    // --- 3. STICKY HEADER & SCROLL SPY ---
    window.addEventListener('scroll', () => {
        const header = document.getElementById('main-navigation');
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        updateActiveNavLink();
    });

    function updateActiveNavLink() {
        const fromTop = window.scrollY + 120;
        let activeFound = false;

        const activeContainerId = body.classList.contains('show-auto') ? '#automotivo-screen' : '#eventos-screen';
        const sectionSelector = `${activeContainerId} section[id]`;
        const sections = document.querySelectorAll(sectionSelector);

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (fromTop >= top && fromTop < top + height) {
                const id = section.getAttribute('id');
                const cleanId = id.replace('-auto', '').replace('-events', '');
                
                navLinks.forEach(link => {
                    link.classList.remove('nav-active');
                    const href = link.getAttribute('href');
                    if (href === `#${cleanId}` || href === `#${id}`) {
                        link.classList.add('nav-active');
                        activeFound = true;
                    }
                });
            }
        });

        if (!activeFound && body.classList.contains('content-active')) {
            navLinks.forEach(link => link.classList.remove('nav-active'));
            const homeLink = document.getElementById('link-section-home');
            if (homeLink) homeLink.classList.add('nav-active');
        }
    }

    document.querySelectorAll('.footer-link-switcher').forEach(link => {
        link.addEventListener('click', function(e) {
            const target = this.getAttribute('data-target');
            selectService(target, true);
        });
    });

    document.querySelectorAll('.btn-to-gate').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            resetToGate();
        });
    });

    // --- 4. MOBILE MENU ---
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        navMenu.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('open');
            navMenu.classList.remove('mobile-open');
        });
    });

    // --- 5. GALLERY LIGHTBOX MODAL ---
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const placeholder = item.querySelector('.gallery-img-placeholder');
            const style = window.getComputedStyle(placeholder);
            const bgImgUrl = style.backgroundImage.slice(4, -1).replace(/"/g, "");
            
            const captionText = item.querySelector('h4').textContent;
            const categoryText = item.querySelector('.gallery-tag').textContent;

            lightboxImg.src = bgImgUrl;
            lightboxCaption.innerHTML = `<span class="gallery-tag" style="display:inline-block; margin-bottom:5px;">${categoryText}</span><br><strong>${captionText}</strong>`;
            
            lightboxModal.style.display = 'block';
            setTimeout(() => {
                lightboxModal.classList.add('show');
            }, 10);
        });
    });

    function closeLightboxModal() {
        lightboxModal.classList.remove('show');
        setTimeout(() => {
            lightboxModal.style.display = 'none';
            lightboxImg.src = '';
        }, 300);
    }

    closeLightbox.addEventListener('click', closeLightboxModal);
    lightboxModal.addEventListener('click', (e) => {
        if (e.target === lightboxModal) {
            closeLightboxModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightboxModal.style.display === 'block') {
            closeLightboxModal();
        }
    });

    // --- 6. INTERACTIVE CALCULATOR LOGIC (AUTOMOTIVE) ---
    const prices = {
        hatch: {
            'lavagem-simples': 50,
            'lavagem-detalhada': 90,
            'higienizacao': 200,
            'polimento': 250
        },
        sedan: {
            'lavagem-simples': 60,
            'lavagem-detalhada': 100,
            'higienizacao': 220,
            'polimento': 280
        },
        suv: {
            'lavagem-simples': 70,
            'lavagem-detalhada': 120,
            'higienizacao': 250,
            'polimento': 320
        }
    };

    const serviceLabels = {
        'lavagem-simples': 'Lavagem Simples',
        'lavagem-detalhada': 'Lavagem Detalhada',
        'higienizacao': 'Higienização de Estofados',
        'polimento': 'Polimento Comercial'
    };

    const sizeLabels = {
        hatch: 'Carro Pequeno / Hatch',
        sedan: 'Carro Médio / Sedan',
        suv: 'Grande / SUV / Picape'
    };

    const carSizeInputs = document.querySelectorAll('input[name="car-size"]');
    const serviceCheckboxes = document.querySelectorAll('input[name="services"]');
    const totalDisplay = document.getElementById('calc-total');
    const summaryItemsContainer = document.getElementById('summary-items');
    const sendCalcWhatsappBtn = document.getElementById('btn-send-calc-whatsapp');

    function calculateTotal() {
        let selectedSize = 'hatch';
        carSizeInputs.forEach(input => {
            if (input.checked) selectedSize = input.value;
        });

        document.getElementById('val-simples').textContent = `R$ ${prices[selectedSize]['lavagem-simples'].toFixed(2).replace('.', ',')}`;
        document.getElementById('val-detalhada').textContent = `R$ ${prices[selectedSize]['lavagem-detalhada'].toFixed(2).replace('.', ',')}`;
        document.getElementById('val-higienizacao').textContent = `R$ ${prices[selectedSize]['higienizacao'].toFixed(2).replace('.', ',')}`;
        document.getElementById('val-polimento').textContent = `R$ ${prices[selectedSize]['polimento'].toFixed(2).replace('.', ',')}`;

        let total = 0;
        let selectedServices = [];
        
        serviceCheckboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const serviceKey = checkbox.value;
                const price = prices[selectedSize][serviceKey];
                total += price;
                selectedServices.push({
                    name: serviceLabels[serviceKey],
                    price: price
                });
            }
        });

        totalDisplay.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
        summaryItemsContainer.innerHTML = '';
        
        const carSizeRow = document.createElement('div');
        carSizeRow.className = 'summary-item-row';
        carSizeRow.innerHTML = `<span class="name">Porte: ${sizeLabels[selectedSize]}</span>`;
        summaryItemsContainer.appendChild(carSizeRow);
        
        const hr = document.createElement('hr');
        hr.style.border = 'none';
        hr.style.borderTop = '1px solid rgba(255,255,255,0.05)';
        hr.style.margin = '5px 0';
        summaryItemsContainer.appendChild(hr);

        if (selectedServices.length === 0) {
            const emptyRow = document.createElement('div');
            emptyRow.className = 'summary-item-row';
            emptyRow.innerHTML = '<span class="name" style="font-style: italic;">Nenhum serviço selecionado</span>';
            summaryItemsContainer.appendChild(emptyRow);
        } else {
            selectedServices.forEach(srv => {
                const row = document.createElement('div');
                row.className = 'summary-item-row';
                row.innerHTML = `<span class="name">${srv.name}</span><span class="val">R$ ${srv.price.toFixed(2).replace('.', ',')}</span>`;
                summaryItemsContainer.appendChild(row);
            });
        }

        return {
            size: sizeLabels[selectedSize],
            services: selectedServices,
            total: total
        };
    }

    carSizeInputs.forEach(input => input.addEventListener('change', calculateTotal));
    serviceCheckboxes.forEach(checkbox => checkbox.addEventListener('change', calculateTotal));
    
    if (totalDisplay) {
        calculateTotal();
    }

    if (sendCalcWhatsappBtn) {
        sendCalcWhatsappBtn.addEventListener('click', () => {
            const data = calculateTotal();
            if (data.services.length === 0) {
                alert('Por favor, escolha pelo menos um serviço para agendar!');
                return;
            }

            let msg = `Olá, Garagem 844! Fiz uma simulação de orçamento pelo site e gostaria de solicitar um agendamento:\n\n`;
            msg += `🚗 *Porte do Carro:* ${data.size}\n`;
            msg += `🛠️ *Serviços Selecionados:*\n`;
            data.services.forEach(srv => {
                msg += ` - ${srv.name}: R$ ${srv.price.toFixed(2).replace('.', ',')}\n`;
            });
            msg += `\n💰 *Valor Estimado Total:* R$ ${data.total.toFixed(2).replace('.', ',')}\n\n`;
            msg += `Qual a disponibilidade de horários para atendimento?`;

            const finalUrl = `${baseWhatsappUrl}?text=${encodeURIComponent(msg)}`;
            window.open(finalUrl, '_blank');
        });
    }

    // --- 7. INTERACTIVE INQUIRY FORM (EVENTS) ---
    const eventsForm = document.getElementById('events-quote-form');
    if (eventsForm) {
        eventsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('event-name').value;
            const type = document.getElementById('event-type').value;
            const guests = document.getElementById('event-guests').value;
            const period = document.getElementById('event-period').value;
            const detail = document.getElementById('event-message').value;

            let msg = `Olá, Garagem 844! Gostaria de consultar orçamento e datas para locação do espaço de eventos:\n\n`;
            msg += `👤 *Nome do Solicitante:* ${name}\n`;
            msg += `🎉 *Tipo de Celebração:* ${type}\n`;
            msg += `👥 *Quantidade de Convidados:* ${guests}\n`;
            msg += `🕒 *Período Desejado:* ${period}\n`;
            
            if (detail.trim() !== '') {
                msg += `📝 *Mensagem/Detalhes:* ${detail}\n`;
            }
            
            msg += `\nComo posso proceder para verificar a agenda de reservas?`;

            const finalUrl = `${baseWhatsappUrl}?text=${encodeURIComponent(msg)}`;
            window.open(finalUrl, '_blank');
        });
    }
});
