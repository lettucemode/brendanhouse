import Auth from '@aws-amplify/auth';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { S3Service } from '../services/s3';
import { FileService } from '../services/file';
import { useUser } from '../util/auth';
import awsmobile from '../aws-exports';

function Docs() {
  let { id } = useParams() as any;
  let { user } = useUser();

  return (
    <div>
      <h3>ID: {id}</h3>
      <Link to="/">Back home</Link>
      <Button
        variant="primary"
        type="button"
        onClick={async () => {
          console.log(await FileService.listPublicFiles());
        }}
      >
        List Public Items
      </Button>
    </div>
  );
}

export default Docs;
