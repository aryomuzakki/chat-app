export function checkEnvVars(vars: string[]) {
  const missingVars = vars.filter(key => !process.env[key]);

  if (missingVars.length > 0) {
    console.error(
      `❌ [ERROR]: Missing required environment variables:\n${missingVars.join('\n')}\nPlease add all required environment variables to your .env file`,
    );
    process.exit(1);
  }
}
