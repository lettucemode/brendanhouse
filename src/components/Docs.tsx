import { Link, useParams } from "react-router-dom"


 function Docs() {
  let { id } = useParams() as any;

  return (
    <div>
      <h3>ID: { id }</h3>
      <Link to="/">Back home</Link>
    </div>
  );
}

export default Docs;