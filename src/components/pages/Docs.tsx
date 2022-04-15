import { FileService, S3File } from '../../services/file';
// import { useUser } from '../util/auth';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import FileBrowser, { Icons } from 'react-keyed-file-browser';
import 'react-keyed-file-browser/dist/react-keyed-file-browser.css';
import fileBrowserActionRenderer from '../../vendor/fileBrowserActionRenderer';
import FadeIn from '../../vendor/FadeIn';

function Docs({ cohort }: { cohort: number }) {
  // const { user } = useUser();
  const fileService = useMemo(() => new FileService(), []);

  // let [commonFiles, setCommonFiles] = useState<S3File[]>([]);
  let [v1UploadFiles, setV1UploadFiles] = useState<S3File[]>([]);

  const setV1UploadFilesFromApi = useCallback(
    (v1upfiles: S3File[]) => {
      setV1UploadFiles(
        v1upfiles.map((s3f: S3File) => {
          s3f.s3Obj.key = s3f.s3Obj.key.replace(`Cohort ${cohort}/`, '');
          return s3f;
        })
      );
    },
    [cohort]
  );

  // todo: return these from a lambda or something?
  //       probably in the future, when this page is retooled
  let curriculumFolders: any[] = [];
  if (cohort === 1) {
    curriculumFolders.push(
      { key: 'General Resources/' },
      { key: 'Part I - Discernment/' },
      { key: 'Part II - Mercy and Gentleness/' },
      { key: 'Part III - Key Life Milestones/' },
      { key: 'Part IV - Spiritual Warfare/' },
      { key: 'Part V - Chrism/' }
    );
  } else if (cohort === 2) {
    curriculumFolders.push(
      { key: 'General Resources/' },
      { key: 'Part I - Foundation/' },
      { key: 'Part II - Self Awareness and Listening/' },
      { key: 'Part III - History and Practices/' },
      { key: 'Part IV - Holy Living/' },
      { key: 'Part V - Group SD/' }
    );
  }
  const curriculumSubfolders: string[] = ['Book Reflections/', 'Synthesis Papers/', 'Weekend Resources/'];

  useEffect(() => {
    const loadFiles = async () => {
      setV1UploadFilesFromApi(await fileService.listV1UploadFiles(cohort));
      // setCommonFiles(await fileService.listCommonCurriculumFiles());
      // setCommonFiles([{ key: 'Cohort 1/General Resources/' }, { key: 'Cohort 2/General Resources/' }]);
    };
    loadFiles();
  }, [fileService, cohort, setV1UploadFilesFromApi]);

  // async function onChange(ev: any) {
  //   const files = (ev.target as HTMLInputElement).files;
  //   if (!files[0]) return;
  //   await fileService.init();
  //   const newFile = await fileService.savePublicFile(files[0]);
  //   setFiles([...allFiles, newFile]);
  // }

  const allFilesAndFolders: any[] = [
    ...curriculumFolders.flatMap((cf: { key: string }) => {
      return cf.key.includes('General Resources')
        ? { key: cf.key }
        : curriculumSubfolders.map((cs: string) => {
            return { key: cf.key + cs };
          });
    }),
    // ...commonFiles.map((cf: S3File) => {
    //   return { key: cf.s3Obj.key, link: cf.signedUrl };
    // }),
    ...v1UploadFiles.map((uf: S3File) => {
      return { key: uf.s3Obj.key, link: uf.signedUrl, size: uf.s3Obj.size, modified: +uf.s3Obj.lastModified };
    }),
  ];

  const downloadFile = (key: string) => {
    let link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.href = allFilesAndFolders.find((f) => f.key === key).link;
    link.click();
    document.body.removeChild(link);
  };

  return (
    <FadeIn>
      <Row>
        <Col md={2}>
          <h2>Cohort {cohort}</h2>
        </Col>
        <Col style={{ marginTop: '15px' }}>
          <FileBrowser
            files={allFilesAndFolders}
            icons={Icons.FontAwesome(4)}
            actionRenderer={fileBrowserActionRenderer}
            canFilter={false}
            detailRenderer={() => <></>}
            onDownloadFile={(fileKeys: string[]) => {
              var timeout = 100;
              for (let key of fileKeys) {
                setTimeout(() => downloadFile(key), timeout);
                timeout += 500;
              }
            }}
            onCreateFiles={async (files: File[], prefix: string) => {
              if (!files[0]) return;
              await Promise.all(
                files.map(async (file: File) => {
                  await fileService.saveV1UploadFile(`Cohort ${cohort}/` + prefix + file.name, file);
                })
              );
              setV1UploadFilesFromApi(await fileService.listV1UploadFiles(cohort)); //todo: modify list instead of fetch
            }}
            onDeleteFile={async (keys: string[]) => {
              if (!keys[0]) return;
              await Promise.all(
                keys.map(async (key: string) => {
                  await fileService.deleteV1UploadFile(`Cohort ${cohort}/` + key);
                })
              );
              setV1UploadFilesFromApi(await fileService.listV1UploadFiles(cohort)); //todo: modify list instead of fetch
            }}
          />
        </Col>
        <Col md={2} />
      </Row>
    </FadeIn>
  );
}

export default Docs;
