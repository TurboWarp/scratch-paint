import {getSelectedRootItems} from './selection';

const mask = function (onUpdateImage) {
    const [target, ...masks] = getSelectedRootItems();
    let result = target;

    for (let i = 0; i < masks.length; i++) {
        const mask = masks[i];
        const next = result.intersect(mask);
        mask.remove();
        if (i > 0) {
            result.remove();
        }
        result = next;
    };

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

const filter = function (onUpdateImage) {
    const [target, ...filters] = getSelectedRootItems();
    let result = target.clone();

    for (const filter of filters) {
        const next = result.intersect(filter);
        result.remove();
        result = next;
    }

    filters.forEach(filter => {
        filter.subtract(result);
        filter.remove();
        onUpdateImage(filter);
    });
    target.subtract(result);
    result.remove();
    target.remove();
    onUpdateImage(result);
};

const merge = function (onUpdateImage) {
    const [target, ...mergers] = getSelectedRootItems();
    let result = target;

    mergers.forEach(filter => {
        const next = result.unite(filter);
        filter.remove();
        result.remove();
        result = next;
    });

    const lastMerge = mergers.at(-1);
    result.fillColor = lastMerge.fillColor;
    result.strokeColor = lastMerge.strokeColor;
    result.strokeWidth = lastMerge.strokeWidth;

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

const shouldShowFilter = function () {
    const items = getSelectedRootItems();
    if (items.length < 2) {
        return false;
    }
    return true;
};

const shouldShowMerge = function () {
    const items = getSelectedRootItems();
    if (items.length < 2) {
        return false;
    }
    return true;
};

export {
    mask,
    subtract,
    filter,
    merge,
    shouldShowMask,
    shouldShowSubtract,
    shouldShowFilter,
    shouldShowMerge
}