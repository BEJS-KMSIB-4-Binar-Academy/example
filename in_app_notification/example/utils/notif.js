const {Notification} = require('../models');

module.exports = {
    createInAppNotification: (notifications) => {
        try {
            notifications.forEach(async notification => {
                await Notification.create({
                    title: notification.title,
                    body: notification.body,
                    user_id: notification.user_id,
                    is_read: false
                });
            });
        } catch (err) {
            console.log(err);
        }
    }
};