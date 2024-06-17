import "./ProjectList.css";
import { ProjectType } from "../../../Types/ModelsType";
import ProjectRow from "../ProjectRow/ProjectRow";


type ProjectListProps = {
    projects: ProjectType[]
    deleteProject: (projectId: number) => void
}

export default function ProjectList(props: ProjectListProps) {
    const { projects, deleteProject } = props;


    return(
        <div className="projects-container">
            {projects.map(item =>
                    <ProjectRow key={item.id} project={item} deleteProject={deleteProject}/>    
                )}
        </div>
    
    )
}
