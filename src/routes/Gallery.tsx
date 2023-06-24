import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const PAGE_PADDING = 20;
const IMAGE_PADDING = 10;
const IMAGE_MIN_SIZE = 420;
const MAX_COLUMNS = 3;
const GALLERY_MAX_WIDTH = (MAX_COLUMNS + 1) * (IMAGE_MIN_SIZE + 2 * IMAGE_PADDING)

interface GalleryProps {
    images: any,
    folder: string,
}

export default function Gallery({ images, folder }: GalleryProps) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        function onResize() {
            setWindowWidth(window.innerWidth);
        }

        window.addEventListener('resize', onResize);
    });

    const columnCount = useMemo(() => {
        const count = Math.min(
            MAX_COLUMNS,
            (windowWidth - (PAGE_PADDING * 2)) / (IMAGE_MIN_SIZE + (IMAGE_PADDING * 2))
        );
        console.log(count);
        return parseInt(count.toFixed(0));
    }, [windowWidth]);
    const imageSize = ((Math.min(windowWidth, GALLERY_MAX_WIDTH) - (PAGE_PADDING * 2)) / columnCount) - IMAGE_PADDING * 2 * columnCount;

    const chunkedImages = useMemo(() => {
        const chunks = [];
        for (let i = 0; i < images.length; i += columnCount) {
            chunks.push(images.slice(i, i + columnCount))
        }
        return chunks;
    }, [columnCount])

    return (
        <div
            id="gallery"
            style={{
                maxWidth: GALLERY_MAX_WIDTH,
            }}
        >
            {chunkedImages.map(chunk => (
                <div className="gallery-row">
                    {chunk.map((image: { id: any; src: string | undefined; }) => (
                        <div
                            className="gallery-image-background"
                            style={{
                                width: imageSize,
                                height: imageSize,
                            }}
                        >
                            <Link to={`/${folder}/image/${image.id}`}>
                                <img
                                    className="gallery-image"
                                    style={{
                                        width: imageSize,
                                        height: imageSize,
                                    }}
                                    src={image.src}
                                />
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}