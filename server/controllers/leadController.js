const db = require('../config/db');

exports.getLeads = async (req, res) => {
    try {
        let { page = 1, limit = 10, search = '', status = '', source = '', sort = 'latest' } = req.query;
        const offset = (page - 1) * limit;

        let query = 'SELECT * FROM leads WHERE 1=1';
        let params = [];

        if (search) {
            query += ' AND (name LIKE ? OR email LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (status) {
            query += ' AND status = ?';
            params.push(status);
        }

        if (source) {
            query += ' AND source = ?';
            params.push(source);
        }

        const [countResult] = await db.query(query.replace('SELECT *', 'SELECT COUNT(*) as total'), params);
        const total = countResult[0].total;

        let sortQuery = ' ORDER BY created_at DESC';
        if (sort === 'oldest') {
            sortQuery = ' ORDER BY created_at ASC';
        }
        query += sortQuery + ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [leads] = await db.query(query, params);

        res.json({
            leads,
            total,
            pages: Math.ceil(total / limit),
            currentPage: parseInt(page)
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getLeadById = async (req, res) => {
    try {
        const { id } = req.params;
        const [leads] = await db.query('SELECT * FROM leads WHERE id = ?', [id]);
        if (leads.length === 0) return res.status(404).json({ message: 'Lead not found' });
        res.json(leads[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createLead = async (req, res) => {
    try {
        const { name, email, status, source } = req.body;
        await db.query('INSERT INTO leads (name, email, status, source) VALUES (?, ?, ?, ?)', [name, email, status, source]);
        res.status(201).json({ message: 'Lead created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateLead = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, status, source } = req.body;
        await db.query('UPDATE leads SET name = ?, email = ?, status = ?, source = ? WHERE id = ?', [name, email, status, source, id]);
        res.json({ message: 'Lead updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteLead = async (req, res) => {
    try {
        if (req.user.role !== 'Admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }
        const { id } = req.params;
        await db.query('DELETE FROM leads WHERE id = ?', [id]);
        res.json({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
