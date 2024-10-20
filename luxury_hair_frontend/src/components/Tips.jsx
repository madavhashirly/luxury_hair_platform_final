import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../assets/Tips.css";
import Navbar from './Navbar';
import Footer from './Footer';

const Tips = () => {
    const [tipImages, setTipImages] = useState([]);
    const [washingTipImage, setWashingTipImage] = useState(null);
    const [curlyTipImage, setCurlyTipImage] = useState(null);
    const [everydayCareImage, setEverydayCareImage] = useState(null);

    const fetchTipImages = async () => {
        try {
            const response = await axios.get('http://localhost:8080/LuxuryHairVendingSystemDB/tips/get-with-image', {
                responseType: 'json'
            });
            setTipImages(response.data);
            console.log('Fetched tip images:', response.data);
        } catch (error) {
            console.error('Error fetching tip images:', error);
        }
    };

    const fetchWashingTipImage = async () => {
        try {
            const response = await axios.get('http://localhost:8080/LuxuryHairVendingSystemDB/tips/get-with-image/1', {
                responseType: 'json'
            });
            setWashingTipImage(response.data);
            console.log('Fetched washing tip image:', response.data);
        } catch (error) {
            console.error('Error fetching washing tip image:', error);
        }
    };

    const fetchCurlyImage = async () => {
        try {
            const response = await axios.get('http://localhost:8080/LuxuryHairVendingSystemDB/tips/get-with-image/2', {
                responseType: 'json'
            });
            setCurlyTipImage(response.data);
            console.log('Fetched curly tip image:', response.data);
        } catch (error) {
            console.error('Error fetching curly tip image:', error);
        }
    };

    const fetchEverydayCareImage = async () => {
        try {
            const response = await axios.get('http://localhost:8080/LuxuryHairVendingSystemDB/tips/get-with-image/3', {
                responseType: 'json'
            });
            setEverydayCareImage(response.data);
            console.log('Fetched everyday care image:', response.data);
        } catch (error) {
            console.error('Error fetching everyday care image:', error);
        }
    };

    useEffect(() => {
        fetchTipImages();
        fetchWashingTipImage();
        fetchCurlyImage();
        fetchEverydayCareImage();
    }, []);

    return (
        <div className="tips-container">
            <Navbar />
            <div className="complete-Tips">
                <h1>Wig Care Tips</h1>
                <p>Follow these tips to keep your wig looking fresh and natural.</p>

                {tipImages.length > 0 && (
                    <div className="tips-images">
                        {tipImages.map((tip, index) => (
                            <div key={index} className="tip-image-container">
                                <h2>{tip.title}</h2>
                                <img src={`data:image/jpeg;base64,${tip.image}`} alt={tip.title} />
                            </div>
                        ))}
                    </div>
                )}

                <div className="tip-section">
                    <div className="tip-text">
                        <h2>Everyday Care:</h2>
                        <ul>
                            <li><strong>Detangle:</strong> Always detangle your hair using a wide-tooth comb or your fingers before applying any products. Avoid using small combs on curly wigs to prevent shedding and split ends.</li>
                            <li><strong>Moisture:</strong> Keeping your wig moisturized is key. Apply a light moisture product, especially for styles like Deep Wave or Kinky curls, where some shedding is normal.</li>
                        </ul>
                    </div>
                    {everydayCareImage && (
                        <div className="tip-image-container">
                            <img src={everydayCareImage} alt="Everyday Care Tip" />
                        </div>
                    )}
                </div>

                <div className="tip-section">
                    <div className="tip-text">
                        <h2>Washing Tips:</h2>
                        <ul>
                            <li>Step 1: Comb to detangle and remove glue.</li>
                            <li>Step 2: Add Shampoo, preferably Tresemme.</li>
                            <li>Step 3: Soak for 30 minutes to clean up.</li>
                            <li>Step 4: Add Conditioner and wait for 1 hour in the plastic.</li>
                            <li>Step 5: Soak in fresh water.</li>
                            <li>Step 6: Squeeze the water.</li>
                            <li>Step 7: Dry & keep your style.</li>
                        </ul>
                    </div>
                    {washingTipImage && (
                        <div className="tip-image-container">
                            <img src={washingTipImage} alt="Washing Tip" />
                        </div>
                    )}
                </div>

                <div className="tip-section">
                    <div className="tip-text">
                        <h2>Curly Hair Maintenance:</h2>
                        <ul>
                            <li>Avoid brushing curly wigs when dry. Instead, use a wide-tooth comb or your fingers to gently remove tangles when wet.</li>
                            <li>Air dry your wig on a mannequin or wig stand to allow the natural curl pattern to return.</li>
                            <li>Avoid products with mineral oils. Use water-based sprays to keep the curls hydrated.</li>
                        </ul>
                    </div>
                    {curlyTipImage && (
                        <div className="tip-image-container">
                            <img src={curlyTipImage} alt="Curly Tip" />
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Tips;
