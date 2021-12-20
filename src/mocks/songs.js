const moment = require('moment');


export const mockSongs = {
    '2020-01-20': {
        'songs': [
            {
                'name': 'this is a song',
                'owner': 'todd',
                'date': moment('2021-01-01 00:00:00', 'YYYY-MM-DD HH:mm:SS'),
                'ratings': {
                    'todd': 5,
                    'taylor': 4,
                    'alex': 3,
                    'sneh': 2,
                    'grant': 1,
                    'emma': 5,
                    'tanner': 5
                }
            },
            {
                'name': 'this is taylors song',
                'owner': 'taylor',
                'date': moment('2021-01-01 05:00:00', 'YYYY-MM-DD HH:mm:SS'),
                'ratings': {
                    'todd': 1,
                    'taylor': 5,
                    'alex': 1,
                    'sneh': 1,
                    'grant': 1,
                    'emma': 1,
                    'tanner': 1
                }
            },
            {
                'name': 'this is alex song',
                'owner': 'alex',
                'date': moment('2021-01-01 08:00:00', 'YYYY-MM-DD HH:mm:SS'),
                'ratings': {
                    'todd': 1,
                    'taylor': 5,
                    'alex': 1,
                    'sneh': 1,
                    'grant': 1,
                    'emma': 1,
                    'tanner': 1
                }
            },
            {
                'name': 'this is sneh song',
                'owner': 'sneh',
                'date': moment('2021-01-01 07:00:00', 'YYYY-MM-DD HH:mm:SS'),
                'ratings': {
                    'todd': 1,
                    'taylor': 5,
                    'alex': 1,
                    'sneh': 1,
                    'grant': 1,
                    'emma': 1,
                    'tanner': 1
                }
            }
        ]
    }
};