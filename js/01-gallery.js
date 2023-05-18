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
  
    const isImage = event.target.nodeName === "IMG";
    
    if(!isImage) {
      return;
    }
    
    const imgEl = event.target;
    const largeImageUrl = imgEl.dataset.source;
    const description = imgEl.alt;

    const modal = createModal(largeImageUrl, description);
    modal.show();  
  };
  
  function createModal(largeImageUrl, description) {
    const modal = basicLightbox.create(`
      <div class="modal">
        <img src="${largeImageUrl}" alt="${description}" />
      </div>
    `,
    {
      onShow: (instance) => {
        const largeImg = instance.element().querySelector('img');
        largeImg.addEventListener("click", () => modal.close());
        window.addEventListener("keydown", () => modal.close());
      },
      onClose: (instance) => {
        const largeImg = instance.element().querySelector('img');
        largeImg.removeEventListener("click", () => modal.close());
        window.removeEventListener("keydown", () => modal.close());
      },
    });
  
    return modal;
  }


      
   


 