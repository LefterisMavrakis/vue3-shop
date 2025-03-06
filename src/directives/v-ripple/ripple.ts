const createRipple = (event: MouseEvent) => {
  const button = event.currentTarget as HTMLElement;
  const ripple = document.createElement('span');

  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.position = 'absolute';
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.style.background = 'rgba(255, 255, 255, 0.6)';
  ripple.style.borderRadius = '50%';
  ripple.style.pointerEvents = 'none';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'ripple-effect 0.6s linear';

  button.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
};

const vRipple = {
  mounted(el: HTMLElement) {
    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', createRipple);
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('click', createRipple);
  },
};

export default vRipple;
