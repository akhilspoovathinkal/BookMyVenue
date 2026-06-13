module.exports = {
    // Lint and format NestJS API files inside their package
    'apps/api/**/*.{js,ts}': [
        'pnpm --filter api exec eslint --fix',
        'prettier --write'
    ],

    // Lint and format React Frontend files inside their package
    'apps/web/**/*.{js,jsx,ts,tsx}': [
        'pnpm --filter web exec eslint --fix',
        'prettier --write'
    ],

    // Format shared package files  
    'packages/shared/**/*.{js,ts}': [
        'prettier --write'
    ],

    // Format configuration and document files globally
    '**/*.{json,md,html,css}': [
        'prettier --write'
    ]
};
