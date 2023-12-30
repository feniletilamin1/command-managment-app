import Layout from '../../Components/Layout/Layout';
import { UserType } from '../../Types/ModelsType';
import './HomePage.css';

import { Link } from "react-router-dom";

type HomePageProps = {
    user: UserType | null,
}

export default function HomePage (props: HomePageProps) {
    document.title = "WorkFlow - Главная";

    const { user } = props

    return (
        <>
            <Layout>
                <section className="project">
                    <h1 className="project__title">Work Flow</h1>
                    <p className="project__description">Эффективное планирование и взаимодействие проектов</p>
                    {!user && 
                        <Link to="/register" className="project__button">Начать</Link>
                    }
                    {user && 
                        <Link to="/projects" className="project__button">К проектам</Link>
                    }
                </section>

                <section className="features">
                    <div className="feature">
                        <h2 className="feature__title">Планирование</h2>
                        <p className="feature__description">Создавайте детальные планы проектов и следите за их выполнением.</p>
                    </div>
                    <div className="feature">
                        <h2 className="feature__title">Анализ</h2>
                        <p className="feature__description">Проводите анализ результатов проектов для постоянного улучшения процессов.</p>
                    </div>
                    <div className="feature">
                        <h2 className="feature__title">Коммуникация</h2>
                        <p className="feature__description">Обеспечивайте эффективное взаимодействие внутри команды и с заказчиками.</p>
                    </div>
                </section>
            </Layout>
        </>
    )
}
