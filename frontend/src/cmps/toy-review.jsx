import { useEffect, useState } from "react"
import { reviewService } from "../services/review.service"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service"



export function ToyReview({ toy, loggedinUser }) {
    const [reviews, setReviews] = useState(null)
    const [reviewToEdit, setReviewToEdit] = useState(null)


    useEffect(() => {
        if (toy) loadReviews()
    }, [toy])

    useEffect(() => {
        if (!reviewToEdit) loadReviews()
    }, [reviewToEdit])


    function loadReviews() {
        const filterBy = { toyId: toy._id }
        reviewService.query(filterBy)
            .then((item) => {
                console.log('item', item)
                setReviews(item)
            })
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setReviewToEdit(prevReview => ({ ...prevReview, [field]: value }))
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        try {
            await reviewService.save(reviewToEdit)
            showSuccessMsg('Review saved!')

        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot save review')
        }
        finally {
            setReviewToEdit(null)
        }
    }

    async function onRemoveReview(ev, reviewId) {
        ev.preventDefault()
        try {
            await reviewService.remove(reviewId)
            showSuccessMsg('Review removed')

        } catch (err) {
            console.log('err', err)
            showErrorMsg('Cannot remove review')
        }
    }

    function onNewReview(ev) {
        ev.preventDefault()
        if (!reviewToEdit) setReviewToEdit({ txt: '', toyId: toy._id })
        else setReviewToEdit(null)
    }


    if (!reviews) return <span></span>
    return (
        <section className="toy-review">
            <h2>Reviews:</h2>
            {
                loggedinUser && loggedinUser.isAdmin &&
                <button onClick={(ev) => onNewReview(ev)}>{reviewToEdit ? 'Cancel Review' : 'Add a new Review'}</button>
            }
            {reviewToEdit && (
                <section>
                    Please add text for your review:
                    <form onSubmit={onSaveReview}>
                        <input
                            id="addReview"
                            type="text"
                            name="txt"
                            value={reviewToEdit.txt}
                            onChange={handleChange}
                        />
                        <button>Add Review</button>
                    </form>
                </section>
            )}
            {
                reviews.length > 0 && (
                    <ul>
                        {reviews.map(review => (
                            <li className="review-preview" key={review._id}>
                                <h2><button
                                    className="custom-button-remove"
                                    onClick={(ev) => onRemoveReview(ev, review._id)}
                                >X</button><span>{review.byUser.fullname}: </span>   {review.txt}</h2>

                            </li>
                        ))}
                    </ul>
                )
            }
        </section>
    )
}