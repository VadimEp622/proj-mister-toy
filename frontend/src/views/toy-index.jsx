import { useDispatch, useSelector } from 'react-redux'
import { loadToys } from '../store/toy.action.js'


export function ToyIndex() {
    const toys = useSelector(state => state.toyModule.toys)


    useEffect(() => {
        loadToys()
    }, [])

    return (
        <section className="toy-index">
            <h2 className="text-align-center">hello from index</h2>
        </section>
    )
}