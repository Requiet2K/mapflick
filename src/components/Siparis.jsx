import React, { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import LoadingScreen from "./LoadingScreen";
import Modal from "react-modal";
import "../css/contactModal.css";
import "../css/contactPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { basicSchema } from "../schemas/yup";
import emailjs from "@emailjs/browser";

Modal.setAppElement("#root");

function Siparis() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  const formRef = useRef();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "90%",
      maxWidth: "500px",
      height: "auto",
      maxHeight: "90%",
      overflow: "auto !important",
      border: "none !important",
      padding: formSubmitted ? "0" : "20px",
    },
    overlay: {
      background: "linear-gradient(to bottom right, #242323ef, #070706ee)",
    },
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    actions.resetForm();
    setFormSubmitted(true);
    emailjs
      .sendForm(
        "service_8sm4jsq",
        "template_xcs9ww8",
        formRef.current,
        "kYkRhdZcF0wdUwhzF"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      email: "",
      message: "",
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  const pics = [
    "https://cdn.discordapp.com/attachments/267204052473872385/1107026561393246298/contact-bg-min.jpg",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107732378224439417/steam-icon.png",
    "https://cdn.discordapp.com/attachments/267204052473872385/1107732377884688485/discord-logo.png",
  ];

  useEffect(() => {
    const imagePromises = pics.map((url) => {
      return new Promise((resolve) => {
        const image = new Image();
        image.src = url;
        image.onload = () => resolve();
      });
    });

    Promise.all(imagePromises).then(() => {
      setBackgroundLoaded(true);
    });
  }, []);

  return (
    <>
      {backgroundLoaded ? (
        <>
          <div className="contactPage">
            <Navbar className={"aboutNav"} setY={550} />
            <div className="about">
              <div
                className="iletisim"
                style={{
                  background: `url("https://cdn.discordapp.com/attachments/267204052473872385/1107026561393246298/contact-bg-min.jpg")`,
                }}
              >
                <div className="container aboutContainer p-5">
                  <div className="contact d-flex flex-column text-white align-items-center gap-5 border border-white py-5">
                    <h1 className="reachUs text-center fs-bold">Sipariş için bize ulaşın</h1>
                    <p className="fs-5 text-center w-75 infos">
                      Steam veya Discord üzerinden iletişim sağlayıp sipariş
                      oluşturabilirsiniz.
                    </p>
                    <div className="contact-link gap-5 d-flex">
                      <a
                        href="https://steamcommunity.com/id/beautycan/"
                        target="_blank"
                      >
                        <img
                          src="https://cdn.discordapp.com/attachments/267204052473872385/1107732378224439417/steam-icon.png"
                          style={{ width: "4rem", height: "4rem" }}
                          className="steam-icon"
                        />
                      </a>
                      <a href="https://discord.gg/9fssmsxKaR" target="_blank">
                        <img
                          src="https://cdn.discordapp.com/attachments/267204052473872385/1107732377884688485/discord-logo.png"
                          style={{ width: "4rem", height: "4rem" }}
                          className="discord-icon"
                        />
                      </a>
                    </div>
                    <div className="viaMail mt-2 shadow-lg">
                      <button onClick={openModal}>
                        E-mail üzerinden iletişim.
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
                        {formSubmitted ? (
                          <div className="submit">
                            <FontAwesomeIcon
                              icon={faCheck}
                              style={{ color: "#4cd51a", fontSize: "60px" }}
                            />
                            <div className="text-white form-submitted">
                              <h2>Form başarıyla gönderildi!</h2>
                              <p>Teşekkür ederiz.</p>
                            </div>
                          </div>
                        ) : (
                          <form
                            className="formSection"
                            onSubmit={handleSubmit}
                            ref={formRef}
                          >
                            <div className="inputDiv">
                              <label className="text-white">Email</label>
                              <input
                                type="email"
                                name="email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Email giriniz."
                                id="email"
                                className={
                                  errors.email && touched.email
                                    ? "input-error"
                                    : ""
                                }
                              />
                              {errors.email && touched.email && (
                                <p className="error"> {errors.email} </p>
                              )}
                            </div>
                            <div className="inputDiv mt-3">
                              <label className="text-white">Mesaj</label>
                              <textarea
                                value={values.message}
                                name="message"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Mesajınızı giriniz."
                                id="message"
                                className={`message-text
                                errors.message && touched.message
                                  ? "input-error"
                                  : ""`}
                              />

                              {errors.message && touched.message && (
                                <p className="error"> {errors.message} </p>
                              )}
                            </div>
                            <button
                              disabled={isSubmitting}
                              type="submit"
                              className="sbtBtn mt-3"
                            >
                              {isSubmitting ? (
                                <p>Gönderiliyor...</p>
                              ) : (
                                <p>Gönder</p>
                              )}
                            </button>
                          </form>
                        )}
                      </Modal>
                    </div>
                  </div>
                </div>
                <Footer className={"about-footer"} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default Siparis;
