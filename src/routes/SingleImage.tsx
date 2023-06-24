import { Link, useParams } from "react-router-dom";

interface SingleImageProps {
    images: any,
    folder: string,
}

function capitalize(s: string) {
    return s && s[0].toUpperCase() + s.slice(1);
}

export default function SingleImage({ images, folder }: SingleImageProps) {
    const { id } = useParams();
    const image = images.find((img: { id: { toString: () => any; }; }) => img.id.toString() == id);

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
                    to={`/${folder == 'portfolio' ? '' : folder}`}
                    className="singleimage-nav-back">
                    Back to {capitalize(folder)}
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