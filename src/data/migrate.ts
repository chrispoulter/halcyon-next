import { query } from './db';

export const migrate = async () => {
    await query(`
CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE TABLE IF NOT EXISTS users (
    id INTEGER GENERATED BY DEFAULT AS IDENTITY,
    email_address TEXT NOT NULL,
    password TEXT NULL,
    password_reset_token UUID NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE NOT NULL,
    is_locked_out BOOLEAN NOT NULL DEFAULT FALSE,
    roles TEXT[] NULL,
    search TEXT GENERATED ALWAYS AS ("first_name" || ' ' || "last_name" || ' ' || "email_address") STORED,
    CONSTRAINT pk_users PRIMARY KEY (id)
);

CREATE UNIQUE INDEX IF NOT EXISTS ix_users_email_address ON users (email_address);

CREATE INDEX IF NOT EXISTS ix_users_search ON users USING gin(search gin_trgm_ops);
`);
};
