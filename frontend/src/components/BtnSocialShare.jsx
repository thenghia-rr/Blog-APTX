import propTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaRedditSquare,
  FaWhatsappSquare,
} from "react-icons/fa";

const BtnSocialShare = ({ url, title }) => {
  return (
    <div className="flex justify-center w-full gap-x-3">
      <Link
        to={`https://www.facebook.com/dialog/share?app_id=1091542925193195&display=popup&to=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        <FaFacebookSquare className="text-[#3b5998] w-12 h-auto" />
      </Link>
      <Link
        target="_blank"
        rel="noreferrer"
        to={`https://twitter.com/intent/tweet?url=${url}`}
      >
        <FaTwitterSquare className="text-[#00acee] w-12 h-auto" />
      </Link>
      <Link
        target="_blank"
        rel="noreferrer"
        to={`http://www.reddit.com/submit?url=${url}&title=${title}`}
      >
        <FaRedditSquare className="text-[#ff4500] w-12 h-auto" />
      </Link>
      <Link
        target="_blank"
        rel="noreferrer"
        to={`https://api.whatsapp.com/send/?text=${url}`}
      >
        <FaWhatsappSquare className="text-[#25D366] w-12 h-auto" />
      </Link>
    </div>
  );
};

BtnSocialShare.propTypes = {
  url: propTypes.any,
  title: propTypes.any,
};
export default BtnSocialShare;
