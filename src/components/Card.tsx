import styled from 'styled-components';

const CardContainer = styled.div<{ height: string; width: string }>`
  border-radius: 4px;
  border: 1px soild grey;
  background: grey;

  height: ${(props) => (props.height ? props.height : '')};
  width: ${(props) => (props.width ? props.width : '')};
`;

export type CardProps = {
  width: string;
  height: string;
  children?: React.ReactNode;
};

export const Card = (props: CardProps) => {
  return (
    <CardContainer width={props.width} height={props.height}>
      {props.children}
    </CardContainer>
  );
};
