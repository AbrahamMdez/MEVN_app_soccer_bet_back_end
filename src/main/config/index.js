import app from './app.js';

import('../server/server.js');

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});

