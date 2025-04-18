import { EventEmitter } from 'events';

// updating boxes
const eventEmitter = new EventEmitter();

export const BoxEvents = {
    onBoxesChanged: (callback) => {
        eventEmitter.on('boxesChanged', callback);
        return () => {
            eventEmitter.off('boxesChanged', callback);
        }
    },
    emitBoxesChanged: () => {
        eventEmitter.emit('boxesChanged');
    },
}