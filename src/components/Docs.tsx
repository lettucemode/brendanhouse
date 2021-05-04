import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { S3Service } from '../services/s3';

function Docs() {
  let { id } = useParams() as any;

  return (
    <div>
      <h3>ID: {id}</h3>
      <Link to="/">Back home</Link>
      <Button
        variant="primary"
        type="button"
        onClick={async () => {
          const data = await S3Service.listFiles('public/');
          console.log(data);
        }}
      >
        Test Auth
      </Button>
    </div>
  );
}

export default Docs;
