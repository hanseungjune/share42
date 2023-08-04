/* eslint-disable max-len */
import axios from "axios";
import { useCallback, useState } from "react";

export type PostType = {
  id: number;
  category: string;
  title: string;
  content: string;
  region: string;
  date: Date;
  hit: number;
  commentCount: number;
  userId?: string | undefined;
};

export interface OrderState {
  [key: string]: "asc" | "desc";
}

export type SortCategories = "recent" | "popular" | "news" | "need" | "share";

const HTTPS_URL = process.env.REACT_APP_API_MAIN_KEY;
const useLoadPosts = (sort: string, order: OrderState, search: string) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadMore = useCallback(async () => {
    if (!hasMore) return;

    const nextPage = page + 1;
    let response: any;

    if (search) {
      response = await axios.get(
        `${HTTPS_URL}/posts?page=${page}&sort=${sort}&order=${order[sort]}&search=${search}`
      );
    } else {
      response = await axios.get(
        `${HTTPS_URL}/posts?page=${page}&sort=${sort}&order=${order[sort]}`
      );
    }
    console.log(
      `${HTTPS_URL}/posts?page=${page}&sort=${sort}&order=${order[sort]}&search=${search}`
    );
    setPosts((prev) => [...prev, ...response.data]);

    if (response.data.length === 0) {
      setHasMore(false);
    } else {
      setPage(nextPage);
    }
  }, [page, hasMore, sort, order, search]);

  return { posts, loadMore, setPosts, setPage, setHasMore };
};

export default useLoadPosts;
