import { useState } from "react";
import { FetchState, Repository } from "../types";
import axios, { AxiosError } from "axios";

const BASE_URL = "https://api.github.com";

/* 
 The useRepositories hook takes in two parameters: username,
 which is the GitHub username of the user or organization whose repositories are to be fetched,
 and page, which is the current page number of the fetched repositories.
*/

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
      //first sets the fetch state to "LOADING"
      setFetchState(FetchState.LOADING);

      // fetch the total count of the user's repositories
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

      //sets the fetch state to "SUCCESS"
      setFetchState(FetchState.SUCCESS);
    } catch (error) {
      // sets the fetch state to "ERROR"
      setFetchState(FetchState.ERROR);

      // handle Errors
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
  // The reset function is a helper function that resets all the state variables to their initial values.
  const reset = () => {
    setRepositories([]);
    setTotalCount(0);
    setFetchState(FetchState.DEFAULT);
    setError(null);
  };

  // The hook returns an object containing all the state variables and functions that can be used by the consuming component to manage the fetched repositories data.
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
