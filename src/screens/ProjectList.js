import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import '../css/ProjectList.css';
import { Store } from '../Store';

function ProjectCard(props) {
  return (
    <div className="project-item existing-project">
      <div
        style={{ backgroundColor: `${props.obj.color}` }}
        className="icon-background"
      >
        <i className={props.obj.icon}></i>
      </div>
      <div className="Project-title-card">
        <span className="Project-title">{props.obj.Project_name}</span>
      </div>
    </div>
  );
}

export default function ProjectList() {
  const { state, dispatch: ctxdispatch } = useContext(Store);
  const { UserInfo, ProjectList } = state;
  const date = new Date();
  const [sort, setsort] = useState('week');
  const [sortclick, setsortclick] = useState(false);
  const [createProject, setcreateProject] = useState(false);
  const [newProjectTitle, setnewProjectTitle] = useState('');

  const SubmitcreateProject = async (event) => {
    event.preventDefault();
    try {
      const member = {
        name: UserInfo.name,
        previlage: ['all'],
        _id: UserInfo._id,
      };
      const { data } = await axios.post('/api/project/create', {
        newProjectTitle,
        member,
      });
      setcreateProject(false);
      const bgDiv = document.getElementsByClassName('Product-List')[0];
      bgDiv.style.filter = 'none';
      // ctxdispatch({ type: 'ADD_PROJECT', payload: data });
      // toast.success('Project added');
    } catch (error) {
      // toast.error('Project not created');
    }
  };

  useEffect(() => {
    const getProjectList = async (event) => {
      console.log('inside getlist of project');
      try {
        const { data } = await axios.post('api/project/', {
          admin: UserInfo._id,
        });
        console.log(data);
        ctxdispatch({ type: 'GET_PROJECT_LIST', payload: data });
        console.log('after getting');
        console.log(ProjectList);
        console.log(ProjectList.project_Data);
      } catch (error) {
        // toast.error('Fetch failed');
      }
    };
    getProjectList();
  }, [createProject]);
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
      <ToastContainer position="top-right" />
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

          <div className="existing-Project-list">
            {ProjectList.project_Data.map((pro) => {
              return <ProjectCard key={pro._id} obj={pro}></ProjectCard>;
            })}
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
            <form onSubmit={SubmitcreateProject}>
              <label className="new-project-title">
                Project name
                <input
                  type="text"
                  value={newProjectTitle}
                  onChange={(Proname) => {
                    setnewProjectTitle(Proname.target.value);
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
