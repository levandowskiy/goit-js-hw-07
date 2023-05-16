import { galleryItems } from './gallery-items.js';

const galleryItemsMarkup = galleryItems.map( ({preview, original, description} = item) => {
    return `
    <li class="gallery__item">
         <a class="gallery__link" href="large-image.jpg">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
    </li>
    `
}).join("");

const galleryEl = document.querySelector(".gallery");

galleryEl.innerHTML = galleryItemsMarkup;

galleryEl.addEventListener('click', onGalleryClick)

  function onGalleryClick(event) {
    event.preventDefault();
  
    const isImage = event.target.classList.contains("gallery__image");
    
    if(!isImage) {
      return;
    }
    
    const imgEl = event.target;
    const largeImageUrl = imgEl.dataset.source;
    const description = imgEl.alt;

    const modal = createModal(largeImageUrl, description);
    modal.show();
    closeModalOnEscape(modal);    
  };
  
  function createModal(largeImageUrl, description) {
    
    const modal = basicLightbox.create(`
      <div class="modal">
        <img src="${largeImageUrl}" alt="${description}" />
      </div>
    `);
  
    return modal;
  }

  function closeModalOnEscape(modal) {

    window.addEventListener("keydown", onEscapeClick)

     function onEscapeClick(event) {
        const isEscape = event.key === 'Escape';

        if(isEscape) {
            modal.close();
            window.removeEventListener("keydown", onEscapeClick);
        }
     }   
  }
