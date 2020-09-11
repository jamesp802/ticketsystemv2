import React from "react";

class NewProject extends React.Component {
  state = {};

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState(
      {
        [id]: value,
      },
      console.log(this.state)
    );
  };

  handleSubmit = () => {};

  render = () => {};
}
