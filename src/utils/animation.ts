const animateFlyImage = (flyImage: HTMLElement, cardRect: DOMRect) => {
    const flyImageRect = flyImage.getBoundingClientRect();
    flyImage.style.position = 'fixed';
    flyImage.style.width = '112px'; // Adjust as needed
    flyImage.style.height = '112px'; // Adjust as needed
    flyImage.style.transition = 'all 1s cubic-bezier(0.8, 0.8, 0.8, 0.8)';
    flyImage.style.zIndex = '9999'; // Ensure the image is on top of other elements
  
    flyImage.style.top = `${cardRect.top}px`;
    flyImage.style.left = `${cardRect.left}px`; // Initial position same as the card
  
    const endX = window.innerWidth - flyImageRect.width;
  
    setTimeout(() => {
      const middleY = window.innerHeight / 2 - flyImageRect.height / 2;
      flyImage.style.left = `${endX}px`;
      flyImage.style.top = `${middleY}px`;
      flyImage.style.opacity = '0';
      flyImage.style.transform = 'scale(0.5)';
    }, 500); // Move the image to the middle of the right side with a slight
  
    setTimeout(() => {
      flyImage.remove();
    }, 2000); // Remove the flying image after 2 seconds
  };
  
  export default animateFlyImage;
  