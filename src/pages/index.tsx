import { Suspense, useState } from 'react';
import useSWR from 'swr';
import { fetcher } from 'src/api/fetcher';
import { Masonry, Card, LazyLoadImage } from 'src/components';
import styled from 'styled-components';

export default function Home() {
  const tagList = ['빨강', '주황', '노랑', '초록', '파랑', '흰색'];
  const [selectedTag, setSelectedTag] = useState('빨강');

  return (
    <>
      <TagSelector
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        tagList={tagList}
      />
      <Suspense fallback={<div>loading</div>}>
        <ImageList selectedTag={selectedTag} />
      </Suspense>
    </>
  );
}

interface TagSelectorProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
  tagList: string[];
}

const TagSelectorContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TagSelectorItem = styled.div`
  background-color: yellow;
  margin-left: 10px;
  font-size: 20px;
`;

const TagSelector = (props: TagSelectorProps) => {
  return (
    <TagSelectorContainer>
      {props.tagList.map((tag) => {
        return (
          <TagSelectorItem onClick={() => props.setSelectedTag(tag)}>
            {tag}
          </TagSelectorItem>
        );
      })}
    </TagSelectorContainer>
  );
};

interface ImageListProps {
  selectedTag: string;
}

const ImageList = (props: ImageListProps) => {
  const imageList = useSWR(
    [
      `http://localhost:3000/search/image/?query=${encodeURIComponent(
        props.selectedTag,
      )}&display=100&start=1&sort=sim`,
      {
        method: 'GET',
        headers: {
          'X-Naver-Client-Id': '032iDWACf7DFLI4vtkDA',
          'X-Naver-Client-Secret': 'IHRbgFg13H',
        },
      },
    ],
    fetcher,
    { suspense: true },
  );

  return (
    <Masonry>
      {imageList.data.items.map((image: any, idx: number) => {
        return (
          <Card
            height={`${parseInt(image.sizeheight) / 10}px`}
            width={`${(Math.min(parseInt(image.sizewidth) / 10), 250)}px`}
          >
            {
              <LazyLoadImage
                src={image.link}
                alt={''}
                height={'100%'}
                width={'100%'}
                lazy={true}
                key={idx}
              />
            }
          </Card>
        );
      })}
    </Masonry>
  );
};

/*
const ImageListLoading = () => {
  return (
    <Masonry>
      {Array(100)
        .fill(true)
        .map(() => {
          return <Card />;
        })}
    </Masonry>
  );
};
*/
