export default function perlinVectors(width, height, scale = 20, octaves = 5, persistence = 6, lacunarity = 2.0, seed = null) {
    function perlin(x, y) {
        const x0 = Math.floor(x);
        const y0 = Math.floor(y);
        const x1 = x0 + 1;
        const y1 = y0 + 1;

        const dx = x - x0;
        const dy = y - y0;

        const dotTopLeft = dotGridGradient(x0, y0, x, y);
        const dotTopRight = dotGridGradient(x1, y0, x, y);
        const dotBottomLeft = dotGridGradient(x0, y1, x, y);
        const dotBottomRight = dotGridGradient(x1, y1, x, y);

        const wx = smoothstep(dx);
        const wy = smoothstep(dy);

        const top = lerp(dotTopLeft, dotTopRight, wx);
        const bottom = lerp(dotBottomLeft, dotBottomRight, wx);

        return lerp(top, bottom, wy);
    }

    function dotGridGradient(ix, iy, x, y) {
        const dx = x - ix;
        const dy = y - iy;
        const gradient = gradients[ix % gradients.length][iy % gradients[0].length];
        return dx * gradient[0] + dy * gradient[1];
    }

    function lerp(a, b, t) {
        return a + t * (b - a);
    }

    function smoothstep(t) {
        return t * t * (3 - 2 * t);
    }

    function generateGradients() {
        const gradients = new Array(width).fill(null).map(() => new Array(height).fill(null).map(() => {
            const angle = Math.random() * 2 * Math.PI;
            return [Math.cos(angle), Math.sin(angle)];
        }));
        return gradients;
    }

    const gradients = generateGradients();
    const noise = new Array(width).fill(null).map(() => new Array(height).fill(null));

    for (let octave = 0; octave < octaves; octave++) {
        const octaveNoise = new Array(width).fill(null).map(() => new Array(height).fill(null));
        const octaveScale = scale * (lacunarity ** octave);

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                const x = i / octaveScale;
                const y = j / octaveScale;
                octaveNoise[i][j] = perlin(x, y) * persistence ** octave;
            }
        }

        for (let i = 0; i < width; i++) {
            for (let j = 0; j < height; j++) {
                noise[i][j] += octaveNoise[i][j];
            }
        }
    }

    // Normalize to [0, 1]
    let minVal = Number.MAX_VALUE;
    let maxVal = Number.MIN_VALUE;
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            if (noise[i][j] < minVal) minVal = noise[i][j];
            if (noise[i][j] > maxVal) maxVal = noise[i][j];
        }
    }
    for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
            noise[i][j] = ((noise[i][j] - minVal)*(2*Math.PI)) / (maxVal - minVal);
        }
    }

    return noise;
}