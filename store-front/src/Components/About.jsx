import {useEffect, useRef} from 'react';
import {FaShippingFast} from "react-icons/fa";
import {IoIosLock} from "react-icons/io";
import {AiFillCustomerService} from "react-icons/ai"
import {Link, useOutletContext} from 'react-router-dom';

const About = () => {
    const aboutRef = useRef();
    const {setClickLink, clickedLink, lastPos, setLastPos} = useOutletContext();

    useEffect(() => {
        if (clickedLink) {
            let pos = aboutRef.current.getBoundingClientRect().top;
            if (pos < lastPos) {
                pos = lastPos;
            }
            console.log("clicked link useeffect: " + pos);
            window.scrollTo({top: pos});
            setClickLink(false);
        }
    }, [clickedLink]);

    useEffect(() => {
        let pos = aboutRef.current.getBoundingClientRect().top;
        if (lastPos < pos) {
            setLastPos(pos);
        }
        // if(lastPos < pos) {
        // 	console.log('potential bug');
        // 		window.scrollTo({top: pos});
        // 	// console.log(pos + '| lastPos: ' +  lastPos);
        // 	setLastPos(pos);
        // }
    }, [aboutRef?.current?.getBoundingClientRect().top]);

    return (
        <div className='about container' id='about' ref={aboutRef}>
            <h1 className='about-title'>About Dorothy</h1>
            <p className="about-info">
                Welcome to Dorothy Plushies, where cuddles and creativity come to life! Founded with a passion for
                bringing joy and comfort to children and adults alike, Dorothy Plushies specializes in creating
                high-quality, uniquely designed plush toys that spark the imagination and warm the heart.
            </p>
            <div className="about-table">
                <div className="cell">
                    <FaShippingFast size={25}/>
                    <h2 className="cell-title">Free Shipping</h2>
                    <p className='cell-text'>Free worldwide shipping and returns - customs and duties taxes
                        included.</p>
                </div>
                <div className="cell">
                    <AiFillCustomerService size={25}/>
                    <h2 className="cell-title">Customer Service</h2>
                    <p className='cell-text'>We are available from monday to friday to answer your questions. Just send
                        us an email at <span className='bold'>dorothy@shop.com</span></p>
                </div>
                <div className="cell">
                    <IoIosLock size={26} style={{marginBottom: '4px'}}/>
                    <h2 className="cell-title">Secure Payment</h2>
                    <p className='cell-text'>We partner with Stripe to make sure that your payment information is
                        processed securely.</p>
                </div>
            </div>
            <Link to='/products' className="button">View All Products</Link>
        </div>
    )
}

export default About;