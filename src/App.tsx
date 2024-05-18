import './css//App.css';
import LoginPage from './Pages/LoginPage';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import RegisterPage from './Pages/RegisterPage';
import {useEffect } from 'react';
import ProjectsPage from './Pages/ProjectsPage';
import Header from './Components/Header/Header';
import Preloader from './Components/Preloader/Preloader';
import ProfilePage from './Pages/ProfilePage';
import Footer from './Components/Footer/Footer';
import TeamsPage from './Pages/TeamsPage';
import TeamPage from './Pages/TeamPage';
import { useAppDispatch, useAppSelector } from './app/hook';
import { getUserAsync } from './app/slices/userSlice';
import AddTeamPage from './Pages/AddTeamPage';
import { useUserCookies } from './hooks/useUserCokies';
import Page404 from './Pages/Page404/Page404';
import UpdateTeamPage from './Pages/UpdateTeamPage';
import { getTeamsAsync } from './app/slices/teamSlice';
import InviteTeamPage from './Pages/InviteTeamPage';
import ScrumBoardPage from './Pages/ScrumBoardPage';
import PasswordResetPage from './Pages/PasswordResetPage';
import TasksPage from './Pages/TasksPage';
import PasswordConfirmResetPage from './Pages/PasswordConfirmResetPage';
import ArchivedTasksPage from './Pages/ArchivedTasksPage';

export default function App() {
  const dispatch = useAppDispatch();
  const {user, isLoading, Error} = useAppSelector((state) => state.user);

  const token = useUserCookies();

  useEffect(() => {
    if(token) {
      dispatch(getUserAsync());
      dispatch(getTeamsAsync())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Error && <p>Ошибка: {Error}</p>}
      {isLoading && <Preloader fixed={true}/>}
      {!isLoading && !Error &&
      <BrowserRouter>
          <Header />
          <main className="main">
            <Routes>
                <Route index element={<HomePage user={user}/>} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/projects" element={<ProjectsPage />}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/profile" element={<ProfilePage/>}/>
                <Route path="/teams" element={<TeamsPage />}/>
                <Route path="/teams/team/:teamId" element={<TeamPage />}/>
                <Route path="/teams/newTeam/" element={<AddTeamPage />}/>
                <Route path="/teams/updateTeam/:teamId" element={<UpdateTeamPage />}/>
                <Route path="/inviteToTeam/:teamToken" element={<InviteTeamPage />} />
                <Route path="/board/:scrumBoardId" element={<ScrumBoardPage />}/>
                <Route path="/password-reset" element={<PasswordResetPage />}/>
                <Route path="/tasks" element={<TasksPage />}/>
                <Route path="/passwordResetConf/:resetToken" element={<PasswordConfirmResetPage />}/>
                <Route path="/archivedTasks" element={<ArchivedTasksPage />}/>
                <Route path="*" element={<Page404 />}/>
            </Routes>
          </main>
          <Footer />
      </BrowserRouter>}
    </>
  );
}

