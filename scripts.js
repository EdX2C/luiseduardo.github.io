document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM completamente cargado');

  /*******************************************************
   * 1. Tema Claro/Oscuro con Transición
   ******************************************************/
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;

  if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
  }

  if (localStorage.getItem('theme') === 'light') {
      body.classList.add('light-mode');
      if (toggleButton) {
          toggleButton.innerHTML = '<i class="bi bi-moon"></i>';
      }
  }

  if (toggleButton) {
      toggleButton.addEventListener('click', () => {
          body.classList.toggle('light-mode');
          const icon = body.classList.contains('light-mode')
              ? '<i class="bi bi-moon"></i>'
              : '<i class="bi bi-sun"></i>';
          toggleButton.innerHTML = icon;
          localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
          body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
          setTimeout(() => (body.style.transition = ''), 500);
      });
  }

  /*******************************************************
   * 2. Mensaje de Bienvenida
   ******************************************************/
  const welcomeMessage = document.getElementById('welcome-message');
  const closeWelcome = document.getElementById('close-welcome');

  if (welcomeMessage && closeWelcome) {
      const isWelcomeClosed = localStorage.getItem('welcomeClosed') === 'true';
      if (!isWelcomeClosed) {
          welcomeMessage.style.display = 'block';
          welcomeMessage.classList.add('fadeIn');
          setTimeout(() => welcomeMessage.classList.remove('fadeIn'), 500);
      } else {
          welcomeMessage.style.display = 'none'; 
      }

      closeWelcome.addEventListener('click', () => {
          welcomeMessage.classList.add('fadeOut');
          setTimeout(() => {
              welcomeMessage.style.display = 'none';
              welcomeMessage.classList.remove('fadeOut');
              localStorage.setItem('welcomeClosed', 'true');
          }, 500);
      });
  }

  /*******************************************************
   * 3. Botón Volver Arriba
   ******************************************************/
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
      window.addEventListener('scroll', () => {
          if (window.scrollY > 300) {
              backToTopButton.classList.add('show');
          } else {
              backToTopButton.classList.remove('show');
          }
      });

      backToTopButton.addEventListener('click', () => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
      });
  }

  /*******************************************************
   * 4. Scroll Reveal para Secciones (opcional)
   ******************************************************/
  const sections = document.querySelectorAll('.section');
  const observerOptions = { root: null, rootMargin: '0px', threshold: 0.1 };
  const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
          }
      });
  }, observerOptions);

  sections.forEach(section => {
      sectionObserver.observe(section);
  });

  /*******************************************************
   * 5.5 Timeline Interactiva (Historia del Hardware)
   *******************************************************/
  const timelineItems = document.querySelectorAll('.timeline-item');

  console.log('Timeline items encontrados:', timelineItems.length);

  if (timelineItems.length > 0) {
      const timelineObserver = new IntersectionObserver((entries) => {
          entries.forEach((entry, index) => {
              if (entry.isIntersecting) {
                  setTimeout(() => {
                      entry.target.classList.add('visible');
                  }, index * 300);
              }
          });
      }, { threshold: 0.2 });

      timelineItems.forEach(item => {
          timelineObserver.observe(item);
      });

      timelineItems.forEach(item => {
          const content = item.querySelector('.timeline-content');
          const expandedDesc = item.querySelector('.expanded-desc');

          if (content && expandedDesc) {
              content.addEventListener('click', () => {
                  console.log('Clic detectado en:', content.innerHTML.substring(0, 50) + '...');
                  const isActive = expandedDesc.classList.contains('active');
                  timelineItems.forEach(otherItem => {
                      const otherDesc = otherItem.querySelector('.expanded-desc');
                      if (otherDesc !== expandedDesc) {
                          otherDesc.classList.remove('active');
                      }
                  });
                  expandedDesc.classList.toggle('active');
              });
          } else {
              console.warn('Faltan elementos .timeline-content o .expanded-desc en:', item);
          }

          item.addEventListener('mouseenter', () => {
              const icon = item.querySelector('.timeline-icon');
              if (icon) {
                  icon.style.animation = 'spin 2s linear infinite';
              }
          });

          item.addEventListener('mouseleave', () => {
              const icon = item.querySelector('.timeline-icon');
              if (icon) {
                  icon.style.animation = '';
              }
          });
      });
  } else {
      console.warn('No se encontraron elementos .timeline-item en el DOM');
  }

  /*******************************************************
   * 5. Tutorial Interactivo (PC Virtual)
   ******************************************************/
  const startTutorialBtn = document.getElementById('start-tutorial');
  const tutorialOverlay = document.getElementById('tutorial-overlay');
  const nextStepBtn = document.getElementById('next-step');
  const tutorialStepNumber = document.getElementById('tutorial-step-number');
  const tutorialMessage = document.getElementById('tutorial-message');
  let tutorialStep = 0;

  const tutorialSteps = [
      { message: 'Pasa el cursor sobre un componente para verlo resaltado.', action: () => {} },
      { message: 'Haz clic en un componente para verlo en detalle.', action: () => {} },
      { message: '¡Tutorial completado! Presiona Cerrar para salir.', action: () => {} }
  ];

  if (startTutorialBtn && tutorialOverlay) {
      startTutorialBtn.addEventListener('click', () => {
          tutorialStep = 0;
          updateTutorialStep();
          tutorialOverlay.classList.remove('d-none');
          tutorialOverlay.classList.add('fadeIn');
      });

      nextStepBtn?.addEventListener('click', () => {
          tutorialStep++;
          if (tutorialStep < tutorialSteps.length) {
              updateTutorialStep();
          } else {
              tutorialOverlay.classList.add('fadeOut');
              setTimeout(() => tutorialOverlay.classList.add('d-none'), 500);
          }
      });
  }

  function updateTutorialStep() {
      tutorialStepNumber.textContent = tutorialStep + 1;
      tutorialMessage.textContent = tutorialSteps[tutorialStep].message;
      tutorialSteps[tutorialStep].action();
  }

  /*******************************************************
   * 6. Tooltip para Hotspots en la PC Virtual
   ******************************************************/
  const tooltip = document.getElementById('tooltip');
  if (tooltip) {
      document.querySelectorAll('area').forEach(area => {
          area.addEventListener('mouseover', (e) => {
              const areaName = area.getAttribute('alt');
              tooltip.textContent = areaName;
              const frontImg = document.querySelector('#pc-inside img');
              const backImg = document.querySelector('#pc-back-open img');
              let rect;
              if (frontImg && !frontImg.classList.contains('d-none') && !frontImg.parentElement.classList.contains('d-none')) {
                  rect = frontImg.getBoundingClientRect();
              } else if (backImg && !backImg.classList.contains('d-none') && !backImg.parentElement.classList.contains('d-none')) {
                  rect = backImg.getBoundingClientRect();
              } else {
                  rect = e.target.getBoundingClientRect();
              }

              const coords = area.coords.split(',').map(Number);
              tooltip.style.left = `${rect.left + coords[0] + 10}px`;
              tooltip.style.top = `${rect.top + coords[1] - 20}px`;
              tooltip.classList.add('show');
          });

          area.addEventListener('mouseout', () => {
              tooltip.classList.remove('show');
          });
      });
  }

  /*******************************************************
   * 7. Interacciones de la PC Virtual (Vistas Frontal/Trasera)
   ******************************************************/
  const pcImage = document.getElementById('pc-image');
  const pcInside = document.getElementById('pc-inside');
  const pcBackClosed = document.getElementById('pc-back-closed');
  const pcBackOpen = document.getElementById('pc-back-open');
  const viewFront = document.getElementById('view-front');
  const viewBack = document.getElementById('view-back');
  const pcFrontView = document.getElementById('pc-front-view');
  const pcBackView = document.getElementById('pc-back-view');
  const zoomedView = document.getElementById('zoomed-view');
  const zoomedImage = document.getElementById('zoomed-image');
  const closeZoomed = document.getElementById('close-zoomed');
  const zoomedControls = document.getElementById('zoomed-controls');
  const removeCoolerBtn = document.getElementById('remove-cooler');
  const backButton = document.getElementById('back-button');
  const zoomedTitle = document.getElementById('zoomed-title');
  const zoomedDesc = document.getElementById('zoomed-desc');

  
  if (pcImage && pcInside) {
      pcImage.addEventListener('click', () => {
          pcImage.classList.add('d-none');
          pcInside.classList.remove('d-none');
      });

      pcImage.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
              pcImage.classList.add('d-none');
              pcInside.classList.remove('d-none');
          }
      });
  }

  
  if (pcBackClosed && pcBackOpen) {
      pcBackClosed.addEventListener('click', () => {
          pcBackClosed.classList.add('d-none');
          pcBackOpen.classList.remove('d-none');
      });

      pcBackClosed.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
              pcBackClosed.classList.add('d-none');
              pcBackOpen.classList.remove('d-none');
          }
      });
  }

  
  if (viewFront && viewBack && pcFrontView && pcBackView) {
      viewFront.addEventListener('click', () => {
          pcFrontView.classList.remove('d-none');
          pcFrontView.classList.add('active');
          pcBackView.classList.remove('active');
          pcBackView.classList.add('d-none');
          viewFront.classList.add('active');
          viewBack.classList.remove('active');
          if (zoomedView) {
              zoomedView.classList.remove('show');
              zoomedView.classList.add('d-none');
          }
      });

      viewBack.addEventListener('click', () => {
          pcBackView.classList.remove('d-none');
          pcBackView.classList.add('active');
          pcFrontView.classList.remove('active');
          pcFrontView.classList.add('d-none');
          viewBack.classList.add('active');
          viewFront.classList.remove('active');
          if (zoomedView) {
              zoomedView.classList.remove('show');
              zoomedView.classList.add('d-none');
          }
      });
  }

  
  if (closeZoomed && zoomedView && pcBackOpen && pcInside) {
      closeZoomed.addEventListener('click', () => {
          zoomedView.classList.remove('show');
          zoomedView.classList.add('d-none');
          if (pcBackView && pcBackView.classList.contains('active')) {
              pcBackOpen.classList.remove('d-none');
          } else {
              pcInside.classList.remove('d-none');
          }
      });
  }

  
  if (removeCoolerBtn && backButton && zoomedView && zoomedImage) {
      removeCoolerBtn.addEventListener('click', () => {
          zoomedImage.src = 'images/cpu_zoomed.webp';
          zoomedTitle.textContent = 'Procesador (CPU)';
          zoomedDesc.textContent = 'Procesador AMD Ryzen 7 9800X3D, potencia para juegos y multitarea.';
          zoomedControls.classList.add('d-none');
          backButton.classList.remove('d-none');
      });

      backButton.addEventListener('click', () => {
          zoomedImage.src = 'images/cooler_zoomed.webp';
          zoomedTitle.textContent = 'Cooler';
          zoomedDesc.textContent = 'Pump block del cooler, encargado de la refrigeración líquida.';
          zoomedControls.classList.remove('d-none');
          backButton.classList.add('d-none');
      });
  }

  /*******************************************************
   * 7.1 Mapeo de información para los componentes
   ******************************************************/
  const componentInfoMap = {
      'images/gpu_zoomed.webp': {
          title: 'Tarjeta de Video (GPU)',
          desc: 'Tarjeta de video para gráficos 4K y tareas de IA.'
      },
      'images/cooler_zoomed.webp': {
          title: 'Cooler',
          desc: 'Pump block del cooler, encargado de la refrigeración líquida.'
      },
      'images/motherboard_zoomed.webp': {
          title: 'Placa Base (Motherboard)',
          desc: 'Placa base, conecta todos los componentes.'
      },
      'images/fans_zoomed.webp': {
          title: 'Ventiladores (Fans)',
          desc: 'Ventiladores, aire fresco y estilo RGB.'
      },
      'images/ram_zoomed.webp': {
          title: 'Memoria (RAM)',
          desc: 'Memoria, velocidad para juegos y tareas.'
      },
      'images/psu_zoomed.webp': {
          title: 'Fuente de Alimentación (PSU)',
          desc: 'Fuente de 850W, certificada 80 Plus Gold. Proporciona energía estable.'
      },
      'images/ssd_zoomed.webp': {
          title: 'Unidad de Estado Sólido (SSD)',
          desc: 'Almacenamiento rápido NVMe, ideal para cargar juegos y aplicaciones.'
      },
      'images/cpu_zoomed.webp': {
          title: 'Procesador (CPU)',
          desc: 'Procesador AMD Ryzen 7 9800X3D, potencia para juegos y multitarea.'
      }
  };

  /*******************************************************
   * 7.2 Zoom de componentes (vista frontal)
   ******************************************************/
  if (document.querySelectorAll('#pc-front-view area').length > 0) {
      document.querySelectorAll('#pc-front-view area').forEach(area => {
          area.addEventListener('click', (e) => {
              e.preventDefault();
              const imageSrc = area.getAttribute('data-image');
              if (imageSrc && zoomedView && zoomedImage && pcInside) {
                  const info = componentInfoMap[imageSrc];
                  if (!info) {
                      console.warn(`No se encontró info para la imagen: ${imageSrc}`);
                      return;
                  }

                  zoomedImage.src = imageSrc;
                  zoomedTitle.textContent = info.title;
                  zoomedDesc.textContent = info.desc;

                  pcInside.classList.add('fade-out');
                  zoomedView.classList.remove('d-none');
                  zoomedView.classList.add('show');
                  setTimeout(() => {
                      pcInside.classList.add('d-none');
                      pcInside.classList.remove('fade-out');
                      zoomedControls.classList.add('d-none');
                      if (imageSrc === 'images/cooler_zoomed.webp') {
                          zoomedControls.classList.remove('d-none');
                          backButton.classList.add('d-none');
                      } else {
                          backButton.classList.remove('d-none');
                      }
                  }, 500);
              }
          });

          area.addEventListener('mouseover', () => {
              const areaName = area.getAttribute('alt');
              const highlight = document.querySelector(
                  `#pc-inside .hotspot-highlights .highlight[data-area="${areaName}"]`
              );
              if (highlight && !pcInside.classList.contains('d-none')) {
                  highlight.classList.add('active');
              }
          });

          area.addEventListener('mouseout', () => {
              const areaName = area.getAttribute('alt');
              const highlight = document.querySelector(
                  `#pc-inside .hotspot-highlights .highlight[data-area="${areaName}"]`
              );
              if (highlight && !pcInside.classList.contains('d-none')) {
                  highlight.classList.remove('active');
              }
          });

          area.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const imageSrc = area.getAttribute('data-image');
                  if (imageSrc && zoomedView && zoomedImage && pcInside) {
                      const info = componentInfoMap[imageSrc];
                      if (!info) {
                          console.warn(`No se encontró info para la imagen: ${imageSrc}`);
                          return;
                      }

                      zoomedImage.src = imageSrc;
                      zoomedTitle.textContent = info.title;
                      zoomedDesc.textContent = info.desc;

                      pcInside.classList.add('fade-out');
                      zoomedView.classList.remove('d-none');
                      zoomedView.classList.add('show');
                      setTimeout(() => {
                          pcInside.classList.add('d-none');
                          pcInside.classList.remove('fade-out');
                          zoomedControls.classList.add('d-none');
                          if (imageSrc === 'images/cooler_zoomed.webp') {
                              zoomedControls.classList.remove('d-none');
                              backButton.classList.add('d-none');
                          } else {
                              backButton.classList.remove('d-none');
                          }
                      }, 500);
                  }
              }
          });
      });
  }

  /*******************************************************
   * 7.3 Zoom de componentes (vista trasera)
   ******************************************************/
  if (document.querySelectorAll('#pc-back-view area').length > 0) {
      document.querySelectorAll('#pc-back-view area').forEach(area => {
          area.addEventListener('click', (e) => {
              e.preventDefault();
              const imageSrc = area.getAttribute('data-image');
              if (imageSrc && zoomedView && zoomedImage && pcBackOpen) {
                  const info = componentInfoMap[imageSrc] || {
                      title: area.getAttribute('alt'),
                      desc: 'Descripción no disponible.'
                  };

                  zoomedImage.src = imageSrc;
                  zoomedTitle.textContent = info.title;
                  zoomedDesc.textContent = info.desc;

                  pcBackOpen.classList.add('fade-out');
                  zoomedView.classList.remove('d-none');
                  zoomedView.classList.add('show');
                  setTimeout(() => {
                      pcBackOpen.classList.add('d-none');
                      pcBackOpen.classList.remove('fade-out');
                      zoomedControls.classList.add('d-none');
                      backButton.classList.remove('d-none');
                  }, 500);
              }
          });

          area.addEventListener('mouseover', () => {
              const areaName = area.getAttribute('alt');
              const highlight = document.querySelector(
                  `#pc-back-open .hotspot-highlights .highlight[data-area="${areaName}"]`
              );
              if (highlight && !pcBackOpen.classList.contains('d-none')) {
                  highlight.classList.add('active');
              }
          });

          area.addEventListener('mouseout', () => {
              const areaName = area.getAttribute('alt');
              const highlight = document.querySelector(
                  `#pc-back-open .hotspot-highlights .highlight[data-area="${areaName}"]`
              );
              if (highlight && !pcBackOpen.classList.contains('d-none')) {
                  highlight.classList.remove('active');
              }
          });

          area.addEventListener('keydown', (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  const imageSrc = area.getAttribute('data-image');
                  if (imageSrc && zoomedView && zoomedImage && pcBackOpen) {
                      const info = componentInfoMap[imageSrc] || {
                          title: area.getAttribute('alt'),
                          desc: 'Descripción no disponible.'
                      };

                      zoomedImage.src = imageSrc;
                      zoomedTitle.textContent = info.title;
                      zoomedDesc.textContent = info.desc;

                      pcBackOpen.classList.add('fade-out');
                      zoomedView.classList.remove('d-none');
                      zoomedView.classList.add('show');
                      setTimeout(() => {
                          pcBackOpen.classList.add('d-none');
                          pcBackOpen.classList.remove('fade-out');
                          zoomedControls.classList.add('d-none');
                          backButton.classList.remove('d-none');
                      }, 500);
                  }
              }
          });
      });
  }

    /*******************************************************
     * 8. Datos de Noticias (Ejemplo)
     ******************************************************/
    // (Mismo arreglo newsData con featured y no featured)
    let likesData = JSON.parse(localStorage.getItem('likesData')) || {};

    function getLikesCount(newsId) {
        return likesData[newsId] || 0;
    }

    function incrementLikes(newsId) {
        likesData[newsId] = (likesData[newsId] || 0) + 1;
        localStorage.setItem('likesData', JSON.stringify(likesData));
    }

    const newsData = [
        {
          id: 0,
          title: 'xAI Grok 4.0: IA Cuántica y Razonamiento Avanzado',
          description: 'La nueva versión de Grok combina técnicas cuánticas y razonamiento simbólico profundo.',
          detailedContent: `
            <h2>Antecedentes</h2>
            <p>
              xAI, la startup impulsada por Elon Musk, ha venido desarrollando modelos de lenguaje
              con la promesa de integrar razonamiento profundo y capacidades cuánticas simuladas. 
              Grok 3.5 ya mostraba avances en búsqueda y análisis de datos; ahora, con Grok 4.0,
              se busca un salto aún mayor.
            </p>
      
            <h2>Novedades Principales</h2>
            <ul>
              <li><strong>Simulaciones Cuánticas</strong>: Se integran técnicas cuánticas en entornos HPC.</li>
              <li><strong>Razonamiento Simbólico</strong>: Permite al modelo “explicar” parte de su proceso de pensamiento.</li>
              <li><strong>Enfoque Multimodal</strong>: Abarca texto, voz e imágenes en un mismo marco.</li>
            </ul>
      
            <blockquote>
              “Creemos que Grok 4.0 acerca la IA a un entendimiento más profundo de la realidad.” 
              <br><em>- Elon M., fundador de xAI</em>
            </blockquote>
      
            <h2>Aplicaciones Prácticas</h2>
            <p>
              Desde la predicción climática hasta la generación de código, Grok 4.0 promete 
              abordar problemas complejos que involucran grandes volúmenes de datos.
              xAI apunta a sectores como logística, medicina e investigación científica.
            </p>
      
            <h2>Conclusión</h2>
            <p>
              Aunque Grok 4.0 está en fase beta y depende de supercomputadoras HPC para 
              sus simulaciones cuánticas, la comunidad ve con interés este modelo. 
              La competencia con OpenAI y DeepMind se intensifica, y xAI busca consolidarse 
              con un producto menos “sesgado” y más transparente en su razonamiento.
            </p>
      
            <h3>Fuentes</h3>
            <ul>
              <li><a href="https://x.ai" target="_blank">xAI Oficial</a></li>
              <li><a href="https://www.teslarati.com" target="_blank">Teslarati</a></li>
            </ul>
          `,
          image: 'images/news1.webp',
          videoUrl: 'https://www.youtube.com/embed/7Wo7lz1xcq0?si=KRFjxhxGjebqTohC',
          specifications: [
            'Arquitectura: IA multimodal con simulaciones cuánticas',
            'Capacidades: Razonamiento simbólico, DeepSearch'
          ],
          availability: 'Fase beta para socios de xAI, lanzamiento público estimado en 2026.',
          featured: false,
          author: 'Elon M.',
          date: '2025-08-15',
          category: 'IA',
          readTime: 5
        },
        {
          id: 1,
          title: 'Google Willow: Rompiendo Barreras en la Computación Cuántica',
          description: 'El chip Willow de Google promete un salto cuántico en la velocidad de procesamiento.',
          detailedContent: `
            <h2>Origen del Proyecto Willow</h2>
            <p>
              Tras el éxito de Sycamore en 2019, Google continuó investigando nuevas 
              arquitecturas cuánticas. Willow nace como el resultado de una 
              colaboración entre Google Quantum AI y diversos centros universitarios.
            </p>
      
            <h2>Novedades Principales</h2>
            <ul>
              <li><strong>144 Qubits</strong> con corrección de errores mejorada.</li>
              <li>Diseño 3D que reduce la interferencia entre qubits.</li>
              <li>Integración con la nube de Google para experimentos remotos.</li>
            </ul>
      
            <blockquote>
              “Willow marca un antes y un después en la escalabilidad de la computación cuántica.”
              <br><em>- Sundar P., CEO de Google</em>
            </blockquote>
      
            <h2>Comparativa con la Competencia</h2>
            <p>
              IBM Eagle (127 qubits) y Rigetti Aspen (80 qubits) son algunos referentes del mercado.
              Willow supera a Eagle en número de qubits, pero la calidad de las compuertas 
              y la fidelidad siguen siendo temas de debate.
            </p>
      
            <h2>Aplicaciones</h2>
            <p>
              Google apunta a resolver problemas complejos de química cuántica, 
              criptografía post-cuántica y optimización avanzada. 
              Aun así, el acceso comercial está limitado a programas de investigación.
            </p>
      
            <h2>Conclusión</h2>
            <p>
              Willow supone un paso más en la carrera cuántica. 
              Queda por ver si Google logrará la tan ansiada “ventaja cuántica” en aplicaciones reales.
            </p>
      
            <h3>Fuentes</h3>
            <ul>
              <li><a href="https://quantumai.google" target="_blank">Google Quantum AI</a></li>
              <li><a href="https://www.nature.com" target="_blank">Nature</a></li>
            </ul>
          `,
          image: 'images/news2.webp',
          videoUrl: 'https://www.youtube.com/embed/5poquswMLrA?si=AzvcqF0baxkfAB3h',
          specifications: [
            'Qubits: 144',
            'Tecnología: Corrección de errores avanzada'
          ],
          availability: 'Programa de investigación en Google Quantum AI, sin lanzamiento comercial aún.',
          featured: false,
          author: 'Sundar P.',
          date: '2025-08-10',
          category: 'Cuántica',
          readTime: 4
        },
        {
          id: 2,
          title: 'Intel Core Ultra Family 5,7,9',
          description: 'Intel expande su familia de procesadores Ultra con rendimiento sin precedentes.',
          detailedContent: `
            <h2>Antecedentes</h2>
            <p>
              Desde la introducción de la arquitectura Arrow Lake, Intel ha buscado un 
              equilibrio entre rendimiento y eficiencia energética. Con la nueva 
              familia Ultra (5, 7 y 9), la compañía promete llevar la multitarea y los 
              juegos a un nuevo nivel.
            </p>
      
            <h2>Novedades Principales</h2>
            <ul>
              <li><strong>Frecuencias Turbo de hasta 5.8 GHz</strong> en el modelo Ultra 9.</li>
              <li>Compatibilidad con <strong>DDR5</strong> y <strong>Thunderbolt 5</strong>.</li>
              <li>Mejoras en caché L3 y L2 para cargas de trabajo intensivas.</li>
            </ul>
      
            <blockquote>
              “Con la familia Core Ultra, Intel aspira a liderar el mercado de gaming y creación de contenido.”
              <br><em>- Pat G., CEO de Intel</em>
            </blockquote>
      
            <h2>Comparativa con la Competencia</h2>
            <p>
              En pruebas internas, el Ultra 7 supera al Ryzen 7 7800X en un 15% 
              de rendimiento en tareas multihilo, aunque el consumo energético 
              es ligeramente superior. El Ultra 9, por su parte, rivaliza con 
              los modelos de gama alta de AMD.
            </p>
      
            <h2>Aplicaciones Prácticas</h2>
            <p>
              Desde la edición de video hasta el gaming de última generación, 
              la familia Ultra promete tiempos de carga más rápidos y mejor respuesta. 
              Además, su integración con Wi-Fi 7 facilita conexiones de baja latencia.
            </p>
      
            <h2>Conclusión</h2>
            <p>
              La nueva familia de procesadores Intel Core Ultra promete un salto notable en rendimiento, 
              especialmente para usuarios entusiastas. Sin embargo, la competencia con AMD sigue cerrada,
              y los precios podrían ser un factor determinante para muchos consumidores.
            </p>
      
            <h3>Fuentes</h3>
            <ul>
              <li><a href="https://www.intel.com" target="_blank">Intel.com</a></li>
              <li><a href="https://www.tomshardware.com" target="_blank">Tom's Hardware</a></li>
            </ul>
          `,
          image: 'images/news3.webp',
          videoUrl: 'https://www.youtube.com/embed/zY7_Pb9URgg?si=HZPe908jEe37O-Co',
          specifications: [
            'Arquitectura: Arrow Lake',
            'Frecuencia Boost: Hasta 5.8 GHz',
            'Soporte: DDR5, Thunderbolt 5, Wi-Fi 7'
          ],
          availability: 'Lanzamiento oficial en Q4 2025, precios desde $299.',
          featured: false,
          author: 'Pat G.',
          date: '2025-08-05',
          category: 'Hardware',
          readTime: 6
        },
        {
          id: 3,
          title: 'Nvidia Grace Hopper',
          description: 'El superchip Grace Hopper combina CPU ARM y GPU Hopper en un solo módulo.',
          detailedContent: `
            <h2>Origen del Proyecto Grace Hopper</h2>
            <p>
              NVIDIA, líder en aceleradores de inteligencia artificial, decidió 
              fusionar la CPU Grace de 72 núcleos ARMv9 con su poderosa GPU Hopper H100 
              para crear un módulo unificado. Este proyecto rinde homenaje a la pionera 
              Grace Hopper, destacando la innovación en el campo de la computación.
            </p>
      
            <h2>Novedades Principales</h2>
            <ul>
              <li><strong>72 núcleos ARMv9</strong> para la parte CPU (Grace).</li>
              <li>GPU Hopper H100 con memoria HBM3 de altísimo ancho de banda.</li>
              <li>Interconexión NVLink para una comunicación ultra rápida entre CPU y GPU.</li>
            </ul>
      
            <blockquote>
              “El GH200 busca revolucionar el HPC y la IA a gran escala.” 
              <br><em>- Jensen H., CEO de NVIDIA</em>
            </blockquote>
      
            <h2>Aplicaciones</h2>
            <p>
              Con un diseño pensado para centros de datos, Grace Hopper apunta a 
              entrenamientos masivos de IA, simulaciones científicas y supercomputación 
              en la nube. Varios proveedores, como Azure y AWS, han mostrado interés 
              en integrar GH200 en sus infraestructuras.
            </p>
      
            <h2>Conclusión</h2>
            <p>
              NVIDIA Grace Hopper marca un hito en la unificación CPU-GPU. 
              A pesar de su potencia, el consumo energético y el precio 
              podrían limitar su adopción en algunos sectores. Aun así, 
              para grandes corporaciones y laboratorios, representa 
              una apuesta fuerte por la aceleración de la IA.
            </p>
      
            <h3>Fuentes</h3>
            <ul>
              <li><a href="https://www.nvidia.com" target="_blank">NVIDIA Oficial</a></li>
              <li><a href="https://www.anandtech.com" target="_blank">AnandTech</a></li>
            </ul>
          `,
          image: 'images/news4.webp',
          videoUrl: 'https://www.youtube.com/embed/9x3Zv_Z20hY?si=yrxQ5kUU1t_NDv1F',
          specifications: [
            'CPU: 72 núcleos ARMv9 (Grace)',
            'GPU: NVIDIA Hopper H100'
          ],
          availability: 'Producción en masa a inicios de 2026, adopción en centros de datos.',
          featured: false,
          author: 'Jensen H.',
          date: '2025-07-30',
          category: 'Hardware',
          readTime: 7
        },
        {
          id: 4,
          title: 'RTX 50 Series',
          description: 'NVIDIA revela la próxima generación de tarjetas gráficas con un rendimiento sin precedentes.',
          detailedContent: `
            <h2>Antecedentes</h2>
            <p>
              La serie RTX 40 estableció un nuevo estándar en rendimiento gráfico y aplicaciones 
              de IA. Ahora, la <strong>RTX 50 Series</strong> promete un salto adicional 
              del 40% en potencia, apuntando a la resolución 8K y usos profesionales de alto nivel.
            </p>
      
            <h2>Principales Características</h2>
            <ul>
              <li><strong>Arquitectura Ada Lovelace Next-Next-Gen</strong>, optimizada para Ray Tracing.</li>
              <li><strong>24GB de VRAM GDDR7</strong> con un ancho de banda superior a 1 TB/s.</li>
              <li>Soporte para DLSS 4.0 y mejoras en trazado de rayos.</li>
            </ul>
      
            <blockquote>
              “La RTX 50 Series es un sueño hecho realidad para creadores de contenido y gamers extremos.” 
              <br><em>- NVIDIA Team</em>
            </blockquote>
      
            <h2>Comparativa con la Competencia</h2>
            <p>
              AMD también trabaja en su próxima generación (probablemente la RX 8000),
              por lo que se espera una lucha cerrada. Las filtraciones sugieren que 
              la RTX 50 superaría a la RX 7900 XTX en un 20% en 8K.
            </p>
      
            <h2>Conclusión</h2>
            <p>
              Con un lanzamiento estimado para finales de 2025, la RTX 50 Series apunta 
              a entusiastas y profesionales de la animación, simulación y renderizado. 
              El precio podría rondar los $1,499 en adelante, un factor que limitará 
              su adopción masiva.
            </p>
      
            <h3>Fuentes</h3>
            <ul>
              <li><a href="https://www.nvidia.com" target="_blank">NVIDIA Oficial</a></li>
              <li><a href="https://www.videocardz.com" target="_blank">VideoCardz</a></li>
            </ul>
          `,
          image: 'images/news-featured1.webp',
          videoUrl: 'https://www.youtube.com/embed/uDup7cYNU6c?si=CjPEPmTsbPi3iYs7',
          specifications: [
            'Arquitectura: Ada Lovelace Next-Next-Gen',
            'VRAM: 24GB GDDR7'
          ],
          availability: 'Fecha estimada: finales de 2025.',
          featured: true,
          author: 'NVIDIA Team',
          date: '2025-08-20',
          category: 'Hardware',
          readTime: 6
        },
        {
          id: 5,
          title: 'Ryzen 9000 series',
          description: 'AMD lanza su nueva línea de procesadores con un salto significativo en eficiencia y potencia.',
          detailedContent: `
            <h2>Arquitectura Zen 5</h2>
            <p>
              La <strong>serie Ryzen 9000</strong> se basa en la arquitectura Zen 5, 
              la cual introduce mejoras en el manejo de energía y una mejor 
              disposición de los núcleos. Hasta 16 núcleos y 32 hilos en su modelo tope de gama.
            </p>
      
            <h2>Novedades Destacadas</h2>
            <ul>
              <li><strong>Frecuencia Boost</strong> de hasta 5.7 GHz en el Ryzen 9 9950X.</li>
              <li><strong>30% más de eficiencia</strong> respecto a la generación anterior (Ryzen 7000).</li>
              <li>Soporte para <strong>DDR5</strong> y <strong>PCIe 5.0</strong>.</li>
            </ul>
      
            <blockquote>
              “Zen 5 redefine lo que significa equilibrio entre potencia y eficiencia.” 
              <br><em>- Lisa S., CEO de AMD</em>
            </blockquote>
      
            <h2>Comparativa</h2>
            <p>
              En benchmarks filtrados, la serie Ryzen 9000 supera a los Core Ultra 
              en algunas tareas multihilo, aunque Intel mantiene cierta ventaja 
              en single-core. El factor precio será clave en la competencia.
            </p>
      
            <h2>Conclusión</h2>
            <p>
              AMD apunta a un mercado de entusiastas y creadores de contenido, 
              con la promesa de un rendimiento sólido y menor consumo energético.
              Con precios desde $399, la adopción podría ser masiva, siempre y 
              cuando cumpla con las expectativas en el día a día.
            </p>
      
            <h3>Fuentes</h3>
            <ul>
              <li><a href="https://www.amd.com" target="_blank">AMD Oficial</a></li>
              <li><a href="https://www.techpowerup.com" target="_blank">TechPowerUp</a></li>
            </ul>
          `,
          image: 'images/news-featured2.webp',
          videoUrl: 'https://www.youtube.com/embed/4L1ZV3Ql5-I?si=COAc1eRvt0eUp-df',
          specifications: [
            'Arquitectura: Zen 5',
            'Núcleos/Hilos: Hasta 16/32'
          ],
          availability: 'Lanzamiento en Q3 2025, con precios desde $399.',
          featured: true,
          author: 'Lisa S.',
          date: '2025-08-25',
          category: 'Hardware',
          readTime: 5
        }
      ];
      

    /*******************************************************
     * 9. Renderizar Noticias (Carrusel + Grid) + Búsqueda
     ******************************************************/
    const featuredNewsContainer = document.getElementById('featured-news-inner');
    const newsListContainer = document.getElementById('news-list');
    const searchInput = document.getElementById('search-input');

    function isNewsNew(newsItem) {
        
        const daysThreshold = 10;
        const newsDate = new Date(newsItem.date);
        const now = new Date();
        const diffTime = Math.abs(now - newsDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= daysThreshold;
    }

    function renderNews(filteredData = newsData) {
        const featuredNews = filteredData.filter(n => n.featured);
        const nonFeaturedNews = filteredData.filter(n => !n.featured);

        if (featuredNewsContainer) featuredNewsContainer.innerHTML = '';
        if (newsListContainer) newsListContainer.innerHTML = '';

        
        featuredNews.forEach((news, idx) => {
            const carouselItem = document.createElement('div');
            carouselItem.className = 'carousel-item' + (idx === 0 ? ' active' : '');
            const newBadge = isNewsNew(news) ? `<span class="badge bg-danger me-2">NEW</span>` : '';

            carouselItem.innerHTML = `
                <img src="${news.image}" class="d-block w-100" alt="${news.title}">
                <div class="carousel-caption d-none d-md-block">
                    <h5>${newBadge}${news.title}</h5>
                    <p>${news.description}</p>
                    <a href="news-details.html?id=${news.id}" class="btn btn-primary">Leer Más</a>
                </div>
            `;
            featuredNewsContainer.appendChild(carouselItem);
        });

        
        nonFeaturedNews.forEach((news, idx) => {
            const col = document.createElement('div');
            col.className = 'col-md-6 mb-4';
            const newBadge = isNewsNew(news) ? `<span class="badge bg-danger me-1">NEW</span>` : '';
            const categoryBadge = `<span class="badge bg-info me-2">${news.category}</span>`;
            const dateObj = new Date(news.date);
            const dateStr = dateObj.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
            const readTimeStr = news.readTime ? ` · ${news.readTime} min de lectura` : '';

            const shareLinks = `
                <div class="mt-2">
                  <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(news.title)}%20${encodeURIComponent(window.location.origin + '/news-details.html?id=' + news.id)}" target="_blank" class="me-2"><i class="bi bi-twitter"></i></a>
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.origin + '/news-details.html?id=' + news.id)}" target="_blank" class="me-2"><i class="bi bi-facebook"></i></a>
                  <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.origin + '/news-details.html?id=' + news.id)}" target="_blank"><i class="bi bi-linkedin"></i></a>
                </div>
            `;

            const likesCount = getLikesCount(news.id);

            col.innerHTML = `
                <div class="card" style="animation-delay: ${idx * 0.2}s">
                    <img src="${news.image}" class="card-img-top" alt="${news.title}" loading="lazy">
                    <div class="card-body">
                        <h5 class="card-title">${newBadge}${news.title}</h5>
                        <p class="text-muted mb-1">${categoryBadge}Por ${news.author} · ${dateStr}${readTimeStr}</p>
                        <p class="card-text">${news.description}</p>

                        <a href="news-details.html?id=${news.id}" class="btn btn-primary read-more me-2">Leer Más</a>
                        <button class="btn btn-outline-success like-btn" data-id="${news.id}">
                          <i class="bi bi-hand-thumbs-up"></i> <span class="like-count">${likesCount}</span>
                        </button>
                        ${shareLinks}
                    </div>
                </div>
            `;
            newsListContainer.appendChild(col);
        });

        
        document.querySelectorAll('.like-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const newsId = parseInt(btn.getAttribute('data-id'));
                incrementLikes(newsId);
                const likeCountSpan = btn.querySelector('.like-count');
                likeCountSpan.textContent = getLikesCount(newsId);
            });
        });
    }

    
    if (featuredNewsContainer && newsListContainer) {
        renderNews();
    }

    
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            const query = searchInput.value.toLowerCase();
            const filtered = newsData.filter(item => {
                return (
                    item.title.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query) ||
                    item.author.toLowerCase().includes(query) ||
                    item.category.toLowerCase().includes(query)
                );
            });
            renderNews(filtered);
        });
    }

    /*******************************************************
     * 10. Lógica para news-details.html (Detalles + Relacionadas)
     ******************************************************/
    const urlParams = new URLSearchParams(window.location.search);
    const newsId = parseInt(urlParams.get('id'));
    const newsItem = newsData.find(item => item.id === newsId);

    if (newsItem) {
        document.getElementById('news-title').textContent = newsItem.title;
        document.getElementById('news-description').textContent = newsItem.description;
        document.getElementById('news-image').src = newsItem.image;
        document.getElementById('news-detailed-content').innerHTML = newsItem.detailedContent;
        document.getElementById('news-category').textContent = newsItem.category;
        document.getElementById('news-date').textContent = newsItem.date;
        document.getElementById('news-author').textContent = newsItem.author;
        document.getElementById('news-read-time').textContent = newsItem.readTime;

        const specsList = document.getElementById('news-specifications');
        specsList.innerHTML = newsItem.specifications.map(spec => `<li class="list-group-item">${spec}</li>`).join('');
        document.getElementById('news-availability').textContent = newsItem.availability;

        if (newsItem.videoUrl) {
            const videoIframe = document.getElementById('youtube-video');
            videoIframe.src = newsItem.videoUrl;
            document.getElementById('news-video').style.display = 'block';
        }
    } else {
        document.getElementById('news-title').textContent = 'Noticia no encontrada';
    }

    
    setTimeout(() => {
        document.querySelector('.section').classList.add('visible');
    }, 100);

    /*******************************************************
     * 11. Suscripción (formulario CTA)
     ******************************************************/
    const subscribeForm = document.getElementById('subscribe-form');
    const subscribeSuccess = document.getElementById('subscribe-success');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulación de suscripción
            subscribeSuccess.classList.remove('d-none');
            subscribeForm.reset();
            setTimeout(() => {
                subscribeSuccess.classList.add('d-none');
            }, 3000);
        });
    }
});


const contactForm = document.getElementById('contact-form');
const mailtoBtn = document.getElementById('mailto-btn');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            formSuccess.classList.remove('d-none');
            contactForm.reset();
            setTimeout(() => formSuccess.classList.add('d-none'), 3000);
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    mailtoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        if (name && email && message) {
            window.location.href = `mailto:lc2012-0869@unphu.edu.do?subject=Consulta de ${name}&body=Nombre: ${name}%0D%0AEmail: ${email}%0D%0AMensaje: ${message}`;
        } else {
            alert('Por favor, completa todos los campos antes de enviar por correo.');
        }
    });
}

// Verificación de particles.js. Que cayo.
if (typeof particlesJS !== 'undefined') {
    console.log('particles.js está cargado y listo.');
} else {
    console.error('particles.js no está disponible. Verifica que la librería se haya cargado correctamente.');
}
