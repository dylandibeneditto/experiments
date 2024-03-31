const canvas = document.getElementById("canvas")

const c = canvas.getContext('2d')

const fileInput = document.querySelector('input[type="file"]');

fileInput.onchange = e => {
    // just handling single file upload
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = event => {
        const image = new Image();
        image.onload = () => {
            const [width, height] = clampDimensions(image.width, image.height)

            canvas.width = width;
            canvas.height = height;

            c.drawImage(image, 0, 0, width, height);
            const grayScales = convertToGrayScales(c, width, height);

            drawAscii(grayScales, width);
        };

        image.src = event.target.result;
    };

    reader.readAsDataURL(file);
};

const toGrayScale = (r, g, b) => 0.21 * r + 0.72 * g + 0.07 * b;

const convertToGrayScales = (context, width, height) => {
    const imageData = context.getImageData(0, 0, width, height);

    const grayScales = [];

    for (let i = 0; i < imageData.data.length; i += 4) {
        const r = imageData.data[i];
        const g = imageData.data[i + 1];
        const b = imageData.data[i + 2];

        const grayScale = toGrayScale(r, g, b);
        imageData.data[i] = imageData.data[i + 1] = imageData.data[
            i + 2
        ] = grayScale;

        grayScales.push(grayScale);
    }

    context.putImageData(imageData, 0, 0);

    return grayScales;
};

const grayRamp = "@MBHENR#KWXDFPQASUZbdehx*8Gm&04LOVYkpq5Tagns69owz$CIu23Jcfry%1v7l+it[] {}?j|()=~!-/<>\"^_';,:`. "

const getGrayRampCharacter = grayScale =>
    grayRamp[Math.ceil(((grayRamp.length - 1) * grayScale) / 255)]

const asciiEl = document.querySelector("pre#ascii")

const drawAscii = grayScales => {
    const ascii = grayScales.reduce((asciiEl, grayScale, index) => {
        let nextChars = getGrayRampCharacter(grayScale)

        if ((index + 1) % canvas.width === 0) {
            nextChars += "\n";
        }
        return asciiEl + nextChars;
    }, "")
    console.log(ascii)
    asciiEl.textContent = ascii
}

const MAXIMUM_WIDTH = 100;
const MAXIMUM_HEIGHT = 100;

const clampDimensions = (width, height) => {
    if (height > MAXIMUM_HEIGHT) {
        const reducedWidth = Math.floor((width * MAXIMUM_HEIGHT) / height);
        return [reducedWidth, MAXIMUM_HEIGHT];
    }

    if (width > MAXIMUM_WIDTH) {
        const reducedHeight = Math.floor((height * MAXIMUM_WIDTH) / width);
        return [MAXIMUM_WIDTH, reducedHeight];
    }

    return [width, height];
};