import React from 'react'
import './CategorySlider.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from 'react-slick'


export default function CategorySlider() {


    function getData() {
        return axios.get("https://route-ecommerce.onrender.com/api/v1/categories")
    }
    const { data } = useQuery('CategorySlider', getData)


    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
    };

    return (

        <Slider {...settings}>
            {data?.data.data.map((category) => <>
                <div className="container-flued ">
                    <div className="my-3">
                        <div className='Category-slider-img d-flex align-items-center justify-content-center'>
                            <img src={category.image} alt={category.name} />
                        </div>
                        <h4>{category.name}</h4>
                    </div>
                </div>
            </>)}
        </Slider>
    )
}








