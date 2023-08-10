import style from "./Column.module.css";
import CardColumn from "../Card Column/CardColumn";

const Column = ({ title, content, prop, model }) => {
  console.log(model)
  return (
    <div className={style.container}>
      <h2 className={style.title}>{title}</h2>

      <div className={style.content}>
        {content?.map((value, i) => {
          return <CardColumn model={model} value={value} i={i} prop={prop} />;
        })}
      </div>
    </div>
  );
};

export default Column;
