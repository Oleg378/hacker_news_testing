const { execSync } = require('child_process');

try {
    // Run all tests in the "tests" directory
    execSync('npx playwright test', { stdio: 'inherit' });
} catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
}




