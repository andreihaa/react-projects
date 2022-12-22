import { Fragment } from "react";
import "./Modal.css";

const Backdrop = (props) => {
  return (
    <div className="backdrop" onClick={props.onClose}></div>
  );
};

const ModalOverlay = (props) => {
  return (
    <div className="modal">
      <div className="content">{props.children}</div>
    </div>
  );
};

const Modal = (props) => {
  return (
    <Fragment>
      <Backdrop onClose={props.onClose} />
      <ModalOverlay>{props.children}</ModalOverlay>
    </Fragment>
  );
};

export default Modal;
