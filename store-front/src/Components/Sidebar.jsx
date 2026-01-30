import {Link} from "react-router-dom";
import {IoClose} from "react-icons/io5";

export const Sidebar = ({sidebar, setSidebar, categories}) => {
    const closeSidebar = (e) => {
        if (e.target.className == 'cart-overlay') {
            setSidebar(false);
        }
    }
    return (
        <div
            className={sidebar ? "cart-overlay sidebar-overlay" : "sidebar-abs"}
            onClick={(e) => closeSidebar(e)}
        >
            <div
                className='cart sidebar'
                style={
                    sidebar ? {transform: 'translateX(0%)'} : {transform: 'translateX(-100%)'}
                }
            >
                <div className="cart-top sidebar-top">
                    <Link to='/' className="cart-title logo">
                        <p>Dororty</p>
                    </Link>
                    <IoClose
                        className='close-cart'
                        size={35}
                        onClick={() => setSidebar(false)}
                    />
                </div>

                <Link className='sidebar-item' to='/products'>All Products</Link>
                {
                     categories.map((category, i) => {
                        return (
                            <Link key={i} to={`collections/${category.id}`}
                                  className='sidebar-item'>{category.title}</Link>
                        )
                    })
                }
            </div>
        </div>

    )
}