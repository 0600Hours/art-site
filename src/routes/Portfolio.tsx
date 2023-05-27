import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { images } from "../img/all";

const PAGE_PADDING = 20;
const IMAGE_PADDING = 5;
const IMAGE_MIN_SIZE = 420;
const MAX_COLUMNS = 5;
const PORTFOLIO_MAX_WIDTH = (MAX_COLUMNS + 1) * (IMAGE_MIN_SIZE + 2 * IMAGE_PADDING)

export default function Portfolio() {
    const [windowWidth, setWindowWidth] = useState(document.documentElement.clientWidth)

    useEffect(() => {
        function onResize() {
            setWindowWidth(document.documentElement.clientWidth);
        }

        window.addEventListener('resize', onResize);
    });

    const columnCount = Math.min(
        MAX_COLUMNS,
        Math.floor(
            (windowWidth - (PAGE_PADDING * 2)) / (IMAGE_MIN_SIZE + (IMAGE_PADDING * 2))
        )
    );
    const imageSize = ((Math.min(windowWidth, PORTFOLIO_MAX_WIDTH) - (PAGE_PADDING * 2)) / columnCount) - IMAGE_PADDING * 2;

    const chunkedImages = useMemo(() => {
        const chunks = [];
        for (let i = 0; i < images.length; i += columnCount) {
            chunks.push(images.slice(i, i + columnCount))
        }
        return chunks;
    }, [columnCount])

    const onImageClick = (src: string) => {
        window.open(src, '_blank', 'noopener,noreferrer')
    }

    return (
        <div
            id="portfolio"
            style={{
                maxWidth: PORTFOLIO_MAX_WIDTH,
            }}
        >
            {chunkedImages.map(chunk => (
                <div className="portfolio-row">
                    {chunk.map(image => (
                        <div
                            className="portfolio-image-background"
                            style={{
                                width: imageSize,
                                height: imageSize,
                            }}
                        >
                            <img
                                className="portfolio-image"
                                style={{
                                    width: imageSize,
                                    height: imageSize,
                                }}
                                src={image}
                                onClick={() => {
                                    onImageClick(image)
                                }}
                            />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}