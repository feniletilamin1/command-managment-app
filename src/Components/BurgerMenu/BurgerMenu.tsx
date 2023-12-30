import './BurgerMenu.css';

type BurgerMenuProps = {
    handler: Function,
    setRef: React.LegacyRef<HTMLDivElement>,
}

export default function BurgerMenu(props: BurgerMenuProps) {
    const {handler, setRef} = props;
    return (
        <div onClick={() => handler()} ref={setRef} className="burger-menu">
            <div className="burger-menu__line"></div>
        </div>
    )
}