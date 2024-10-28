import React from 'react';
import { Images } from "../../../../assets/assets";

function WhyChoose({ abouts }) {
    // Function to determine the background class
    const getBackgroundClass = (section) => {
        switch (section) {
            case 3:
                return 'green-bg';
            case 4:
                return 'green-bg';
            case 5:
                return 'yellow-bg';
            case 6:
                return 'pink-bg';
            default:
                return '';
        }
    };
    // Function to determine the image source
    const getImageSource = (section) => {
        switch (section) {
            case 4:
                return Images.WhyChoose1;
            case 5:
                return Images.WhyChoose2;
            case 6:
                return Images.WhyChoose3;
            default:
                return Images.WhyChoose1; // default image
        }
    };
    const aboutSection3 = abouts?.slice(2, 6).find(about => about.section === 3);
    // Collect the col-lg-4 elements
    const columns = abouts?.slice(3, 6).map((about, index) => (
        <div className='col-md-4 col-sm-6 mb-md-0 mb-3' key={index}>
            <div className='why-choose-box white-box'>
                <div className={`why-choose-img ${getBackgroundClass(about.section)}`}>
                    <img src={getImageSource(about.section)} className="img-fluid logo-image" alt="img" />
                </div>
                <h4 className='mt-xl-3 mt-2'>{about.title}</h4>
                <p className='mt-xl-3 mt-2'>
                    {about.content}
                </p>
            </div>
        </div>
    ));

    return (
        <div>
            <section className='why-choose gradientb--bg-wraper'>
                <div className="theme__container">
                    {aboutSection3 && (
                        <div className='section-heading-wraper'>
                            <div className="fency-heading d-flex flex-column align-items-center justify-content-center text-center">
                                <h5>{aboutSection3.title}</h5>
                                <h2>{aboutSection3.sub_title}</h2>
                            </div>
                        </div>
                    )}
                    <div className='row pt-50'>
                        {columns}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default WhyChoose;