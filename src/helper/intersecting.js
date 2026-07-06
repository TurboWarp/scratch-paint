import {getSelectedRootItems} from './selection';
import paper from '@turbowarp/paper';

const mask = function (onUpdateImage) {
    const [target, mask] = getSelectedRootItems();
    const newMask = mask.intersect(target);

    newMask.fillColor = mask.fillColor;
    newMask.strokeColor = mask.strokeColor;
    newMask.strokeWidth = mask.strokeWidth;
    mask.remove();
    
    onUpdateImage(newMask);
};

const shouldShowMask = function () {
    const items = getSelectedRootItems();
    if (items.length !== 2) {
        return false;
    }
    return true;
};

export {
    mask,
    shouldShowMask
}