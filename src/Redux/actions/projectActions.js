import axios from "axios";

//FIXME: pass project id and update

const projectHelp = (projectId) => {
  return axios.get(`/api/projects/${projectId}`);
};

export const getProject = (projectId) => {
  projectHelp(projectId).then(({data}) => {
    console.log(data)
    return (dispatch) => {
      dispatch({
        type: "selectedProject",
        selectedProject: data,
      });
    };
  });
};
