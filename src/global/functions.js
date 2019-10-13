const SPEED_MULTIPLIER = 0.3;

// Some helper functions when creating the components
export function getRandomVelocity() {
    return {
        x: SPEED_MULTIPLIER * (2 * Math.random() - 1),
        y: SPEED_MULTIPLIER * (2 * Math.random() - 1)
    };
}

export function getRandomPosition() {
    return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight
    };
}

export function getRandomShape() {
    var primitive = 'box';
    var color = 0xe2736e;
    var borderColor = 0xb74843;

    if (Math.random() >= 0.8) {
        primitive = 'circle';
        color = 0x39c495;
        borderColor = 0x0b845b;
    }

    return {
        primitive: primitive,
        color: color,
        borderColor: borderColor
    };
}