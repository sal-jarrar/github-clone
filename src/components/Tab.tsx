import { Form, Image, Nav } from "react-bootstrap";

interface ITabProps {
  totalCount: number;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  setType: React.Dispatch<React.SetStateAction<string>>;
}

function Tab({ totalCount, setType, setSort }: ITabProps) {
  return (
    <Nav fill className="d-flex justify-content-center align-items-center mb-3">
      <Nav.Item>
        <Form.Select size="sm" onChange={(e) => setSort(e.target.value)}>
          <option>Sort</option>
          <option value="name">Name</option>
          <option value="updated">Updated</option>
          <option value="created">Created</option>
          <option value="pushed">Pushed</option>
        </Form.Select>
      </Nav.Item>
      <Nav.Item>
        <Form.Select size="sm" onChange={(e) => setType(e.target.value)}>
          <option>Type</option>
          <option value="all">All</option>
          <option value="owner">Owner</option>
          <option value="member">Member</option>
        </Form.Select>
      </Nav.Item>
    </Nav>
  );
}

export default Tab;
