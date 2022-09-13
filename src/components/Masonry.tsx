import React, { Children, useEffect, useState } from 'react';
import styled from 'styled-components';

const GridContainer = styled.div<{ isInvisible: boolean }>`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: 20px;

  display: ${(props) => (props.isInvisible ? 'none' : 'block')}

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
    SetGridItemHeight();
    setIsinvisible(false);
    window.addEventListener('resize', SetGridItemHeight);
  }, []);

  return (
    <GridContainer className="grid" isInvisible={isInvisible}>
      {Children.map(props.children, (child: React.ReactNode) => (
        <GridItem className="item">{child}</GridItem>
      ))}
    </GridContainer>
  );
};
