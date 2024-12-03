import { Modal } from "../classes/Modal";

const modals = document.querySelectorAll(".modal");


if (modals) {
  modals.forEach((modal) => {
    console.log(modal);
    new Modal(modal);
  });
}
