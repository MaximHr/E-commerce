import {Link} from 'react-router-dom';

const Cancel = () => {
    return (
        <div className='about container cancel'>
            <h1 className='about-title'>The payment was not completed !</h1>
            <p className='about-info'>Unfortunately, we were unable to process your online payment. Please resubmit your
                payment. Thank you.</p>
            <Link to='/' className='button'>Back to home page</Link>
        </div>
    )
}

export default Cancel;