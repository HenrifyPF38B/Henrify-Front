import style from "./beMember.module.css";

const BeMember = () => {
  return (
    <div className={style.container}>
      <div className="content">
        <h1 className="tittle">Welcome! Be a member!</h1>
        <div class="pyramid-loader">
          <div class="wrapper">
            <span class="side side1"></span>
            <span class="side side2"></span>
            <span class="side side3"></span>
            <span class="side side4"></span>
            <span class="shadow"></span>
          </div>
        </div>
      </div>
      <h3 className="info">        
        Select the plan you want and enjoy unlimited music
      </h3>
      <p className="dat">Play any song, download your favorites and listen offline.
        Listen to content on all your devices and enjoy high fidelity sound.</p>
      <div className={style.boxMember}>
        <div className="card">
          <div className="type">
            <h2 className="typeh2">Soul Basic</h2>
          </div>
          <div className="databox">
            <p className="date">Three month</p>
            <p className="price">$15</p>
          </div>
          <button className="buttonMember">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
            </svg>
            Add membership
          </button>
        </div>
        <div className="card">
          <div className="type">
            <h2 className="typeh2">Soul Premium</h2>
          </div>
          <div className="databox">
            <p className="date">Six months</p>
            <p className="price">$25</p>
          </div>
          <button className="buttonMember">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
            </svg>
            Add membership
          </button>
        </div>

        <div className="card">
          <div className="type">
            <h2 className="typeh2">Soul Vip</h2>
          </div>
          <div className="databox">
            <p className="date">One year</p>
            <p className="price">$45</p>
          </div>
          <button className="buttonMember">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 24">
              <path d="m18 0 8 12 10-8-4 20H4L0 4l10 8 8-12z"></path>
            </svg>
            Add membership
          </button>
        </div>
      </div>
    </div>
  );
};

export default BeMember;
