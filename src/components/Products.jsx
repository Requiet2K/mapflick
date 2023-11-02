import React, { useState, useEffect, useRef } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ImageNextSlider from "./ImageNextSlider";
import { useLocation } from "react-router-dom";
import TopButton from "./TopButton";
import LoadingScreen from "./LoadingScreen";
import ProductLinks from "./ProductLinks";

function Products() {
  const windowYnum = useRef(null);
  const [triggerPoint, setTriggerPoint] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(false);
  const mapRef = useRef();
  const location = useLocation();

  const mapArrays = {
    AWP: [],
    Aim: [],
    Jail: [],
    Fun: [],
    Surf: [],
  };

  ProductLinks.forEach((section) => {
    Object.keys(section).forEach((sectionKey) => {
      const maps = section[sectionKey];

      maps.forEach((map) => {
        const mapData = {
          name: map.name,
          image: map.photos,
          hash: map.hash,
        };

        mapArrays[sectionKey].push(mapData);
      });
    });
  });

  const [showMaps, setShowMaps] = useState("all");

  const mapShow = (choice) => {
    let arr = [];
    if (choice === "awp") {
      arr = mapArrays.AWP;
    } else if (choice === "aim") {
      arr = mapArrays.Aim;
    } else if (choice === "jail") {
      arr = mapArrays.Jail;
    } else if (choice === "fun") {
      arr = mapArrays.Fun;
    } else if (choice === "surf") {
      arr = mapArrays.Surf;
    } else {
      arr = [
        ...mapArrays.AWP,
        ...mapArrays.Aim,
        ...mapArrays.Jail,
        ...mapArrays.Fun,
        ...mapArrays.Surf,
      ];
    }
    if (arr.length == 0) {
      return <div className="nullMap">
        <h3 className="my-3 text-center text-info">Bu kategoride henüz harita bulunmamaktadır.</h3>
      </div>;
    } else {
      return arr.map((item, index) => (
        <div className="map text-white" key={index}>
          <h2 className=" text-info">{item.name}</h2>
          <div className="img my-3">
            <ImageNextSlider
              maps={item.image}
              className={"productSlider"}
              hash={item.hash}
            />
          </div>
        </div>
      ));
    }
  };

  const pictures = [
    "https://cdn.discordapp.com/attachments/267204052473872385/1107028497194549258/cs2-min.jpg",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107028496930320557/cs2BG-min.jpg",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107024777786425354/UrunlerBG.jpg",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107028496657678496/blackWall-min.jpg",
  ];

  useEffect(() => {
    setLoaded(true);

    const imagePromises = pictures.map((url) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve();
      });
    });

    Promise.all(imagePromises).then(() => {
      setLoadingScreen(true);
    });
  }, []);

  useEffect(() => {
    if (loaded && loadingScreen) {
      if (location.state && location.state.mapFocus) {
        setTimeout(() => {
          let mapPosition =
            mapRef.current.getBoundingClientRect().top +
            window.pageYOffset -
            110;
          if (window.innerWidth < 600) {
            mapPosition -= 50; // adjust for smaller screens
          }
          window.scrollTo({ top: mapPosition, behavior: "smooth" });
        }, 5);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, [loaded, loadingScreen, location.state]);

  useEffect(() => {
    if (loadingScreen) {
      const handleResize = () => {
        setTriggerPoint(windowYnum.current.offsetTop);
      };

      window.addEventListener("resize", handleResize);

      setTimeout(() => {
        setTriggerPoint(windowYnum.current.offsetTop);
      }, 100);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [loadingScreen]);

  return (
    <>
      {loadingScreen ? (
        <>
          <Navbar className={"product"} setY={triggerPoint - 75} />
          <div className="source2">
            <div className="container p-5">
              <div className="inner-source shadow-lg text-center">
                <h2 className="mb-4">Counter Strike 2 Hizmeti Çok Yakında!</h2>
                <a
                  href="https://www.counter-strike.net/cs2"
                  target="_blank"
                  className="text-decoration-none source-img-holder"
                >
                  <img
                    src={
                      "https://cdn.discordapp.com/attachments/267204052473872385/1107028497194549258/cs2-min.jpg"
                    }
                    className="cs2 w-100"
                  />
                </a>
              </div>
            </div>
          </div>
          <div
            className="urunler d-flex text-white flex-column align-items-center py-5"
            ref={windowYnum}
          >
            <div className="container p-5 urunler-in shadow-lg">
              <h3 className="text-center mb-5 text-info" ref={mapRef}>
                Hazır Haritalar
              </h3>
              <div className="categories">
                <button className="option" onClick={() => setShowMaps("all")}>
                  Tümü
                </button>
                <button className="option" onClick={() => setShowMaps("awp")}>
                  Awp
                </button>
                <button className="option" onClick={() => setShowMaps("aim")}>
                  Aim
                </button>
                <button className="option" onClick={() => setShowMaps("jail")}>
                  Jailbreak
                </button>
                <button className="option" onClick={() => setShowMaps("fun")}>
                  Fun
                </button>
                <button className="option" onClick={() => setShowMaps("surf")}>
                  Surf
                </button>
              </div>
              <div className="map-part">{mapShow(showMaps)}</div>
            </div>
          </div>
          <Footer className={"footer-product"} />
          <TopButton className={"footer-top"} />
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default Products;
