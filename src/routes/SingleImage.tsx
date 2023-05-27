import { Link, useParams } from "react-router-dom";
import { images } from "../img/all";

export default function SingleImage() {
    const { id } = useParams();
    const image = images.find(img => img.id.toString() == id);

    const content = image
        ? <img src={image.src} />
        : <div className="no-image">No image with id "{id}" was found.</div>;

    const renderPrev = () => {
        if (image && image.id > 0) {
            return <Link to={`/image/${image.id - 1}`}>
                Prev
            </Link>
        }
        return (<span className="link-disabled">Prev</span>);
    }

    const renderNext = () => {
        if (image && image.id < images.length - 1) {
            return <Link to={`/image/${image.id + 1}`}>
                Next
            </Link>
        }
        return (<span className="link-disabled">Next</span>);
    }

    const renderNav = () => {
        return (
            <div className="singleimage-nav">
                {renderPrev()}
                /
                <Link
                    to='/'
                    className="singleimage-nav-back">
                    Back to Portfolio
                </Link>
                /
                {renderNext()}
            </div>
        )
    }

    window.scrollTo(0, 0);

    return (
        <div className="center">
            {renderNav()}
            {content}
            {renderNav()}
        </div>
    );
}