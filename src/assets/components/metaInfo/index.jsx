import { CgComment, CgEye } from "react-icons/cg";
import { PiClockCountdownFill } from "react-icons/pi";

import PropTypes from "prop-types";
import { manipulateDate2 } from "../../custom";

export const AuthorTime = ({ author, date, comments, readTime, between }) => (
  /* This consists of the Author information and a formatted date. */
  <div
    className={`d-flex fs-13 fs-11-mobile fw-bold ${
      between ? "justify-content-between" : "justify-content-around"
    }`}
  >
    <p>
      {author}, {manipulateDate2(date)}
    </p>
    <p className="d-none">
      <CgComment className="mx-2" /> {comments}
    </p>
    {readTime && (
      <p>
        <PiClockCountdownFill className="mx-1" /> {readTime} min(s) read
      </p>
    )}
  </div>
);

export const ViewComment = ({ comment = 0, views = 0 }) => (
  <div className="d-flex align-items-center d-none">
    <CgComment className="me-2" /> {comment} <CgEye className="ms-4 me-2"/> {views}
  </div>
);

AuthorTime.propTypes = {
  author: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comments: PropTypes.number.isRequired,
  readTime: PropTypes.string,
  between: PropTypes.bool,
};

ViewComment.propTypes = {
  comment: PropTypes.number,
  views: PropTypes.number,
}
