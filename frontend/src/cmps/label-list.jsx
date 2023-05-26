import { useEffect, useState } from "react"
import { useSelector } from 'react-redux'
export function LabelList({ labels, handleChange }) {
    const totalLabels = useSelector(state => state.toyModule.totalLabels)




    return (
        <section className="label-selector">
            {totalLabels.map(label => (
                <article key={label}>
                    <input
                        type="checkbox"
                        name="labels"
                        data-label-name={label}
                        value={labels.includes(label)}
                        checked={labels.includes(label)}
                        onChange={handleChange} />
                    <label>{label}</label>
                </article>
            ))}
        </section>
    )
}

