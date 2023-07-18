import style from "./Create.module.css";
import camera from "../assets/camera.svg";
import close from "../assets/remove.svg";
import React from "react";
import { useEffect } from "react";
import back from "../assets/back.svg";
import { Link, useNavigate } from "react-router-dom";
import song from "../assets/ari.jpeg";
import add from "../assets/add.svg";

const Create = () => {
  const navigate = useNavigate();
  const dummy = [1, 2, 3, 4, 5, 6, 7, 1];

  let files = [];

  const createPreview = () => {};

  // IMAGE PREVIEW FUNCIONALITY
  useEffect(() => {
    document.querySelector("#camarita").addEventListener("click", (e) => {
      document.querySelector("#hiddenInput").click();
    });
    document.querySelector("#hiddenInput").addEventListener("change", (e) => {
      Array.from(e.target.files).map((file) => {
        let imageSource = URL.createObjectURL(file);
        let div = document.createElement("div");
        div.id = "imagePreview";
        div.className = "imagePreview";
        let img = document.createElement("img");
        img.src = imageSource;
        let closeButton = document.createElement("img");
        closeButton.src = close;
        closeButton.className = "closePreview";
        closeButton.addEventListener("click", (e) => {
          e.target.parentElement.remove();
        });

        div.appendChild(img);
        div.appendChild(closeButton);

        document
          .querySelector("#camarita")
          .insertAdjacentElement("beforeBegin", div);
        // Aca habia insertado la variable img, entonces no se cargaba la div. Lo cambie a div para que inserte la div.
      });
    });
  }, []);

  return (
    <div className={style.container}>
      <h2 className={style.title}>Create a new playlist</h2>
      <div
        className={style.backContainer}
        onClick={() => navigate("/myPlaylist")}
      >
        <img className={style.backImg} src={back} alt="back" />
      </div>
      <div className={style.containerCam}>
        <div className={style.camarita} id="camarita">
          <span className={style.textCamera}>Add photo</span>
          <img className={style.imgCamera} src={camera} alt="abc" />
        </div>
        <input
          type="file"
          accept="images/*"
          id="hiddenInput"
          style={{ visibility: "hidden" }}
        />
      </div>
      <form className={style.form}>
        <div className={style.boxName}>
          <input
            className={style.input}
            type="text"
            name="name"
            placeholder=" Name..."
          ></input>

          <input
            className={style.input2}
            type="text"
            name="name"
            placeholder=" Add an optional description"
          ></input>
          <h3 className={style.title2}>
            What songs would you like to save in your playlist?
          </h3>
          <button className={style.add}>
            Add your favorites
          </button>
          <Link className={style.seeAll} to='/seeAll'>See All</Link>
          <div className={style.container2}>
            {dummy.map((el, index) => {
              return (
                <div className={style.songContainer}>
                  <img className={style.imageAdd} src={add} alt="add" />
                  <img className={style.image} src={song} alt="songs" />
                </div>
              );
            })}
          </div>

          <h3 className={style.title2}>
           Search by name...
          </h3>
          <select className={style.input} defaultValue={"default"} name="song">
            <option value="default" disabled>
              All
            </option>
            <option>Sea of problems</option>
            <option>Daylight</option>
            <option>Flowers</option>
            <option>Peaches</option>
            <option>I wanna be yours</option>
            <option>Clouds</option>
            <option>Calm Down</option>
            <option>Here with me</option>
            <option>SNAP</option>
            <option>As it was</option>
            <option>Sunroof</option>
            <option>Players</option>
            <option>Those Eyes</option>
            <option>Sunsetz</option>
            <option>Pieces</option>
            <option>Atlantis</option>
            <option>505</option>
            <option>Memories</option>
            <option>Love of my life</option>
            <option>Sweet</option>
            <option>august</option>
            <option>Timezone</option>
            <option>Sea of problems</option>
            <option>Daylight</option>
            <option>Flowers</option>
            <option>Peaches</option>
            <option>I wanna be yours</option>
            <option>Clouds</option>
            <option>Calm Down</option>
            <option>Here with me</option>
            <option>SNAP</option>
            <option>As it was</option>
            <option>Sunroof</option>
            <option>Players</option>
            <option>Those Eyes</option>
            <option>Sunsetz</option>
            <option>Pieces</option>
            <option>Atlantis</option>
            <option>505</option>
            <option>Memories</option>
            <option>Love of my life</option>
            <option>Sweet</option>
            <option>august</option>
            <option>Timezone</option>
          </select>
          {/* 
        <input type='file' multiple id='add-new-photo' name='images[]'></input> */}
        </div>
      </form>
    </div>
  );
};

export default Create;
