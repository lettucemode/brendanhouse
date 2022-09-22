import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Popover from "react-bootstrap/Popover";
import PopoverTitle from "react-bootstrap/PopoverTitle";
import PopoverContent from "react-bootstrap/PopoverContent";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { FileService, S3File } from "../../services/file";
import { useEffect, useMemo, useState } from "react";
import useWindowDimensions from "../../util/useWindowDimenstions";
import jarsImage from "../../img/jars-image.jpg";

function VesselsOfHonor() {
  const history = useHistory();
  const fileService = useMemo(() => new FileService(), []);
  const { width } = useWindowDimensions();

  let [siteFiles, setSiteFiles] = useState<S3File[]>([]);
  let [showAppPopup, setShowAppPopup] = useState<boolean>(false);

  useEffect(() => {
    const loadFiles = async () => {
      setSiteFiles(await fileService.listSiteFiles());
    };
    loadFiles();
  }, [fileService]);

  return (
    <Row>
      {/* main page content */}
      <Col lg={9} xl={9}>
        <Row className="mx-auto my-3">
          <Col>
            <h2 className="text-bold text-center">Vessels of Honor Spiritual Direction Training Program</h2>
          </Col>
        </Row>
        <div>
          <p>
            Vessels of Honor is a spiritual direction training program in the Anglican tradition, dedicated to
            raising up spiritual companions and directors equipped for kingdom service. The curriculum design
            is an interweaving of three strands: personal formation (emphasizing grounding in God’s presence),
            skill building, and a foundational knowledge base for the ministry of spiritual
            companioning/direction. The community context created by the weekend intensives is essential to
            the program. In other words, this training is not about “head knowledge,” or “conceptual
            teaching.” It is about forming who the participant is, in preparation to serve in a particular way
            in the wider ministry of the church.
          </p>
          <Image src={jarsImage} rounded className="jarsfloated" />
          <p>The cohort structure and curriculum have been built on the foundation of five core values:</p>
          <ul>
            <li>Trinitarian worship: Father, Son and Holy Spirit</li>
            <li>Servanthood (service in community)</li>
            <li>An ethos of gentleness and humility</li>
            <li>Competence</li>
            <li>Formation and personal readiness for ministry</li>
          </ul>
          <p>The ideal candidate for this pilot cohort is someone who:</p>
          <ol>
            <li>Has demonstrated a clear commitment to Jesus Christ and a lively faith</li>
            <li>Already has some sort of demonstrable Scripture/prayer practice</li>
            <li>Already has some experience in mentoring/discipling others</li>
            <li>Is established/participating regularly in a worshipping community</li>
          </ol>
          <p>
            Applicants who are interested in developing their skills in spiritual companioning, but are unsure
            about vocational ministry as a spiritual director, are invited to apply for Year One. Applicants
            who are interested in or feeling called to the vocational ministry of spiritual direction are
            strongly encouraged to apply for both years.
          </p>
        </div>

        {/* bottom buttons bar */}
        <Row>
          <Col md={1} lg={1} xl={2} />
          <Col>
            <Card style={{ width: "100%" }}>
              <Card.Body>
                <Card.Title>Cohort Resources</Card.Title>
                <Row className="mx-auto">
                  <Col>
                    <Button variant="primary" onClick={() => history.push("/docs")}>
                      Cohort Resources
                    </Button>
                  </Col>
                  <Col>
                    <Button variant="secondary" onClick={() => history.push("/payments")}>
                      Make a Payment
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={1} lg={1} xl={2} />
        </Row>
      </Col>

      {/* sidebar */}
      <Col className="sidebar">
        <p className="sidebar-heading">Resources</p>
        <Row className="my-3">
          <ul>
            <li>
              <a
                href={siteFiles.find((sf: S3File) => sf.s3Obj.key === "site/voh_overview.pdf")?.signedUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Program Overview
              </a>
            </li>
          </ul>
        </Row>
        <Row className="mt-3 mb-2">
          <ul>
            <li>Curriculum Overview</li>
            <ul>
              <li>
                <a
                  href={
                    siteFiles.find((sf: S3File) => sf.s3Obj.key === "site/voh_curr_over_y1.pdf")?.signedUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Year One
                </a>
              </li>
              <OverlayTrigger
                key="curroverview"
                placement={width > 992 ? "left" : "top"}
                overlay={<Tooltip id={`tooltip-curroverview`}>Coming soon!</Tooltip>}
              >
                <li>Year Two</li>
              </OverlayTrigger>
            </ul>
          </ul>
        </Row>
        <Row>
          <div onMouseLeave={() => setShowAppPopup(false)}>
            <OverlayTrigger
              show={showAppPopup}
              placement={width > 992 ? "left" : "top"}
              onExit={() => setShowAppPopup(false)}
              overlay={
                <Popover id="popover-app-process">
                  <PopoverTitle as="h3">Application Process</PopoverTitle>
                  <PopoverContent>
                    <div>
                      <p>
                        Applications for <i>Vessels of Honor</i> are accepted on a rolling admission basis.
                        The next Year 1 Cohort is set to begin in early 2023. Location TBD, but likely to be
                        South Carolina.
                      </p>
                      <ul>
                        <li>
                          <a
                            href={
                              siteFiles.find((sf: S3File) => sf.s3Obj.key === "site/voh_app_form.pdf")
                                ?.signedUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Application Form
                          </a>
                        </li>
                        <li>
                          <a
                            href={
                              siteFiles.find((sf: S3File) => sf.s3Obj.key === "site/voh_ref_form.pdf")
                                ?.signedUrl
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            References Copy and Form
                          </a>
                        </li>
                      </ul>
                    </div>
                  </PopoverContent>
                </Popover>
              }
            >
              <ul>
                <li onClick={() => setShowAppPopup(!showAppPopup)}>
                  <Button style={{ marginLeft: "-12px" }} variant="link" onClick={(e) => e.preventDefault()}>
                    Application Process
                  </Button>
                </li>
              </ul>
            </OverlayTrigger>
          </div>
        </Row>
        <Row className="mt-2 mb-3">
          <ul>
            <li>
              <a
                href={
                  siteFiles.find((sf: S3File) => sf.s3Obj.key === "site/voh_financial_info.pdf")?.signedUrl
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                Financial Information
              </a>
            </li>
          </ul>
        </Row>
        <Row className="my-3">
          <ul>
            <li>
              <a
                href={siteFiles.find((sf: S3File) => sf.s3Obj.key === "site/voh_booklist.pdf")?.signedUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Spiritual Direction Booklist
              </a>
            </li>
          </ul>
        </Row>
      </Col>
    </Row>
  );
}

export default VesselsOfHonor;
