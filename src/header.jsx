import Clock from './time.jsx';
import './header.css';
const Header = () =>{
   const campus = "Next-U Campus de Lyon";
   const rue = "4 Rue Paul Montrechet";
     return(
        <div className="head">
             <div className="nav-1">
               <div className='ecole'>
                  <h2 className="big-font" style={{ background: '-webkit-linear-gradient(left, #00c6fb, #005bea)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '48px' }}>{campus}</h2>
      <p>{rue}</p>
               </div>
      <div className='clock'>
         <Clock/>
      </div>
        </div>
        </div>
     )
}
export default Header;