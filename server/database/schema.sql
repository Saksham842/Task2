
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('Admin', 'Sales User') DEFAULT 'Sales User',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    status ENUM('New', 'Contacted', 'Qualified', 'Lost') DEFAULT 'New',
    source VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed data for testing
INSERT INTO leads (name, email, status, source) VALUES
('John Doe', 'john@example.com', 'New', 'Website'),
('Jane Smith', 'jane@example.com', 'Contacted', 'Referral'),
('Alice Brown', 'alice@example.com', 'Qualified', 'Cold Call'),
('Bob Wilson', 'bob@example.com', 'Lost', 'Website');
