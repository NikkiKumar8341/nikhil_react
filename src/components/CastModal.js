import React, { useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "../css/tooltip.css";
import { unavailable } from "../utils/constant";
import { Link } from "react-router-dom";

const CastModal = ({
  data,
  castModalCLose,
  castModalShow,
  castModal,
  title,
  crew_division,
}) => {
  const [key, setKey] = useState("cast");

  console.log(data.cast,"cast");

  const [isHovering, setIsHovering] = useState(false);
  const [hoveredItemData, setHoveredItemData] = useState(null);
  // Event handlers
  const handleMouseEnter = (item) => {
    setIsHovering(true);
    setHoveredItemData(item); // Update hoveredItemData state with the data of the item being hovered
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredItemData(null); // Reset hoveredItemData when mouse leaves
  };

  const cast_details_Array = Object.keys(data);

  return (
    <>
      <Modal
        show={castModal}
        onHide={castModalCLose}
        animation={false}
        fullscreen="lg-down"
        size="xl"
      >
        <Modal.Header
          style={{ backgroundColor: "white" }}
          closeButton
          onClick={castModalCLose}
          className="bi bi-x-circle"
        >
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body size="xl">
          <div></div>

          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >
            <Tab eventKey={cast_details_Array[1]} title={cast_details_Array[1]}>
              <div className="d-flex flex-wrap">
                {data?.cast?.map((item) => {
                  return (
                    <div
                      className="hover-card"
                      onMouseEnter={() => handleMouseEnter(item)} // Pass the item data to the handler
                      onMouseLeave={handleMouseLeave}
                    >
                      <Link to={`/cast&CrewDetails/${item.id}`}>
                        <img
                          className={`card ${isHovering ? "hovered" : ""} m-1`}
                          src={
                            item.profile_path
                              ? `https://image.tmdb.org/t/p/w300${item.profile_path} `
                              : `${unavailable}`
                          }
                        />
                      </Link>
                      {isHovering &&
                        item === hoveredItemData && ( // Display additional data only if hovering over the same item
                          <div className="hover_tooltip">
                            <div>
                              <h6>{item.name}</h6>
                            </div>
                            <div>
                              <h6>{item.character === 'Self' ?'':item.character }</h6>
                            </div>
                          </div>
                        )}
                    </div>
                  );
                })}
              </div>
            </Tab>
            <Tab eventKey="profile" title={cast_details_Array[2]}>
              {crew_division &&
                Object.entries(crew_division).map(([department, data]) => (
                  <>
                    <div>
                      <Tabs>
                        <Tab
                          key={department}
                          eventKey={department}
                          title={department}
                        >
                          <div className="d-flex flex-wrap">
                            {data.map((item) => (
                              <>
                                <div
                                  className="hover-card"
                                  onMouseEnter={() => handleMouseEnter(item)} // Pass the item data to the handler
                                  onMouseLeave={handleMouseLeave}
                                >
                                  <Link to={`/cast&CrewDetails/${item.id}`}>
                                    <img
                                      className={`card ${
                                        isHovering ? "hovered" : ""
                                      } m-1`}
                                      src={
                                        item.profile_path
                                          ? `https://image.tmdb.org/t/p/w300${item.profile_path} `
                                          : `${unavailable}`
                                      }
                                    />
                                  </Link>
                                  {isHovering &&
                                    item === hoveredItemData && ( // Display additional data only if hovering over the same item
                                      <div className="hover_tooltip">
                                        <div className="p-1">
                                          <h6>{item.name}</h6>
                                        </div>

                                        <div className="p-1">
                                          <h6> {item.job}</h6>
                                        </div>
                                      </div>
                                    )}
                                </div>
                              </>
                            ))}
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </>
                ))}
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CastModal;
