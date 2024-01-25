import "./ProjectList.css";
import { ProjectType } from "../../../Types/ModelsType";
import ProjectRow from "../ProjectRow/ProjectRow";


type ProjectListProps = {
    projects: ProjectType[]
}

export default function ProjectList(props: ProjectListProps) {
    
    const { projects } = props;

    return(
        <div className="projects-container">
            {projects.map(item =>
                    <ProjectRow key={item.id} project={item}/>    
                )}
        </div>
    
    )
}
