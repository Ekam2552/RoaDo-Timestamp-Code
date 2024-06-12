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

function calculateMonthlyStats(logEvents: LogEvent[]): MonthlyStats[] {
  const monthlyStats: MonthlyStats[] = [];

  // Sort log events by timestamp
  logEvents.sort((a, b) => a.logged_in.getTime() - b.logged_in.getTime());

  // Initialize variables to track active users and logged-in users
  let activeUsersSet = new Set<string>();
  let loggedInUsersSet = new Set<string>();

  // Iterate through log events to calculate monthly stats
  logEvents.forEach((event) => {
    const monthKey = event.logged_in.toISOString().slice(0, 7); // Get YYYY-MM format

    // Check if the user is still logged in based on lastSeenAt
    if (
      event.logged_out === null ||
      event.logged_out.getTime() > event.lastSeenAt.getTime()
    ) {
      activeUsersSet.add(event.userId);
      loggedInUsersSet.add(event.userId);
    } else {
      loggedInUsersSet.add(event.userId);
    }

    // Check if it's a new month
    const existingMonthIndex = monthlyStats.findIndex(
      (item) => item.month === monthKey
    );
    if (existingMonthIndex === -1) {
      // Initialize monthly stats if it's a new month
      monthlyStats.push({
        month: monthKey,
        activeUsers: activeUsersSet.size,
        loggedInUsers: loggedInUsersSet.size,
      });
    } else {
      // Update monthly stats if month already exists
      monthlyStats[existingMonthIndex].activeUsers = activeUsersSet.size;
      monthlyStats[existingMonthIndex].loggedInUsers = loggedInUsersSet.size;
    }
  });

  return monthlyStats;
}

// Example usage
const logEvents: LogEvent[] = [
  {
    userId: "user1",
    logged_in: new Date("2023-01-01"),
    logged_out: new Date("2023-01-02"),
    lastSeenAt: new Date("2023-01-01"),
  },
  {
    userId: "user2",
    logged_in: new Date("2023-01-01"),
    logged_out: null,
    lastSeenAt: new Date("2023-01-03"),
  },
  {
    userId: "user3",
    logged_in: new Date("2023-02-01"),
    logged_out: new Date("2023-02-02"),
    lastSeenAt: new Date("2023-02-01"),
  },
  // Add more log events here
];

const monthlyStats = calculateMonthlyStats(logEvents);
console.log(monthlyStats);
