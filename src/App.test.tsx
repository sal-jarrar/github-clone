import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import SearchForm from "./components/SearchForm";
import userEvent from "@testing-library/user-event";
import * as apiHooks from "./hooks/useRepositories";
import { FetchState } from "./types";
import Tab from "./components/Tab";

// test("initial state", () => {
//   render(<App />);
//   expect(screen.getByRole("textbox")).toHaveValue("");
//   expect(screen.queryAllByRole("listitem")).toHaveLength(0);
//   expect(
//     screen.queryByText("Failed to retrieve repositories.")
//   ).not.toBeInTheDocument();
// });

// test("handleInputChange", () => {
//   render(<App />);
//   const input = screen.getByRole("textbox");
//   fireEvent.change(input, { target: { value: "testuser" } });
//   expect(input).toHaveValue("testuser");
// });

// test("search button triggers handleSubmit", async () => {
//   render(<App />);
//   const input = screen.getByRole("textbox");
//   const button = screen.getByRole("button");
//   fireEvent.change(input, { target: { value: "test" } });
//   fireEvent.click(button);

//   await waitFor(() => {
//     const heading = screen.getByRole("heading", { name: "4 repositories" });
//     expect(heading).toHaveTextContent("4 repositories");
//   });
// });

// test("display error message when user not found", async () => {
//   render(<App />);
//   const handleSubmit = jest.fn().mockRejectedValueOnce({
//     username: "invalid-username",
//     type: "",
//     sort: "",
//     page: 0,
//     setError: expect.any(Function),
//   });

//   const input = screen.getByRole("textbox");
//   const button = screen.getByRole("button");
//   userEvent.type(input, "invalid-username");
//   userEvent.click(button);

//   // await screen.findByText();
//   expect(
//     await screen.findByText("User or organization not found!")
//   ).toBeVisible();
// });

// test("handleSubmit - valid username", async () => {
//   // const handleSubmit = mockAxios.get.moc

//   render(<App />);

//   const input = screen.getByRole("textbox");

//   const button = screen.getByRole("button");

//   fireEvent.change(input, { target: { value: "freeCodeCamp" } });

//   fireEvent.click(button);

//   // await waitFor(() => expect(fetchRepositories).toBeCalled());

//   // await waitFor(() =>
//   //   expect(handleSubmit).toHaveBeenCalledWith({
//   //     username: "test",
//   //     page: 0,
//   //     sort: "name",
//   //     type: "public",
//   //     setError: expect.any(Function),
//   //   })
//   // );
//   // console.log(screen.queryAllByRole("listgroup"));

//   // expect(screen.queryAllByRole("listitem")).toHaveLength(2);
//   await waitFor(() => {
//     const heading = screen.getByRole("heading", { name: "200 repositories" });
//     expect(heading).toHaveTextContent("200 repositories");
//   });
//   expect(
//     screen.queryByText("Failed to retrieve repositories.")
//   ).not.toBeInTheDocument();
// });

describe("<App/>", () => {
  const renderComponent = () => render(<App />);
  const defaultText =
    "Hello there, you can search for GitHub repositories by entering a username or organization name.";
  const loadingText = "Loading...";
  const errText = "Failed to retrieve repositories!";

  it("should render default state", () => {
    renderComponent();
    const stateEl = screen.getByText(defaultText);
    expect(stateEl).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.queryAllByRole("listitem")).toHaveLength(0);
    expect(
      screen.queryByText("Failed to retrieve repositories.")
    ).not.toBeInTheDocument();
  });
  it("should render loading state on loading", () => {
    const fetchState = FetchState.LOADING;
    jest.spyOn(apiHooks, "useRepositories").mockReturnValue({
      repositories: [],
      fetchState,
      fetchRepositories: jest.fn(),
      setTotalCount: () => {},
      setType: () => {},
      setSort: () => {},
      sort: "",
      type: "",
      error: null,
      totalCount: 0,
      reset: () => {},
    });
    renderComponent();
    const stateEl = screen.getByText(loadingText);
    expect(stateEl).toBeInTheDocument();

    expect(
      screen.queryByText("Failed to retrieve repositories.")
    ).not.toBeInTheDocument();
  });
  it("should render error state on error", () => {
    const fetchState = FetchState.ERROR;
    jest.spyOn(apiHooks, "useRepositories").mockReturnValue({
      repositories: [],
      fetchState,
      fetchRepositories: jest.fn(),
      setTotalCount: () => {},
      setType: () => {},
      setSort: () => {},
      sort: "",
      type: "",
      error: "Failed to retrieve repositories",
      totalCount: 0,
      reset: () => {},
    });
    renderComponent();
    const stateEl = screen.getByText(errText);
    expect(stateEl).toBeInTheDocument();
  });
  it("should render success state on success", () => {
    const fetchState = FetchState.SUCCESS;
    const repositories = [
      {
        id: 1,
        name: "Test Repository",
        created_at: "2011-01-26T19:06:43Z",
        updated_at: "2011-01-26T19:06:43Z",
      },
      {
        id: 2,
        name: "Test Repository 2",
        created_at: "2011-02-26T19:06:43Z",
        updated_at: "2011-02-26T19:06:43Z",
      },
    ];
    jest.spyOn(apiHooks, "useRepositories").mockReturnValue({
      repositories,
      fetchState,
      fetchRepositories: jest.fn(),
      setTotalCount: () => {},
      setType: () => {},
      setSort: () => {},
      sort: "",
      type: "",
      error: null,
      totalCount: 2,
      reset: () => {},
    });
    renderComponent();
    // const stateEl = screen.getByTestId("success");
    const repositoryTxt = screen.getByText(repositories[0].name);
    // expect(stateEl).toBeInTheDocument();
    expect(repositoryTxt).toBeInTheDocument();
  });
});

describe("SearchForm component", () => {
  it("should render without errors", () => {
    render(
      <SearchForm
        username=""
        setUsername={() => {}}
        setPage={() => {}}
        fetchRepositories={() => Promise.resolve()}
        reset={() => {}}
      />
    );
    expect(
      screen.getByLabelText("Username or Organization")
    ).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("should call fetchRepositories when form is submitted with a valid username", async () => {
    const fetchRepositoriesMock = jest.fn().mockResolvedValueOnce(undefined);
    render(
      <SearchForm
        username="test"
        setUsername={() => {}}
        setPage={() => {}}
        fetchRepositories={fetchRepositoriesMock}
        reset={() => {}}
      />
    );
    const input = screen.getByLabelText("Username or Organization");
    const submitButton = screen.getByText("Submit");

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(submitButton);

    expect(fetchRepositoriesMock).toHaveBeenCalled();
  });

  it("should show validation error message when form is submitted with an empty username", async () => {
    const fetchRepositoriesMock = jest.fn().mockResolvedValueOnce(undefined);
    render(
      <SearchForm
        username=""
        setUsername={() => {}}
        setPage={() => {}}
        fetchRepositories={fetchRepositoriesMock}
        reset={() => {}}
      />
    );
    const submitButton = screen.getByText("Submit");

    fireEvent.click(submitButton);

    expect(
      screen.getByText("Please provide a valid username")
    ).toBeInTheDocument();
  });
  it("should call handleInputChange on input change", () => {
    const setUsername = jest.fn();

    const componentProps = {
      username: "",
      setUsername,
      setPage: jest.fn(),
      fetchRepositories: jest.fn(),
      reset: jest.fn(),
    };
    render(<SearchForm {...componentProps} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "test" } });
    expect(setUsername).toHaveBeenCalledWith("test");
  });
});
