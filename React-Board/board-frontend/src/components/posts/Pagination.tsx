import React from 'react';
import styled from 'styled-components';
import qs from 'qs';

import Button from '../common/Button';

const PaginationBlock = styled.div`
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-bottom: 3rem;
`;

const PageNumber = styled.div``;

type buildLinkProps = {
  username: string;
  tag: string;
  page: number;
};
function buildLink({ username, tag, page }: buildLinkProps) {
  const query = qs.stringify({ tag, page });
  return username ? `/@${username}?${query}` : `/?${query}`;
}

type PaginationProps = {
  page: number;
  lastPage: number;
  username: string;
  tag: string;
};
function Pagination({ page, lastPage, username, tag }: PaginationProps) {
  return (
    <PaginationBlock>
      <Button
        disabled={page === 1}
        to={
          page === 1 ? undefined : buildLink({ username, tag, page: page - 1 })
        }
      >
        이전
      </Button>
      <PageNumber>{page}</PageNumber>
      <Button
        disabled={page === lastPage}
        to={
          page === lastPage
            ? undefined
            : buildLink({ username, tag, page: page + 1 })
        }
      >
        다음
      </Button>
    </PaginationBlock>
  );
}

export default Pagination;
