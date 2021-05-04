import React from "react";
import { useSelector } from "react-redux";
import { withRouter, RouteComponentProps } from "react-router-dom";
import qs from "qs";

import Pagination from "../../components/posts/Pagination";
import { RootState } from "../../modules";

function PaginationContainer({ location }: RouteComponentProps) {
  const { lastPage, posts, loading } = useSelector(
    ({ posts, loading }: RootState) => ({
      lastPage: posts.lastPage,
      posts: posts.posts,
      loading: loading["posts/LIST_POSTS"],
    })
  );

  if (!posts || loading) return null;

  const { tag = "", username = "", page = "1" } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      tag={String(tag)}
      username={String(username)}
      page={parseInt(String(page), 10)}
      lastPage={lastPage}
    />
  );
}

export default withRouter(PaginationContainer);
