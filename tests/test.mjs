import postcss from 'postcss';

import px2unit from '../dist/index.es.js';

const instance = postcss([px2unit({ unit: 'vw', mediaQuery: true })]);

const css = `
@media screen and (min-width: 480px) {
    body {
        background-color: lightgreen;
        width: 10px;
    }
}

#main {
    border: 1px solid black;
}

ul li {
	padding: 5px;
}
`;

instance.process(css, { from: 'test.css' }).then((res) => {
  console.log(res.css);
});
