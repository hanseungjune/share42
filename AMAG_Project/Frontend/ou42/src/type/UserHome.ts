export interface Props {
  fetchNextPage: any;
  data: any;
  hasNextPage: boolean;
  refetch: any;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Data {
  category: string;
  content: string;
  hits: number;
  id: number;
  img: string;
  likeCount: null | number;
  name: string;
  nickname: string;
  sharePrice: number;
  shareStatus: number;
  uptDt: string;
  userId: string;
  likeCheck: null | number;
  recommendation?: boolean;
}
