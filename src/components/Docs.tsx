import Auth from '@aws-amplify/auth';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import { S3Service } from '../services/s3';
import { useUser } from '../util/auth';
import awsmobile from '../aws-exports';

import { DynamoDBClient, PutItemCommand, GetItemCommand } from '@aws-sdk/client-dynamodb';
import { Credentials } from 'aws-sdk';

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
          let stuff = await Auth.currentCredentials();
          const ddb = new DynamoDBClient({
            region: awsmobile.aws_dynamodb_all_tables_region,
            credentials: new Credentials(stuff.accessKeyId, stuff.secretAccessKey, stuff.sessionToken),
          });
          const params = {
            TableName: 'files-prod',
            Item: {
              name: { S: 'TEST_FILE.doc' },
              s3key: { S: 'public/TEST_FILE.doc' },
            },
          };
          const data = await ddb.send(new PutItemCommand(params));
          console.log(data.Attributes);
        }}
      >
        Put Item
      </Button>
      <Button
        variant="primary"
        type="button"
        onClick={async () => {
          let stuff = await Auth.currentCredentials();
          console.log(stuff);
          const ddb = new DynamoDBClient({
            region: awsmobile.aws_dynamodb_all_tables_region,
            credentials: new Credentials(stuff.accessKeyId, stuff.secretAccessKey, stuff.sessionToken),
          });
          const params = {
            TableName: 'files-prod',
            Key: {
              name: { S: 'TEST_FILE2.doc' },
              s3key: { S: 'public/TEST_FILE.doc' },
            },
            // ProjectionExpression: 'ATTRIBUTE_NAME',
          };
          const data = await ddb.send(new GetItemCommand(params));
          console.log(data.Item);
        }}
      >
        Get Item
      </Button>
    </div>
  );
}

export default Docs;
