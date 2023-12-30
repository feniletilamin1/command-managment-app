import './Layout.css';
import { ReactNode } from "react";

type LayoutProps = {
    title?: string,
    children: ReactNode,
}

export default function Layout(props: LayoutProps) {
    const {title, children } = props
    return (
        <section className="section">
            <div className="container">
                {title && <h1 className="section__title">{title}</h1>}
                {children}
            </div>
        </section>
    );
}