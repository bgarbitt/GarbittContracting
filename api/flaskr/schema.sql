DROP TABLE IF EXISTS services;
DROP TABLE IF EXISTS images;
DROP TABLE IF EXISTS videos;
DROP TABLE IF EXISTS fleet;
DROP TABLE IF EXISTS fleet_images;

PRAGMA foreign_keys = ON;

CREATE TABLE services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    explanation TEXT
);

CREATE TABLE images (
    id INTEGER,
    url TEXT,
    PRIMARY KEY (id, url),
    CONSTRAINT fk_images 
        FOREIGN KEY (id) 
        REFERENCES services (id) 
        ON DELETE CASCADE
);

CREATE TABLE videos (
    id INTEGER,
    url TEXT,
    PRIMARY KEY (id, url),
    CONSTRAINT fk_videos
        FOREIGN KEY (id) 
        REFERENCES services (id)
        ON DELETE CASCADE
);

CREATE TABLE fleet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    machine TEXT NOT NULL
);

CREATE TABLE fleet_images (
    id INTEGER,
    url TEXT,
    size INTEGER,
    PRIMARY KEY (id, url, size),
    CONSTRAINT fk_fleet
        FOREIGN KEY (id) 
        REFERENCES fleet (id)
        ON DELETE CASCADE
);