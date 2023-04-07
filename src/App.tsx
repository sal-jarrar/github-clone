import { useEffect, useState } from "react";
import { Alert, Container, Row } from "react-bootstrap";
import SearchForm from "./components/SearchForm";
import Loading from "./components/Loading";
import { useRepositories } from "./hooks/useRepositories";
import { FetchState } from "./types";

import Repositories from "./components/Repositories";

const App = () => {
  const [username, setUsername] = useState("");
  const [page, setPage] = useState(0);
  const {
    fetchState,
    fetchRepositories,
    repositories,
    sort,
    setSort,
    type,
    setType,
    totalCount,
    reset,
    error,
  } = useRepositories(username, page);

  console.log(repositories);

  useEffect(() => {
    if (username) {
      fetchRepositories();
    }
    return () => reset();
  }, [page, sort, type]);

  return (
    <div>
      <h2 className="my-4 text-center">GitHub Clone</h2>
      <Container>
        {fetchState === FetchState.DEFAULT && (
          <Row className="mt-5">
            <p>
              Hello there, you can search for GitHub repositories by entering a
              username or organization name.
            </p>
          </Row>
        )}
        <SearchForm
          username={username}
          setUsername={setUsername}
          reset={reset}
          fetchRepositories={fetchRepositories}
          setPage={setPage}
        />
        {fetchState === FetchState.ERROR && (
          <Alert data-testid="alert" className="my-5" variant="danger">
            {error}!
          </Alert>
        )}
        {fetchState === FetchState.LOADING && (
          <Row className="d-flex justify-content-center mt-5">
            <Loading />
          </Row>
        )}
        <Row>
          {fetchState === FetchState.SUCCESS && (
            <Repositories
              repositories={repositories}
              totalCount={totalCount}
              page={page}
              setPage={setPage}
              setType={setType}
              setSort={setSort}
            />
          )}
        </Row>
      </Container>
    </div>
  );
};

export default App;
