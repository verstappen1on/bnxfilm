const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Habilita CORS
app.use(cors());

// Proxy para reembalar o conteúdo de xbox.com/play
app.use('/proxy', createProxyMiddleware({
    target: 'https://xbox.com/play', // URL do site original
    changeOrigin: true, // Ajusta o cabeçalho de origem
    onProxyRes(proxyRes) {
        // Remove restrições de carregamento em iFrames
        delete proxyRes.headers['x-frame-options'];
        delete proxyRes.headers['content-security-policy'];
    },
}));

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Proxy rodando em http://localhost:${PORT}`);
});
