import { useState } from "react";
import { FetchState, Repository } from "../types";
import axios, { AxiosError } from "axios";

const BASE_URL = "https://api.github.com";

export function useRepositories(username: string, page: number) {
  const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [sort, setSort] = useState("");
  const [type, setType] = useState("");
  const [error, setError] = useState<string | null>();

  const fetchRepositories = async () => {
    try {
      console.log("start");

      setFetchState(FetchState.LOADING);
      const userInfo = await axios.get(
        `${BASE_URL}/search/repositories?q=user:${username}`
      );

      const response = await axios.get(
        `${BASE_URL}/users/${username}/repos?sort=${sort}&type=${type}&page=${
          page + 1
        }&per_page=10`
      );

      const data = (await response.data) as Array<Repository>;
      setRepositories(data);
      setTotalCount(userInfo.data.total_count);
      setFetchState(FetchState.SUCCESS);
    } catch (error) {
      setFetchState(FetchState.ERROR);
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 403) {
        setError("API rate limit exceeded. Please try again later.");
      } else if (axiosError.response?.status === 422) {
        setError("User or organization not found");
      } else {
        setError("Failed to retrieve repositories");
      }
    }
  };

  const reset = () => {
    setRepositories([]);
    setTotalCount(0);
    setFetchState(FetchState.DEFAULT);
    setError(null);
  };
  return {
    fetchState,
    fetchRepositories,
    repositories,
    totalCount,
    setTotalCount,
    type,
    setType,
    sort,
    setSort,
    reset,
    error,
  };
}
