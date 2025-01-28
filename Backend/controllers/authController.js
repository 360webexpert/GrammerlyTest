const User = require('../models/user');

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        res.json({ message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};
