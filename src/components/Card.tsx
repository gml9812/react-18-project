import styled from 'styled-components';
import { useState } from 'react';

const CardContainer = styled.div<{ width: string }>`
  position: relative;
  border-radius: 4px;
  background: grey;
  overflow: hidden;
  border: 1px solid grey;

  aspect-ratio: 133 / 104;
  width: ${(props) => (props.width ? props.width : '')};
`;

const SaveButtonArea = styled.div<{ isHovering: boolean }>`
  opacity: ${(props) => (props.isHovering ? '1' : '0')};
  left: 0;
  max-width: 50%;
  position: absolute;1
  top: 0;
  z-index: 4;
`;

const SaveButton = styled.button`
  backdrop-filter: blur(5px);
  height: 32px;
  margin-left: 10px;
  margin-top: 10px;

  background: rgba(25, 25, 25, 0.65);
  border-color: transparent;
  color: #fff;

  border-radius: 3px;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 2;

  padding: 6px 12px;
`;

const NameArea = styled.div<{ isHovering: boolean }>`
  opacity: ${(props) => (props.isHovering ? '1' : '0')};
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Name = styled.div`
  margin: 30px 15px 10px 15px;
  line-height: 1.3;
  font-size: 16px;
  font-weight: 700;
`;

export type CardProps = {
  width: string;
  name: string;
  children?: React.ReactNode;
};

export const Card = (props: CardProps) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseHover = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <CardContainer
      width={props.width}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseLeave}
    >
      <SaveButtonArea isHovering={isHovering}>
        <SaveButton type="button">저장</SaveButton>
      </SaveButtonArea>
      {props.children}
      <NameArea isHovering={isHovering}>
        <Name>{props.name}</Name>
      </NameArea>
    </CardContainer>
  );
};
