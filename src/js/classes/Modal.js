// import { gsap } from "gsap";

export class Modal {
  constructor(modal, options = {}) {
    (this.preventBodyLock = options.preventBodyLock ? true : false),
      (this.modal = modal);
    this.overlay = this.modal;
    this.content = this.modal.querySelector(".modal-content");
    this.close = this.modal.querySelector(".modal-closer");

    this.id = this.modal.getAttribute("id");
    this.openers = document.querySelectorAll(
      '[data-modal-anchor="' + this.id + '"]'
    );
    this.isInited = false;

    this.focusableElements = [
      "a[href]",
      "input",
      "select",
      "textarea",
      "button",
      "iframe",
      "[contenteditable]",
      '[tabindex]:not([tabindex^="-"])',
    ];
    this.init();
  }

  bodyLocker = (bool) => {
    const body = document.querySelector("body");

    if (bool) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }
  };

  focusTrap = () => {
    const firstFocusableElement = this.modal.querySelectorAll(
      this.focusableElements
    )[0];
    const focusableContent = this.modal.querySelectorAll(
      this.focusableElements
    );
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    if (focusableContent.length) {
      const onBtnClickHandler = (evt) => {
        const isTabPressed = evt.key === "Tab" || evt.key === 9;

        if (evt.key === "Escape") {
          document.removeEventListener("keydown", onBtnClickHandler);
        }

        if (!isTabPressed) {
          return;
        }

        if (evt.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus();
            evt.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus();
            evt.preventDefault();
          }
        }
      };

      document.addEventListener("keydown", onBtnClickHandler);

      firstFocusableElement.focus();
    }
  };

  addListeners = () => {
    if (this.openers) {
      this.openers.forEach((opener) => {
        opener.removeEventListener("click", this.openModal);
      });
    }
    console.log('listeners');
    document.addEventListener("click", this.closeByOverlayClick);
    document.addEventListener("keydown", this.closeByEscBtn);

    if (this.close) {
      this.close.addEventListener("click", this.closeByBtnClick);
    }
  };

  refresh = () => {
    document.removeEventListener("click", this.closeByOverlayClick);
    document.removeEventListener("keydown", this.closeByEscBtn);

    if (this.close) {
      this.close.removeEventListener("click", this.closeByBtnClick);
    }

    console.log('closed');

    this.modal.classList.remove('active');

    // gsap.fromTo(
    //   this.modal,
    //   { display: "flex" },
    //   {
    //     opacity: 0,
    //     duration: 0.6,
    //     ease: "ease-in",
    //     onComplete: () => {
    //       this.modal.style.display = "none";
    //       //если в модалке есть форма, при закрытии обнуляю поля
    //       this.modal.querySelectorAll("form").forEach((f) => f.reset());
    //     },
    //   }
    // );

    !this.preventBodyLock ? this.bodyLocker(false) : null;

    this.preventBodyLock = false;

    if (this.openers) {
      this.openers.forEach((opener) => {
        opener.addEventListener("click", this.openModal);
      });
    }
  };

  closeByOverlayClick = (evt) => {
    console.log(evt.target, this.overlay);
    if (evt.target === this.overlay) {
      this.refresh();
    }
  };

  closeByEscBtn = (evt) => {
    if (evt.key === "Escape") {
      this.refresh();
    }
  };

  closeByBtnClick = () => {
    this.refresh();
  };

  openModal = (evt) => {
    evt.preventDefault();
    this.bodyLocker(true);

    console.log(this.modal, 'clicked');
    this.modal.classList.add('active');
    this.addListeners();
    this.focusTrap();

    // gsap.fromTo(
    //   this.modal,
    //   { display: "none", opacity: 0 },
    //   {
    //     display: "flex",
    //     opacity: 1,
    //     duration: 0.6,
    //     ease: "ease-in",
    //     onComplete: () => {
    //       this.addListeners();
    //       this.focusTrap();
    //     },
    //   }
    // );
  };

  show = () => {
    this.isBodyLocked ? this.bodyLocker(true) : null;

    this.modal.classList.add('active');

    // gsap.fromTo(
    //   this.modal,
    //   { display: "none", opacity: 0 },
    //   {
    //     display: "flex",
    //     opacity: 1,
    //     duration: 0.6,
    //     ease: "ease-in",
    //     onComplete: () => {
    //       this.addListeners();
    //       this.focusTrap();
    //     },
    //   }
    // );
  };

  init() {
    if (this.openers) {
      this.isInited = true;

      this.openers.forEach((opener) => {
        console.log(opener);
        opener.addEventListener("click", this.openModal);
      });
    } else {
      console.error(
        "Не добавлена кнопка открытия модального окна, либо в ней не прописан аттр-т: data-modal-anchor={modal-id} "
      );
    }
  }
}
