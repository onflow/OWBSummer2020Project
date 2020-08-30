import React, { useState, useRef } from "react";
import styled from "@emotion/styled";
import { Manager, Reference, Popper } from "react-popper";
import { LILAC, WHITE } from "../../../../style/colors";

const Arrow = styled("div")`
  position: absolute;
  width: 3em;
  height: 3em;
  &[data-placement*="bottom"] {
    top: 0;
    left: 0;
    margin-top: -9px;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 0 10px 10px 10px;
      border-color: transparent transparent ${LILAC} transparent;
    }
    &::after {
      border-width: 0 9px 9px 9px;
      border-color: transparent transparent ${WHITE} transparent;
    }
  }
  &[data-placement*="top"] {
    bottom: 0;
    left: 0;
    margin-bottom: -15px;
    width: 3em;
    height: 1em;
    &::before {
      border-width: 10px 10px 0 10px;
      border-color: ${LILAC} transparent transparent transparent;
    }
    &::after {
      margin-top: -1px;
      border-width: 9px 9px 0 9px;
      border-color: ${WHITE} transparent transparent transparent;
    }
  }
  &[data-placement*="right"] {
    left: 0;
    margin-left: -9px;
    height: 1.5em;
    width: 0.5em;
    &::before {
      border-width: 10px 10px 10px 0;
      border-color: transparent ${LILAC} transparent transparent;
    }
    &::after {
      border-width: 9px 9px 9px 0;
      border-color: transparent ${WHITE} transparent transparent;
    }
  }
  &[data-placement*="left"] {
    right: 0;
    margin-right: -15px;
    height: 3em;
    width: 1em;
    &::before {
      border-width: 10px 0 10px 10px;
      border-color: transparent transparent transparent ${LILAC};
    }
    &::after {
      margin-left: 0;
      border-width: 9px 0 9px 9px;
      border-color: transparent transparent transparent ${WHITE};
    }
  }
  &::before {
    content: "";
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
  }
  &::after {
    content: "";
    margin: auto;
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin-left: 1px;
    margin-top: 1px;
  }
`;

const ContentWrapper = styled("div")({
  border: `1px solid ${LILAC}`,
  backgroundColor: WHITE,
  borderRadius: 5,
});

const TOP = "top";
const RIGHT = "right";
export const BOTTOM = "bottom";
const LEFT = "left";
const AUTO = "auto";
const OFFSET = 15;
const ARROW_OFFSET = 10;

const Container = styled("div")({});

const Popover = ({ anchor, content, position = AUTO }) => {
  const containerRef = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const addOutsideClickHandler = () => {
    document.addEventListener("click", handleOutsideClick);
  };

  const removeOutsideClickHandler = () => {
    document.removeEventListener("click", handleOutsideClick);
  };
  const handleClick = () => {
    setIsOpen(!isOpen);
    addOutsideClickHandler();
  };

  const handleOutsideClick = (event) => {
    if (
      containerRef &&
      containerRef.current &&
      !containerRef.current.contains(event.target)
    ) {
      setIsOpen(false);
      removeOutsideClickHandler();
    }
  };

  return (
    <Container ref={containerRef} isOpen={isOpen}>
      <Manager>
        <Reference>
          {({ ref }) => (
            <div ref={ref} onClick={handleClick}>
              {anchor}
            </div>
          )}
        </Reference>
        {isOpen && (
          <Popper
            placement={position}
            modifiers={{
              addMargin: {
                order: 1,
                enabled: true,
                function: (data) => {
                  const {
                    placement,
                    offsets: { popper },
                  } = data;
                  switch (placement) {
                    case TOP:
                      popper[TOP] -= OFFSET;
                      break;
                    case RIGHT:
                      popper[LEFT] += OFFSET;
                      break;
                    case BOTTOM:
                      popper[TOP] += OFFSET;
                      popper[LEFT] -= 20;
                      break;
                    case LEFT:
                      popper[LEFT] -= OFFSET;
                      break;
                    default:
                      break;
                  }
                  data.offsets.popper = popper;
                  return data;
                },
              },
            }}
          >
            {({ ref, style, placement, arrowProps }) => {
              if ([TOP, BOTTOM].includes(placement)) {
                {
                  /* arrowProps.style.left += ARROW_OFFSET; */
                }
              } else if (placement === LEFT) {
                {
                  /* arrowProps.style.top += ARROW_OFFSET; */
                }
              }
              return (
                <div
                  ref={ref}
                  style={{ zIndex: 999, ...style }}
                  data-placement={placement}
                >
                  <Arrow
                    ref={arrowProps.ref}
                    data-placement={placement}
                    style={arrowProps.style}
                  />
                  <ContentWrapper>{content}</ContentWrapper>
                </div>
              );
            }}
          </Popper>
        )}
      </Manager>
    </Container>
  );
};

export default Popover;
