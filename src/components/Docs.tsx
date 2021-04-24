import Auth from "@aws-amplify/auth";
import Button from "react-bootstrap/Button";
import { Link, useParams } from "react-router-dom"
import { API, Storage } from 'aws-amplify';
import { listTodos } from '../graphql/queries';


 function Docs() {
  let { id } = useParams() as any;

  return (
    <div>
      <h3>ID: { id }</h3>
      <Link to="/">Back home</Link>
      <Button variant="primary" type="button" onClick={async () => {
        var creds = await Auth.currentCredentials();
        console.log(creds);
        const data: any = await API.graphql({ query: listTodos });
        console.log(data);
        Storage.put("testing1234", "testing1234", { level: 'public', customPrefix: { public: 'uploads/' }})
          .then(result => console.log(result))
          .catch(err => console.log(err));
      }}>Test Auth</Button>
    </div>
  );
}

export default Docs;