require('dotenv').config();
const express = require('express');
const app = express();
const {HTTP_PORT = 3000} = process.env;
const {Notification} = require('./models');
const notifUtil = require('./utils/notif');

app.post('/notifications', async (req, res, next) => {
    try {
        const notifications = [
            {
                user_id: 1,
                title: 'contoh judul',
                body: 'contoh body',
            }
        ];
        notifUtil.createInAppNotification(notifications);

        return res.status(200).json({
            status: true,
            message: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
});

app.get('/notifications/', async (req, res, next) => {
    try {
        const {user_id} = req.query;
        if (!user_id) {
            return res.status(400).json({
                status: false,
                message: 'user_id is required!',
                notifications: null
            });
        }

        const notifications = await Notification.findAll({where: {user_id: user_id}});
        return res.status(200).json({
            status: true,
            message: 'success',
            data: notifications
        });
    } catch (err) {
        next(err);
    }
});

app.put('/notifications/:notif_id/read', async (req, res, next) => {
    try {
        const {notif_id} = req.params;

        const updated = await Notification.update({is_read: true}, {where: {id: notif_id}});
        if (updated[0] == 0) {
            return res.status(404).json({
                status: false,
                message: `notif with id ${notif_id} is does't exist!`,
                data: null
            });
        }

        return res.status(200).json({
            status: true,
            message: 'success',
            data: null
        });
    } catch (err) {
        next(err);
    }
});

app.listen(HTTP_PORT, () => console.log('listening on port', HTTP_PORT));