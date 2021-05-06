import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link, useParams } from 'react-router-dom';
import { FileService } from '../services/file';
import { useUser } from '../util/auth';
import { useEffect, useState } from 'react';
import FileRecord from '../models/FileRecord';
import Container from 'react-bootstrap/Container';
import { AuthComponent } from './AuthComponent';
import Table from 'react-bootstrap/Table';

function Docs() {
  let { id } = useParams() as any;
  let { user } = useUser();
  let fileService = new FileService();

  const [files, setFiles] = useState<FileRecord[]>([]);

  const loadPublicFiles = async () => {
    await fileService.init();
    const data: FileRecord[] = await fileService.listPublicFiles();
    for (const rec of data) {
      rec.signedUrl = await fileService.getFileUrl(rec.s3key);
    }
    setFiles(data);
  };

  useEffect(() => {
    loadPublicFiles();
  }, []);

  async function onChange(ev: any) {
    const files = (ev.target as HTMLInputElement).files;
    if (!files[0]) return;
    await fileService.init();
    await fileService.savePublicFile(files[0]);
    loadPublicFiles();
  }

  return (
    <div>
      <h3>ID: {id}</h3>
      <Link to="/">Back home</Link>
      <AuthComponent />
      {user && (
        <Container>
          <Form>
            <Form.File id="custom-file" label="Upload a file" custom onChange={onChange} />
          </Form>
        </Container>
      )}
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>S3 Key</th>
              <th>Download Link</th>
              {user && <th>Delete</th>}
            </tr>
            {files.map((f: FileRecord) => (
              <tr>
                <td>{f.name}</td>
                <td>{f.s3key}</td>
                <td>
                  <a href={f.signedUrl} target="_blank" rel="noreferrer">
                    {f.name}
                  </a>
                </td>
                {user && (
                  <td>
                    <Button
                      variant="danger"
                      onClick={async () => {
                        await fileService.init();
                        await fileService.removeFile(f);
                        setFiles(files.filter((fi) => fi !== f));
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                )}
              </tr>
            ))}
          </thead>
        </Table>
      </Container>
    </div>
  );
}

export default Docs;
