import React, { Children, useEffect, useState } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div<{ isInvisible: boolean }>`
  opacity: ${(props) => (props.isInvisible ? '0' : '1')};
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-auto-rows: 20px;

  padding: 5rem 0 5rem 0;
`;

const GridItem = styled.div``;

interface MasonryProps {
  children: React.ReactNode;
}

export const Masonry = (props: MasonryProps) => {
  const [isInvisible, setIsinvisible] = useState(true);

  function SetGridItemHeight() {
    let grid = document.getElementsByClassName('grid')[0];
    let rowHeight = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'),
    );
    let rowGap = parseInt(
      window.getComputedStyle(grid).getPropertyValue('grid-row-gap'),
    );

    let item = grid.getElementsByClassName(
      'item',
    ) as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < item.length; ++i) {
      item[i].style.gridRowEnd = `span ${Math.ceil(
        (item[i].children[0].scrollHeight + rowGap) / (rowHeight + rowGap),
      )}`;
    }
  }

  useEffect(() => {
    window.addEventListener('resize', SetGridItemHeight);
  }, []);

  useEffect(() => {
    SetGridItemHeight();
    setIsinvisible(false);
  }, [props.children]);

  return (
    <GridContainer className="grid" isInvisible={isInvisible}>
      {Children.map(props.children, (child: React.ReactNode) => (
        <GridItem className="item">{child}</GridItem>
      ))}
    </GridContainer>
  );
};
