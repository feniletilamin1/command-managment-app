import "./ProjectRow.css";
import { ProjectType } from "../../../Types/ModelsType";
import projectImage from "../../../images/project-image.png";
import { Link } from "react-router-dom";

type ProjectCardProps = {
    project: ProjectType,
}

export default function ProjectRow(props: ProjectCardProps) {

    const { project } = props

    return (

        <div className="project-item">
            <div className="project-item__wrapper">
                <div className="project-item__details">
                    <div className="project-item__name">{project.name}</div>
                    <div className="project-item__leader">Руководитель: {`${project.createUser.lastName} ${project.createUser.firstName} ${project.createUser.middleName ?? ""}`}</div>
                    <div className="project-item__team">Команда: {project.team.teamName}</div>
                </div>
                <Link to={"/board/" + project.id} className="scrum-button">Открыть Scrum доску</Link>
            </div>
            <img src={projectImage} alt="" className="project-item__image" />
        </div>
    )
}