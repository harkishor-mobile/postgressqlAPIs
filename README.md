## Commands

# Node version

22.14.0

# Install Dependencies

yarn install

# Run in Development (TypeScript)

yarn dev

# Run Production Build

yarn start

# Build for Production

yarn build

# Prisma – Generate Client

yarn prisma:generate

# Prisma – Run Migrations

yarn prisma:migrate

# Remove old build folder (optional)

rm -rf dist

# Deploy on Render – Build Command

yarn install && yarn prisma:generate && yarn build

# Deploy on Render – Start Command

yarn start

# Baseline the database or connect tables

- npx prisma migrate resolve --applied <migration-folder-name>
- Example -
  npx prisma migrate resolve --applied 20251121104920_init
