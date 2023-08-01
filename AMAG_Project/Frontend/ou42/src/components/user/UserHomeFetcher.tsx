/* eslint-disable max-len */
import React, {
  useState,
  useEffect,
  useLayoutEffect,
  cloneElement,
} from "react";
import { TokenStorage } from "../../hooks/tokenStorage";
import homeStore from "../../store/homeStore";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { L, pipe, takeAll } from "../../custom/FxJS";

const tokenStorage = new TokenStorage();
const HTTPS_URL = process.env.REACT_APP_API_MAIN_KEY;
const TOKEN = tokenStorage.getToken();

type Location = {
  latitude: number;
  longitude: number;
};

export interface UserHomeFetcherProps {
  children: React.PropsWithChildren<React.ReactElement>;
  sortNum: number;
}

export function UserHomeFetcher({ children, sortNum }: UserHomeFetcherProps) {
  const [location, setLocation] = useState<Location>({
    latitude: 36.107157,
    longitude: 128.418008,
  });
  const { search, setSearch } = homeStore();
  const queryClient = useQueryClient();

  // 현재 위치를 받는 API 함수
  const locationAPI = () => {
    return axios({
      method: "get",
      url: `${HTTPS_URL}/address/reverse-geo/${location.latitude}/${location.longitude}`,
    });
  };

  const { data: address } = useQuery(["get-current-location"], locationAPI, {
    select: (data) => {
      if (data.data.message) {
        const { region_2depth_name, region_3depth_name } = data.data.message;
        return [region_2depth_name, region_3depth_name];
      }
    },

    onSuccess: (data) => {
      if (data?.length) {
        const getListFnc = ({ pageParam = 1 }) => {
          return axios({
            method: "get",
            url: `${HTTPS_URL}/user/share/share-articles/search`,
            params: {
              page: pageParam,
              size: 8,
              orderStandard: sortNum,
              sigungu: data[0],
              dong: data[1],
              query: search,
              lat: location.latitude,
              lng: location.longitude,
            },
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });
        };

        queryClient.prefetchInfiniteQuery(["get-object-list"], getListFnc);
      }
    },
  });

  const getListFnc = ({ pageParam = 1 }) => {
    return axios({
      method: "get",
      url: `${HTTPS_URL}/user/share/share-articles/search`,
      params: {
        page: pageParam,
        size: 8,
        orderStandard: sortNum,
        sigungu: address?.length ? address[0] : "",
        dong: address?.length ? address[1] : "",
        query: search,
        lat: location.latitude,
        lng: location.longitude,
      },
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    });
  };

  const { fetchNextPage, data, hasNextPage } = useInfiniteQuery(
    ["get-object-list"],
    getListFnc,
    {
      getNextPageParam: (lastPage, allPage) => {
        console.log("lastPage" + lastPage, "allPage: " + allPage)
        if (allPage[0].data.message.article.totalPages > allPage.length) {
          return allPage.length + 1;
        }
      },
      select: (data) => {
        const newData = pipe(L.map, L.flatten, takeAll);
        let recommendation = [];
        if (data.pages.length) {
          recommendation = data.pages[0].data.message.CFRecommendation;
        }
        return {
          pages: recommendation?.length
            ? [
                ...recommendation,
                ...newData(
                  (arr: any) => arr.data.message.article.content,
                  data.pages
                ),
              ]
            : [
                ...newData(
                  (arr: any) => arr.data.message.article.content,
                  data.pages
                ),
              ],
          pageParams: data.pageParams,
        };
      },
      enabled: !!address?.length,
    }
  );

  useEffect(() => {
    if (location.latitude && location.longitude && address) {
      const getListFnc = ({ pageParam = 1 }) => {
        return axios({
          method: "get",
          url: `${HTTPS_URL}/user/share/share-articles/search`,
          params: {
            page: pageParam,
            size: 8,
            orderStandard: sortNum,
            sigungu: address[0],
            dong: address[1],
            query: search,
            lat: location.latitude,
            lng: location.longitude,
          },
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });
      };

      queryClient.prefetchInfiniteQuery(["get-object-list"], getListFnc);
    }
  }, [sortNum]);

  useLayoutEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (props) => {
          const API = () => {
            return axios({
              method: "get",
              url: `${HTTPS_URL}/common/address/reverse-geo/${props.coords.latitude}/${props.coords.longitude}`,
            });
          };

          queryClient.prefetchQuery(["get-current-location"], API);
          setLocation((location) => {
            return {
              latitude: props.coords.latitude,
              longitude: props.coords.longitude,
            };
          });
        },
        null,
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    }
  }, []);

  return cloneElement(children, { fetchNextPage, data, hasNextPage });
}
