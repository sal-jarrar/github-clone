import { ListGroup } from "react-bootstrap";

interface RepoProps {
  key?: number;
  name: string | null;
}

const Repository = ({ name }: RepoProps) => (
  <ListGroup>
    <ListGroup.Item>
      <h6>{name}</h6>
    </ListGroup.Item>
  </ListGroup>
);

export default Repository;
