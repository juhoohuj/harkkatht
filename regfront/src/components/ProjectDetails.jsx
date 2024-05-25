
const ProjectDetails = (props) => {
  const id = props.match.params.id;
  return (
    <div>
      <h2>Project Details - {id}</h2>
    </div>
  );
}

export default ProjectDetails;