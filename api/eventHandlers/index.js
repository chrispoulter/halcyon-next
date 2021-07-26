import { sendEmailHandler } from './sendEmailHandler';
import { captureMessage, captureError } from '../utils/logger';

const handlers = {
    SEND_EMAIL: sendEmailHandler
};

export const handler = async event => {
    for (const record of event.Records) {
        const message = JSON.parse(record.Sns.Message);

        captureMessage('event', message);

        try {
            const eventHandler = handlers[message.type];
            if (!eventHandler) {
                throw new Error(`Unknown event type: ${message.type}`);
            }

            await eventHandler(message.data);
        } catch (error) {
            captureError('event', {
                ...message,
                error
            });
        }
    }
};
