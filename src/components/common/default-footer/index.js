import Image from "next/image";
import Link from "next/link";
import ContactMeta from "./ContactMeta";
import AppWidget from "./AppWidget";
import Social from "./Social";
import MenuWidget from "./MenuWidget";
import Copyright from "./Copyright";

const Footer = () => {
  return (
    <>
    <footer class='theme bgColor lightFontColor'>
      <div class='container'>
        <div class='list-group'>
          <h5>Quick Search</h5>
          <div class='cities row theme mediumFontColor'>
            <ul class='col-sm-4 col-md-3'>
              <li><a href='#'>Allston, MA</a></li>
              <li><a href='#'>Back Bay, MA</a></li>
              <li><a href='#'>Bay Village, MA</a></li>
              <li><a href='#'>Beacon Hill, MA</a></li>
              <li><a href='#'>Brighton, MA</a></li>
              <li><a href='#'>Charlestown, MA</a></li>
              <li><a href='#'>Chinatown, MA</a></li>
            </ul>
            <ul class='col-sm-4 col-md-3'>
              <li><a href='#'>Dorchester, MA</a></li>
              <li><a href='#'>East Boston, MA</a></li>
              <li><a href='#'>Financial District, MA</a></li>
              <li><a href='#'>Fort Hill, MA</a></li>
              <li><a href='#'>Hyde Park, MA</a></li>
              <li><a href='#'>Jamaica Plain, MA</a></li>
              <li><a href='#'>Leather District, MA</a></li>
            </ul>
            <ul class='col-sm-4 col-md-3'>
              <li><a href='#'>Mattapan, MA</a></li>
              <li><a href='#'>Midtown, MA</a></li>
              <li><a href='#'>Mission Hill, MA</a></li>
              <li><a href='#'>North End, MA</a></li>
              <li><a href='#'>Roslindale, MA</a></li>
              <li><a href='#'>Roxbury, MA</a></li>
              <li><a href='#'>Seaport District, MA</a></li>
            </ul>
            <ul class='col-sm-4 col-md-3'>
              <li><a href='#'>South Boston, MA</a></li>
              <li><a href='#'>South End, MA</a></li>
              <li><a href='#'>The Fenway, MA</a></li>
              <li><a href='#'>Theatre District, MA</a></li>
              <li><a href='#'>Waterfront, MA</a></li>
              <li><a href='#'>West End, MA</a></li>
              <li><a href='#'>West Roxbury, MA</a></li>
            </ul>
          </div>
        </div>
        <div class='copyright'>
          <a href='index.html' class='footer-brand'>&copy; Company, Inc.</a>
          <a href='http://ULTRAMLS.com' class='powered-by'>Powered by <strong>ULTRAMLS &trade;</strong></a>
        </div>
        <div class='fineprint theme mediumFontColor'>
          <p>The property listing data and information set forth herein were provided to MLS Property Information Network, Inc. from third party sources, including sellers, lessors and public records, and were compiled by MLS Property Information Network, Inc.</p>
        </div>
      </div>
    </footer>
    </>
  );
};

export default Footer;
