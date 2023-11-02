import React, { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCartShopping,
  faPlus,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import ImageNextSlider from "./ImageNextSlider";
import ImageComparision from "./ImageComparision";
import { NavLink } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Modal from "react-modal";
import TopButton from "./TopButton";
import "../css/ybModal.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoadingScreen from "./LoadingScreen";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const { modalOpen } = location.state || {};

  const [loaded, setLoaded] = useState(false);

  const videos = [
    {
      id: 0,
      src: "https://www.youtube.com/embed/_H5wvYRFptc",
      title: "Elrean'a hazırladığım özel map",
    },
    {
      id: 1,
      src: "https://www.youtube.com/embed/qL2LUvk0HVc",
      title: "Özel hazırladığım Mixed haritası",
    },
    {
      id: 2,
      src: "https://www.youtube.com/embed/ElxQ9Cf6m-A",
      title: "Minecraft temalı harita",
    },
    {
      id: 3,
      src: "https://www.youtube.com/embed/8RxDL_TMzvM",
      title: "Çukur dizisi temalı harita",
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState(0);

  const videoPlayer = () => {
    return (
      <>
        <div className="live-video">
          <div className="main-video">
            <iframe
              className="playerMain"
              src={videos[selectedVideo].src}
              title={videos[selectedVideo].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
          <h2 className="video-text text-white">
            {videos[selectedVideo].title}
          </h2>
        </div>

        <div className="side-videos">
          {videos.map((video) => {
            if (video.id != selectedVideo) {
              return (
                <div
                  className="selected-video"
                  onClick={() => setSelectedVideo(video.id)}
                  key={video.id}
                >
                  <h2 className="side-text mb-2 text-white">{video.title}</h2>
                  <div className="sidePlayer">
                    <iframe
                      className="playerMain"
                      src={video.src}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </>
    );
  };

  const maps = [
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040794365407232/cukur-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040787872628756/elrean1-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040797599215756/redlineHome-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040795896320122/katkatHome-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040794726109204/akHome-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040795044888597/elrean2-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040797230108833/p250Home-min.png",
  ];

  const pictures = [
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040794365407232/cukur-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040796357705818/legoBefore-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040796835852328/legoLogoAfter-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107040798085746819/Revize-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107024783792676864/customBefore-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107024783503282336/customAfter-min.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107024777786425354/UrunlerBG.jpg",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107203448845381703/mainBG-min.jpg",
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (modalOpen === "x") {
      openModal();
      navigate(".", { state: {} });
    }
  }, [modalOpen, navigate]);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const windowYnum = useRef(null);
  const [triggerPoint, setTriggerPoint] = useState(0);

  useEffect(() => {
    if (loaded) {
      const handleResize = () => {
        setTriggerPoint(windowYnum.current.offsetTop);
      };

      window.addEventListener("resize", handleResize);

      setTimeout(()=>{
        setTriggerPoint(windowYnum.current.offsetTop);
      },500);
      
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [loaded]);

  useEffect(() => {
    const imagePromises = pictures.map((url) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve();
      });
    });

    Promise.all(imagePromises).then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      maps.map((url) => {
        const image = new Image();
        image.src = url;
        image.onload;
      });
    }
  }, [loaded]);

  return (
    <>
      {loaded ? (
        <>
          <Navbar className={"home"} setY={triggerPoint - 70} />
          <div className="Home">
            <div className="welcome-part border-bottom border-dark">
              <div className="welcomeBG p-0">
                <div className="part-1">
                  <div className="container welcomeCont">
                    <div className="welcome-part-1-left">
                      <p className="welcome-t1 text-white">CS Mapper.</p>
                      <div className="d-flex mt-2 align-items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          fade
                          style={{ color: "#ffffff" }}
                        />
                        <p className="ms-3 welcome-t2 text-white">
                          +5 Yıllık Mapping Tecrübesi
                        </p>
                      </div>
                      <div className="d-flex mt-2 align-items-center">
                        <FontAwesomeIcon
                          icon={faCheck}
                          fade
                          style={{ color: "#ffffff" }}
                        />
                        <p className="ms-3 welcome-t2 text-white">
                          +1000 Saat CS:SDK
                        </p>
                      </div>
                      <NavLink className="order-button" to="/siparis">
                        <FontAwesomeIcon
                          className="buy-icon me-3"
                          icon={faCartShopping}
                          style={{ color: "#000000" }}
                        />
                        Sipariş ver
                      </NavLink>
                    </div>
                    <div className="welcome-part-1-right">
                      <ImageNextSlider maps={maps} className={"homeSlider"} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="content-part"
              ref={windowYnum}
              style={{
                background: `url("https://cdn.discordapp.com/attachments/267204052473872385/1107024777786425354/UrunlerBG.jpg")`,
              }}
            >
              <div className="container d-flex justify-content-center p-4">
                <div className="content shadow-lg">
                  <h1 className="text-center pt-5 inf">Paketler</h1>
                  <div className="packets text-black">
                    <div className="packet first-packet">
                      <p className="text-packet mb-3 fs-3">
                        Logo/Reklam Ekletme
                      </p>
                      <ImageComparision
                        img1={
                          "https://cdn.discordapp.com/attachments/267204052473872385/1107040796357705818/legoBefore-min.png"
                        }
                        img2={
                          "https://cdn.discordapp.com/attachments/267204052473872385/1107040796835852328/legoLogoAfter-min.png"
                        }
                      />
                      <div className="mt-3 packet_desc ">
                        <div className="packet_desc_left">
                          <p>
                            Hazır Haritalarımızdan seçim yaparak şunları
                            ekletebilirsiniz:
                          </p>
                          <ul className="packet-list">
                            <li>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              Logo
                            </li>
                            <li>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              IP
                            </li>
                          </ul>
                        </div>
                        <div className="packet_desc_right">
                          <a className="btn btn-outline-success price">25 ₺</a>
                          <NavLink
                            to="/urunler"
                            className="btn btn-outline-dark my-3 readyMaps"
                            state={{ mapFocus: true }}
                          >
                            Hazır Haritalar
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="packet">
                      <p className="text-packet mb-3 fs-3">Revize Etme</p>
                      <ImageComparision
                        img1={
                          "https://cdn.discordapp.com/attachments/267204052473872385/1107040796357705818/legoBefore-min.png"
                        }
                        img2={
                          "https://cdn.discordapp.com/attachments/267204052473872385/1107040798085746819/Revize-min.png"
                        }
                      />
                      <div className="mt-3 packet_desc ">
                        <div className="packet_desc_left">
                          <p>
                            Hazır Haritalarımızdan seçim yaparak şunları
                            ekletebilirsiniz:
                          </p>
                          <ul className="packet-list">
                            <li>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              Logo
                            </li>
                            <li>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              IP
                            </li>
                            <li>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              Texture Güncellemesi
                            </li>
                            <li>
                              <FontAwesomeIcon icon={faPlus} className="me-2" />
                              Yapı Ekleme
                            </li>
                          </ul>
                        </div>
                        <div className="packet_desc_right mt-2">
                          <a className="btn btn-outline-success price">50 ₺</a>
                          <NavLink
                            to="/urunler"
                            className="btn btn-outline-dark my-3 readyMaps"
                            state={{ mapFocus: true }}
                          >
                            Hazır Haritalar
                          </NavLink>
                        </div>
                      </div>
                    </div>
                    <div className="packet-last mb-5">
                      <p className="text-packet mb-3 fs-3">Kişiye Özel Map</p>
                      <ImageComparision
                        img1={
                          "https://cdn.discordapp.com/attachments/267204052473872385/1107024783792676864/customBefore-min.png"
                        }
                        img2={
                          "https://cdn.discordapp.com/attachments/267204052473872385/1107024783503282336/customAfter-min.png"
                        }
                      />
                      <div className="mt-3 d-flex flex-column">
                        <p className="text-center">
                          Tarafıma sağladığınız fotoğraflar ya da tanıma göre
                          özel harita yapılır. Fiyat projeye göre belirlenir.
                        </p>
                        <div className="w-100 modal-part">
                          <button
                            className="btn btn-outline-dark my-3 w-100"
                            onClick={openModal}
                          >
                            Örnek Haritalar
                          </button>
                          <Modal
                            isOpen={modalIsOpen}
                            onRequestClose={closeModal}
                            style={customStyles}
                            contentLabel="Example Modal"
                          >
                            <button
                              onClick={closeModal}
                              className="close-button"
                              style={{ color: "#ffffff" }}
                            >
                              <FontAwesomeIcon icon={faCircleXmark} />
                            </button>
                            <div className="video-part">{videoPlayer()}</div>
                          </Modal>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer className={"home-footer"} />
          <TopButton className={"home-top"} />
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default Home;
