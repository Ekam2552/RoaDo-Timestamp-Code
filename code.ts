interface LogEvent {
  userId: string;
  logged_in: Date;
  logged_out: Date | null; // null if user is still logged in
  lastSeenAt: Date;
}

interface MonthlyStats {
  month: string;
  activeUsers: number;
  loggedInUsers: number;
}
