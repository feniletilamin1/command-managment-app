import "./ProjectRow.css";
import { ProjectType } from "../../../Types/ModelsType";
import projectImage from "../../../images/project-image.png";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../../app/hook";

type ProjectCardProps = {
    project: ProjectType,
    deleteProject: (projectId: number) => void
}

export default function ProjectRow(props: ProjectCardProps) {
    const { project, deleteProject} = props
    const { user } = useAppSelector((state) => state.user);

    return (

        <div className="project-item">
            <div className="project-item__wrapper">
                <div className="project-item__details">
                    <div className="project-item__name">{project.name}</div>
                    <div className="project-item__leader">Руководитель: {`${project.createUser.lastName} ${project.createUser.firstName} ${project.createUser.middleName ?? ""}`}</div>
                    <div className="project-item__team">Команда: {project.team.teamName}</div>
                </div>
                <Link to={"/board/" + project.board.id} className="scrum-button">Открыть доску задач</Link>
            </div>
            <img src={projectImage} alt="" className="project-item__image" />
           {project.createUser.id === user?.id && <>
            <div className="project-item__delete" onClick={() => {
                if(project.createUser.id === user?.id) {
                    deleteProject(project.id)
                }
            }}>
                <div className="project-item__delete-cross"></div>
            </div>
           </>
           }
        </div>
    )
}