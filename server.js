import express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import path from 'path';
import fs from 'fs';
import App from './src/App';

const app = express();

app.use(express.static('./build', { index: false }))

app.get('/*', (req, res) => {
  const reactApp = renderToString(
    <StaticRouter>
      <App />
    </StaticRouter>
  );

  const templateFile = path.resolve('./build/index.html');
  fs.readFile(templateFile, 'utf8', (err, data) => {
    if (err) {
      return res.status('500').send(err);
    }

    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
});

app.listen(8080, () => console.log('Sir!'));