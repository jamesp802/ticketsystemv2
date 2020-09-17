import React from "react";

import { ListGroup } from "react-bootstrap";

const MemberList = ({ members }) => {
  let users = [];
  for (let id in members) {
    users.push(members[id]);
  }

  return (
    <div>
      <ListGroup>
        {users.map((user, index) => {
          return <ListGroup.Item key={index}>{user.username}</ListGroup.Item>;
        })}
      </ListGroup>
    </div>
  );
};

export default MemberList;
