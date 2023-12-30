import "./ProjectList.css";
import { ProjectType } from "../../../Types/ModelsType";
import ProjectRow from "../ProjectRow/ProjectRow";

type ProjectListProps = {
    projects: ProjectType[]
}

export default function ProjectList(props: ProjectListProps) {
    
    const { projects } = props;

    return(
        <>
        <table className="projects-table">
            <thead>
                <tr>
                    <th>Название</th>
                    <th>Руководитель</th>
                    <th>Команда</th>
                </tr>
            </thead>
            <tbody>
                {projects.map(item =>
                    <ProjectRow key={item.id} project={item}/>    
                )}
            </tbody>
        </table>
        
        </>
    )
}
