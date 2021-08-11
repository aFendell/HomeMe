import React, { useState } from 'react';
import { ReactComponent as AngleLeft } from '../assets/img/icons/angle-left.svg'
import { ReactComponent as AngleRight } from '../assets/img/icons/angle-right.svg'
import { LoadingSpinner } from './LoadingSpinner';


export function ImgsCarousel({ imgUrls }) {

    let [current, setCurrent] = useState(0)
    const length = imgUrls.length

    const nextSlide = (ev) => {
        ev.preventDefault()
        setCurrent(current === length - 1 ? 0 : current + 1)
        
    }

    const prevSlide = (ev) => {
        ev.preventDefault()
        setCurrent(current === 0 ? length - 1 : current - 1)

    }


    const skipToSlide = (ev) => {
        ev.preventDefault()
        const idx = +ev.target.id
        console.log('idx:', idx);
        setCurrent(idx)
    }


    if (!imgUrls || imgUrls <= 0) return <LoadingSpinner/>
    return (

        <div className="slider">
            <section className="arrows">

            <AngleLeft className="left-arrow" onClick={prevSlide} />
            <AngleRight className="right-arrow" onClick={nextSlide} />
            </section>

            <div className="imgs">

                {imgUrls.map((img, index) => {
                    return (
                        <div className={index === current ? 'slide active' : 'slide'} key={index}>
                            {index === current && (<img src={img} alt="stay" />)}
                        </div>
                    )
                })}

            </div>

            <div className="indicators">
                {imgUrls.map((img, index) => {
                    return (
                        <div className={index === current ? 'dot active' : 'dot'} key={index} id={index} onClick={skipToSlide}></div>
                    )
                })}
            </div>
        </div>


    )
}


    