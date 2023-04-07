import React from "react";
import { Col, Row } from "react-bootstrap";
import RepoChart from "./RepoChart";
import Paginate from "./Paginate";
import { Repository as RepositoryType } from "../types";
import Repository from "./Repository";
import Tab from "./Tab";

interface IRepositories {
  totalCount: number;
  page: number;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  repositories: RepositoryType[];
}

const Repositories = ({
  repositories,
  totalCount,
  page,
  setPage,
  setType,
  setSort,
}: IRepositories) => {
  return (
    <div className="mt-3">
      <Tab totalCount={totalCount} setSort={setSort} setType={setType} />
      <Row className="d-flex justify-content-center align-items-center">
        <Col className="" lg={6}>
          {repositories.map(({ name, id }) => (
            <Repository key={id} name={name} />
          ))}
        </Col>
        <Col className="" lg={6}>
          <RepoChart repositories={repositories} />
        </Col>
      </Row>
      <Paginate totalCount={totalCount} setPage={setPage} page={page} />
    </div>
  );
};

export default Repositories;
