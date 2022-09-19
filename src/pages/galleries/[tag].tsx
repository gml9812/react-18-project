import { Suspense, useEffect, useState, useCallback } from 'react';
import { fetcher } from 'src/api/fetcher';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Masonry, Card, LazyLoadImage, ProgressiveImage } from 'src/components';
import useSWRInfinite from 'swr/infinite'; ////
import { useIntersect } from 'src/hooks/useIntersect';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function GalleryPage() {
  const router = useRouter();

  const setSelectedTag = (tag: string) => {
    router.push(`/galleries/${tag}`);
  };

  return (
    <>
      {typeof router.query.tag === 'string' && (
        <>
          <TagSelector
            selectedTag={router.query.tag}
            setSelectedTag={setSelectedTag}
          />
          <Suspense fallback={<div>loading</div>}>
            <ImageList selectedTag={router.query.tag} />
          </Suspense>
        </>
      )}
    </>
  );
}

interface TagSelectorProps {
  selectedTag: string;
  setSelectedTag: (tag: string) => void;
}

const TagSelectorItem = styled.div<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? 'blue' : 'yellow')};
  width: 200px;
  height: 80px;
  border: 1px solid black;
  font-size: 20px;
`;

const TagSelector = (props: TagSelectorProps) => {
  const tagList = [
    '뉴욕',
    '런던',
    '도쿄',
    '파리',
    '베이징',
    '홍콩',
    '싱가포르',
  ];

  return (
    <Swiper
      slidesPerView={7}
      spaceBetween={10}
      loop={true}
      navigation={true}
      slideToClickedSlide={true}
      centeredSlides={true}
      modules={[Navigation]}
      threshold={10}
      onSlideChange={(swiper) =>
        props.setSelectedTag(tagList[swiper.realIndex])
      }
      className="mySwiper"
    >
      {tagList.map((tag) => {
        return (
          <SwiperSlide key={tag}>
            <TagSelectorItem
              isSelected={props.selectedTag === tag}
              onClick={() => props.setSelectedTag(tag)}
            >
              {tag}
            </TagSelectorItem>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

const SwiperTabContainer = styled.div``;

const SwiperTab = () => {
  return <SwiperTabContainer></SwiperTabContainer>;
};

interface ImageListProps {
  selectedTag: string;
}

const Observer = styled.div`
  height: 1px;
`;

const ImageList = (props: ImageListProps) => {
  const { data, error, mutate, size, setSize, isValidating } = useSWRInfinite(
    (index) => [
      `http://localhost:3000/search/image/?query=${encodeURIComponent(
        props.selectedTag,
      )}&display=100&start=${1 + 100 * index}&sort=sim`,
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

  const ref = useIntersect(
    useCallback(() => {
      if (/*hasNextPage &&*/ !isValidating) {
        setSize((size) => size + 1);
      }
    }, [setSize, isValidating]),
  );

  return (
    <>
      <Masonry>
        {data !== undefined &&
          data.map((dt) => {
            return dt.items.map((image: any, idx: number) => {
              return (
                <Card
                  key={idx}
                  width={'100%'}
                  name={
                    image.title.length > 25
                      ? `${image.title.slice(0, 25)}...`
                      : image.title
                  }
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
                  {/*
                <ProgressiveImage
                  loading="lazy"
                  key={idx}
                  src={image.link}
                  placeholderSrc={image.thumbnail}
                  alt={''}
                  height={'100%'}
                  width={'100%'}
                />
          */}
                </Card>
              );
            });
          })}
      </Masonry>
      <Observer ref={ref} />
    </>
  );
};
