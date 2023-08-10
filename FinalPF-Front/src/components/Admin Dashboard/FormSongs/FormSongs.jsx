import { useForm } from "react-hook-form";
import style from "./Formsongs.module.css";
import { postSongs } from "../../../redux/Actions/SongsActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Formsongs = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm({
    defaultValues: {
      name: '',
      artists: '',
  }});
  const state = watch()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    console.log(data)
    dispatch(postSongs(data))
    reset();
    navigate('/admin/songs')
  });

  return (
    <div className={style.container}>
      <form onSubmit={onSubmit} className={style.form}>
        <div className={style.title}>Create Songs</div>

        <div className={style.content}>
          <div className={style.div}>
            <label className={style.label} htmlFor="name">
              Name
            </label>
            <input
              className={style.input}
              type="text"
              placeholder="Enter the name of the song"
              {...register("name", {
                required: {
                  value: true,
                  message: "Required field",
                },
                minLength: {
                  value: 1,
                  message: "Must have minimum 1 character",
                },
                maxLength: {
                  value: 100,
                  message: "It must only have a maximum of 100 characters",
                },
              })}
            />
            {errors.name && (
              <span className={style.errors}>{errors.name.message}</span>
            )}
          </div>

          <div className={style.div}>
            <label className={style.label} htmlFor="audioPreview">
              Audio Preview
            </label>
            <input
              className={style.file}
              type="file"
              {...register("audioPreview", {
                required: {
                  value: true,
                  message: "Required field",
                },
              })}
            />
            {errors.audioPreview && (
              <span className={style.errors}>
                {errors.audioPreview.message}
              </span>
            )}
          </div>

          <div className={style.div}>
            <label className={style.label} htmlFor="artists">
              Artist
            </label>
            <input
              className={style.input}
              placeholder="Enter the artist's name"
              type="text"
              {...register("artists", {
                required: {
                  value: true,
                  message: "Required field",
                },
                minLength: {
                  value: 2,
                  message: "Must have minimum 1 character",
                },
                maxLength: {
                  value: 100,
                  message: "It must only have a maximum of 100 characters",
                },
              })}
            />
            {errors.artists && (
              <span className={style.errors}>{errors.artists.message}</span>
            )}
          </div>

          <div className={style.div}>
            <label className={style.label} htmlFor="image">
              Image
            </label>
            <input
              className={style.file}
              type="file"
              {...register("image", {
                required: {
                  value: true,
                  message: "Required field",
                },
              })}
            />
            {errors.image && (
              <span className={style.errors}>{errors.image.message}</span>
            )}
          </div>

          <div className={style.div}>
            <label className={style.label} htmlFor="explicit">
              Explicit
            </label>
            <select
              className={style.select}
              defaultValue={false}
              {...register("explicit")}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>

          <div className={style.div}>
            <label className={style.label} htmlFor="audioFull">
              Full Track
            </label>
            <input
              className={style.file}
              type="file"
              {...register("audioFull", {
                required: {
                  value: true,
                  message: "Required field",
                },
              })}
            />
            {errors.audioFull && (
              <span className={style.errors}>{errors.audioFull.message}</span>
            )}
          </div>
        </div>

        <button
          disabled={
            errors.name ||
            errors.image ||
            errors.audioPreview ||
            errors.audioFull ||
            errors.artists ||
            state.name === '' ||
            state.artists === '' ||
            state.image?.length === 0 ||
            state.audioFull?.length === 0 ||
            state.audioPreview?.length === 0
          }
          className={style.btn}
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Formsongs;
