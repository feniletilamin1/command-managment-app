import { ProjectType } from "../../../Types/ModelsType"   ;
import "./ProjectRow.css";

type ProjectCardProps = {
    project: ProjectType,
}

export default function ProjectRow(props: ProjectCardProps) {

    const { project } = props

    return (
        <tr>
            <td>{project.name}</td>
            <td>{`${project.createUser.lastName} ${project.createUser.firstName} ${project.createUser.middleName ?? ""}`}</td>
            <td>{project.team.teamName}</td>
        </tr>
    )
}