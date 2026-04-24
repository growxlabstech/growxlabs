-- Exam Attempts Tracking
CREATE TABLE IF NOT EXISTS exam_attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL,
    score INTEGER NOT NULL,
    grade TEXT NOT NULL,
    attempt_number INTEGER NOT NULL,
    status TEXT NOT NULL, -- 'passed', 'failed'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE exam_attempts ENABLE ROW LEVEL SECURITY;

-- User Policy (Users can see their own attempts)
CREATE POLICY "Users view own attempts" ON exam_attempts 
FOR SELECT USING (auth.uid() = user_id);

-- Admin Policy (Full access)
CREATE POLICY "Admins manage all attempts" ON exam_attempts 
FOR ALL USING ((auth.jwt() ->> 'role') IN ('ADMIN', 'CO_ADMIN'));

-- Index for lookup
CREATE INDEX IF NOT EXISTS idx_exam_attempts_user_course ON exam_attempts(user_id, course_id);
