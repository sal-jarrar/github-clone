import axios, { AxiosError } from "axios";

const BASE_URL = "https://api.github.com";

interface RepoParams {
  username: string;
  page: number;
  sort: string;
  type: string;
  setError: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

const fetchRepositories = async ({
  username,
  page,
  sort,
  type,
  setError,
}: RepoParams) => {
  console.log(type);
  try {
    // const response = await axios.get(
    //   `${BASE_URL}/search/repositories?q=user:${username}&sort=${sort}&type=${type}&page=${
    //     page + 1
    //   }&per_page=10&order=${sort === "name" ? "asc" : "desc"}`
    // );
    const userInfo = await axios.get(
      `${BASE_URL}/search/repositories?q=user:${username}`
    );

    // console.log(userInfo.data);

    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=${sort}&type=${type}&page=${
        page + 1
      }&per_page=10`
    );

    const data = await response.data;
    const totalCount = userInfo.data.total_count;
    const totalPages = Math.ceil(totalCount / 10);
    console.log("totalCount :>> ", totalPages);
    return {
      repositories: data,
      totalCount,
      totalPages,
    };
  } catch (error) {
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

export default fetchRepositories;
