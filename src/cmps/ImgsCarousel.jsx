import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
import { ReactComponent as AngleLeft } from '../assets/img/icons/angle-left.svg'
import { ReactComponent as AngleRight } from '../assets/img/icons/angle-right.svg'
import { LoadingSpinner } from './LoadingSpinner';


export function ImgsCarousel({ imgUrls }) {

    let [current, setCurrent] = useState(0)
    // let [translateX, setTranslate] = useState(0) //
    const length = imgUrls.length

    const nextSlide = (ev) => {
        ev.preventDefault()
        setCurrent(current === length - 1 ? 0 : current + 1)
        
        // setTranslate(translateX -= 1000) //
    }

    const prevSlide = (ev) => {
        ev.preventDefault()
        setCurrent(current === 0 ? length - 1 : current - 1)

        // setTranslate(translateX += 1000) //
    }


    const skipToSlide = (ev) => {
        ev.preventDefault()
        const idx = +ev.target.id
        console.log('idx:', idx);
        setCurrent(idx)
    }

    // imgUrls.style.transform = `translateX(${translateX}px)` //

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
                        // return <input key={index} type="radio" id={index}/>
                    )
                })}
            </div>
        </div>


    )
}


    // const changeImg = ({ target }) => {
    //     const carouselImgs = [
    //         'https://via.placeholder.com/300',
    //         'https://via.placeholder.com/300',
    //         'https://via.placeholder.com/300',
    //         'https://via.placeholder.com/300',
    //         'https://via.placeholder.com/300'
    // ]
    //     var numOfImgs = carouselImgs.length
    //     console.log(numOfImgs);
    //     let imgIdx = 1
    //     let translateX = 0

    //     const { value } = target
    //     console.log(value);
    //     if (value === 'previous') {
    //         if (imgIdx !== 1) {
    //             imgIdx--
    //             translateX += 300
    //         }
    //     } else {
    //         if (imgIdx !== numOfImgs) {
    //             imgIdx++
    //             translateX -= 300
    //         }
    //     }

    //     carouselImgs.style.transform = `translateX(${translateX}px)`
    // }


    // <div className="carousel">
        //     <button className="carousel__btn previous"
        //         value="previous" onClick={changeImg}>
        //         {"<"}</button>

        //     <div className="carousel__imgs">
        //         <img src="https://via.placeholder.com/300" alt="" />
        //         <img src="https://via.placeholder.com/300" alt="" />
        //         <img src="https://via.placeholder.com/300" alt="" />
        //         <img src="https://via.placeholder.com/300" alt="" />
        //         <img src="https://via.placeholder.com/300" alt="" />
        //     </div>

        //     <button className="carousel__btn next"
        //         value="next" onClick={changeImg}>
        //         {">"}</button>
        // </div>