# Booking Vita - Availability Checker

This project automatically checks for available booking dates at VIB Vacation Home and runs on a schedule using GitHub Actions.

## Features

- 🔍 Automated availability checking for VIB Vacation Home
- ⏰ Scheduled execution via GitHub Actions (daily at 9:00 AM UTC)
- 📊 TypeScript-based with proper error handling
- 🚀 Easy deployment and maintenance

## Setup

### Local Development

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Run the script:**

   ```bash
   # Development (with TypeScript)
   npm run dev

   # Production (compiled JavaScript)
   npm run build
   npm start
   ```

### GitHub Actions Setup

The workflow is already configured to run automatically. Here's what it does:

1. **Schedule:** Runs daily at 9:00 AM UTC
2. **Manual trigger:** You can also run it manually from the GitHub Actions tab
3. **Environment:** Uses Ubuntu latest with Node.js 18

### Workflow Configuration

The GitHub Actions workflow (`.github/workflows/check-availability.yml`) includes:

- ✅ Automatic dependency installation
- ✅ TypeScript compilation
- ✅ Script execution
- ✅ Error handling and logging

### Customization

#### Change the Schedule

Edit `.github/workflows/check-availability.yml` and modify the cron expression:

```yaml
schedule:
  - cron: "0 9 * * *" # Daily at 9:00 AM UTC
```

Common cron patterns:

- `'0 */6 * * *'` - Every 6 hours
- `'0 9 * * 1'` - Every Monday at 9:00 AM
- `'0 9 1 * *'` - First day of every month

#### Add Notifications

You can add Slack, Discord, or email notifications by uncommenting and configuring the notification step in the workflow file.

#### Modify the Check Logic

Edit `index.ts` to:

- Change the target dates
- Add more sophisticated filtering
- Send notifications when dates are found
- Store results in a database

## Project Structure

```
├── .github/workflows/
│   └── check-availability.yml    # GitHub Actions workflow
├── index.ts                      # Main script
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
└── README.md                     # This file
```

## Troubleshooting

### Common Issues

1. **Script fails to run locally:**

   - Make sure you have Node.js 18+ installed
   - Run `npm install` to install dependencies

2. **GitHub Actions not running:**

   - Check that the workflow file is in the correct location
   - Verify the cron syntax is correct
   - Check the Actions tab for error logs

3. **No available dates found:**
   - This might be normal if the property is fully booked
   - Check the console output for any error messages

### Monitoring

- Check the GitHub Actions tab to see run history
- View logs for each execution
- Set up notifications for failures

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `npm run dev`
5. Submit a pull request

## License

This project is for personal use. Please respect the terms of service of the booking website.
