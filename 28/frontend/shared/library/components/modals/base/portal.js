import React, { useRef, useEffect } from "react";
import { Container, Main, Aside } from "../../layout";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

export const TOP = "top";
export const CENTER = "center";

const Layout = styled.div(
  {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
    zIndex: 1001,
    background: "rgba(1, 1, 1, 0.5)",
    overflow: "auto"
  },
  ({ position }) => ({
    alignItems: position === TOP ? "flex-start" : CENTER,
    paddingTop: position === TOP ? 100 : 0
  })
);

const StyledContainer = styled(Container)({});

const Modal = styled.div({});

const Portal = ({ children, onDismiss, position, preventClickAway, width }) => {
  const modal = useRef();
  const layout = useRef();

  const handleLayoutClick = e => {
    if (preventClickAway) {
      return;
    }
    if (!modal.current.contains(e.target)) {
      onDismiss();
    }
  };

  useEffect(() => {
    disableBodyScroll();
    return () => enableBodyScroll();
  }, []);

  return (
    <Layout
      data-portal
      ref={layout}
      position={position}
      onClick={handleLayoutClick}
    >
      <Modal
        ref={modal}
        style={{
          marginBottom: 20,
          width,
          maxWidth: "1100px"
        }}
      >
        {React.cloneElement(children, { onDismiss })}
      </Modal>
    </Layout>
  );
};

Portal.propTypes = {
  children: PropTypes.element.isRequired,
  onDismiss: PropTypes.func,
  position: PropTypes.oneOf([TOP, CENTER]),
  preventClickAway: PropTypes.bool
};

Portal.defaultProps = {
  position: CENTER,
  preventClickAway: false
};

export function withPortal(ModalComponent) {
  return function ModalWithPortal({
    onDismiss,
    preventClickAway,
    position,
    width,
    ...props
  }) {
    return ReactDOM.createPortal(
      <Portal
        onDismiss={onDismiss}
        position={position}
        width={width}
        preventClickAway={preventClickAway}
      >
        <ModalComponent {...props} />
      </Portal>,
      document.body
    );
  };
}
