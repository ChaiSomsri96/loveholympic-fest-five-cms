/**
 *
 * RenderEffect
 *
 */
import { CommentIcon, LikeIcon, ViewIcon } from 'app/components/Icons';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';

interface Props {
  cell: any;
}

export const RenderEffect = memo((props: Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const { cell } = props;
  const {
    data,
    row: { id },
  } = cell;
  return (
    <Div>
      <a>
        <ViewIcon /> <span> {data[id].totalView} </span>
      </a>
      <a>
        <LikeIcon /> <span> {data[id].totalLike} </span>
      </a>
      <a>
        <CommentIcon /> <span> {data[id].totalComment} </span>
      </a>
    </Div>
  );
});

const Div = styled.div`
  display: flex;

  a {
    width: 30%;
  }
`;
