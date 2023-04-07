import { renderHook, waitFor } from "@testing-library/react";
import { useRepositories } from "./useRepositories";
import { FetchState } from "../types";
import axios from "axios";
import { act } from "react-dom/test-utils";

describe("useRepositories hooks utilities", () => {
  const username = "test";
  const page = 0;
  const BASE_URL = "https://api.github.com";
  const renderCustomHook = () =>
    renderHook(() => useRepositories(username, page));
  it("should return initial value", () => {
    const { result } = renderCustomHook();
    const { fetchState, repositories, totalCount, type, sort, error } =
      result.current;
    expect(repositories).toEqual([]);
    expect(fetchState).toBe(FetchState.DEFAULT);
    expect(totalCount).toBe(0);
    expect(error).toBe(undefined);
    expect(sort).toBe("");
    expect(type).toBe("");
  });
  it("should have expected endpoint on api call", async () => {
    const axiosGetSpy = jest
      .spyOn(axios, "get")
      .mockResolvedValue({ data: [] });
    const { result } = renderCustomHook();
    const { fetchRepositories } = result.current;
    await act(async () => await fetchRepositories());
    expect(axiosGetSpy).toBeCalledTimes(2);
    expect(axiosGetSpy).toBeCalledWith(
      `${BASE_URL}/search/repositories?q=user:${username}`
    );
  });
  it("should have expected state on api call", async () => {
    jest.spyOn(axios, "get").mockResolvedValue({ data: [] });
    const { result } = renderCustomHook();
    const { fetchRepositories } = result.current;

    act(() => {
      fetchRepositories();
    });

    await waitFor(() => {
      const { fetchState } = result.current;
      return fetchState === FetchState.SUCCESS;
    });

    const { repositories, fetchState } = result.current;

    expect(repositories).toEqual([]);
    expect(fetchState).toBe(FetchState.LOADING);
  });
  it("should have expected state on api error", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({ data: [] });
    const { result } = renderCustomHook();
    const { fetchRepositories } = result.current;
    await act(async () => await fetchRepositories());
    const { repositories, fetchState } = result.current;
    expect(repositories).toEqual([]);
    expect(fetchState).toBe(FetchState.ERROR);
  });
  it("should set error state when API rate limit is exceeded", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({ response: { status: 403 } });

    const { result } = renderCustomHook();
    const { fetchRepositories } = result.current;
    await act(async () => await fetchRepositories());
    const { repositories, fetchState } = result.current;
    expect(repositories).toEqual([]);
    expect(fetchState).toBe(FetchState.ERROR);
    expect(result.current.error).toBe(
      "API rate limit exceeded. Please try again later."
    );
  });
  it("should set error state when User or organization not found", async () => {
    jest.spyOn(axios, "get").mockRejectedValue({ response: { status: 422 } });

    const { result } = renderCustomHook();
    const { fetchRepositories } = result.current;
    await act(async () => await fetchRepositories());
    const { repositories, fetchState } = result.current;
    expect(repositories).toEqual([]);
    expect(fetchState).toBe(FetchState.ERROR);
    expect(result.current.error).toBe("User or organization not found");
  });
});
