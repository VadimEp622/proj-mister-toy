const { useSelector } = ReactRedux

export function AppFooter() {
    const progress = useSelector(storeState => storeState.todoModule.progress)

    return (
        <footer className="app-footer">
            <h2>Project by Vlad</h2>
            <p>Completed: {progress}</p>
        </footer>
    )
}