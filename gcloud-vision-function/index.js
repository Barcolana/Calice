const fetch = require('node-fetch');

exports.vision = async (req, res) => {
    try {
        const imageDataUrl = req.body.image || '';
        const image = imageDataUrl.replace(/^data:.*;base64,/, '');

        const body = {
            requests: [{
                image: { content: image },
                features: [{ type: 'TEXT_DETECTION', maxResults: 1 }]
            }]
        };

        const r = await fetch(
            `https://vision.googleapis.com/v1/images:annotate?key=${process.env.GOOGLE_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            }
        );

        const data = await r.json();
        res.status(200).json(data);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
};
