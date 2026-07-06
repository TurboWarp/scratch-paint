import {getSelectedRootItems} from './selection';

const mask = function (onUpdateImage) {
    const [target, ...masks] = getSelectedRootItems();
    let result = target;

    masks.forEach(mask => {
        let next = result.intersect(mask);
        mask.remove();
        result.remove();
        result = next;
    });

    const lastMask = masks.at(-1);
    result.fillColor = lastMask.fillColor;
    result.strokeColor = lastMask.strokeColor;
    result.strokeWidth = lastMask.strokeWidth;

    onUpdateImage(result);
};

const subtract = function (onUpdateImage) {
    const [target, ...cutters] = getSelectedRootItems();
    let result = target;

    cutters.forEach(cutter => {
        const next = result.subtract(cutter);
        cutter.remove();
        result.remove();
        result = next;
    });
    target.remove();

    onUpdateImage(result);
};

const shouldShowMask = function () {
    const items = getSelectedRootItems();
    if (items.length < 2) {
        return false;
    }
    return true;
};

const shouldShowSubtract = function () {
    const items = getSelectedRootItems();
    if (items.length < 2) {
        return false;
    }
    return true;
};

export {
    mask,
    subtract,
    shouldShowMask,
    shouldShowSubtract
}