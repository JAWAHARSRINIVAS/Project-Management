import React, { useContext, useState } from 'react';
import '../css/ProductList.css';
import { Store } from '../Store';

export default function ProductList() {
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const { UserInfo } = state;
  const date = new Date();
  const [sort, setsort] = useState('week');
  const [sortclick, setsortclick] = useState(false);
  const [createProject, setcreateProject] = useState(false);
  const [newProjectTitle, setnewProjectTitle] = useState('');
  const SubmitcreateProject = async (event) => {
    event.preventDefault();
    try {
    } catch (error) {
      window.alert('Project not created');
    }
  };
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  const Time = date.getHours();
  const greet = Time < 12 ? 'morning' : Time < 16 ? 'afternoon' : 'night';

  return (
    <div>
      <div className="Product-List">
        <h5 className="Time">
          {days[date.getDay()] +
            ', ' +
            months[date.getMonth()] +
            ' ' +
            date.getDate()}
        </h5>
        <span className="Greeting">
          {'Good ' + greet + ' ' + UserInfo.name}
        </span>
        <div className="short-inspect">
          <div className="sort">
            <div className="display-sort">
              {sort + ' '}
              <i
                onClick={() => {
                  setsortclick(true);
                }}
                className="fa-solid fa-angle-down"
              ></i>
            </div>
            {sortclick && (
              <div
                onClick={() => {
                  setsortclick(false);
                  if (sort === 'week') setsort('month');
                  else setsort('week');
                }}
                className="hidden-sort"
              >
                {sort !== 'week' ? 'week' : 'month'}
              </div>
            )}
          </div>
          <div className="short-seperator"></div>
          <div className="completed">
            <i className="fa-solid fa-check"></i>0 completed
          </div>
          <div className="collabrators">
            <i className="fa-solid fa-user-group"></i>0 Collabrators
          </div>
        </div>
        <div className="Product"></div>
        <div className="Add-project">
          <div className="title">Projects</div>
          <div
            onClick={() => {
              setcreateProject(true);
              const bgDiv = document.getElementsByClassName('Product-List')[0];
              bgDiv.style.filter = 'blur(4px)';
            }}
            className="Create-project project-item"
          >
            <div className="square-create">
              <i className="fa-solid fa-plus"></i>
            </div>
            Create Project
          </div>
        </div>
      </div>
      {createProject && (
        <div className="Create-new-project">
          <div className="back-icon">
            <i
              onClick={() => {
                setcreateProject(false);
                const bgDiv =
                  document.getElementsByClassName('Product-List')[0];
                bgDiv.style.filter = 'none';
              }}
              className="fa-solid fa-arrow-left"
            ></i>
          </div>
          <div className="left-new-project">
            <div className="title">New Project</div>
            <form>
              <label className="new-project-title">
                Project name
                <input
                  type="text"
                  value={newProjectTitle}
                  onChange={(Proname) => {
                    setnewProjectTitle(Proname);
                  }}
                />
              </label>
              <button className="create-new-project-submit">Continue</button>
            </form>
          </div>
          <div className="right-new-project">
            <img src="images/Building.png" alt="Start Fresh" />
          </div>
        </div>
      )}
    </div>
  );
}
