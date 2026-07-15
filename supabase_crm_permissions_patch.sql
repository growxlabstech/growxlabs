-- Add allowed_paths column to team_members to store custom path permissions
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS allowed_paths TEXT[] DEFAULT '{}';
