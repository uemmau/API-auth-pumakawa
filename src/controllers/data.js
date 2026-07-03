
export async function fetchData(req, res) {
    try {
        const reply = await fetch("https://jsonplaceholder.typicode.com/posts/1");

        if (!reply.ok) {
            return res.status(500).json({ text: 'Failed to fetch data' });
        }

        const data = await reply.json();

        return res.json(data);
    } catch (err) {
        return res.status(500).json({ text: 'Error in "fetchData":', error: err.message || err });
    }
}

