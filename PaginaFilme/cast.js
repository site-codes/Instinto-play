    // CAST DESLIZANTE 
    const barra = document.querySelector('.barra-deslizante');
    const container = document.querySelector('.barra-container');
    const castContainer = document.querySelector('.cast-container');
    let isDragging = false;
  
    barra.addEventListener('mousedown', () => {
      isDragging = true;
    });
  
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });
  
    document.addEventListener('mousemove', (event) => {
      if (isDragging) {
        const maxLeft = container.offsetWidth - barra.offsetWidth;
        let newLeft = event.clientX - container.offsetLeft - barra.offsetWidth / 2;
  
        // Limitar a barra ao contêiner
        if (newLeft < 0) newLeft = 0;
        if (newLeft > maxLeft) newLeft = maxLeft;
  
        // Atualiza a posição da barra deslizante
        barra.style.left = newLeft + 'px';
  
        // Atualiza o scroll do cast-container
        const scrollMax = castContainer.scrollWidth - castContainer.clientWidth;
        const scrollPosition = (newLeft / maxLeft) * scrollMax;
        castContainer.scrollLeft = scrollPosition;
      }
    });