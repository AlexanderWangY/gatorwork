# 🐊 GatorMarket

![GatorMarket Logo](./static/Logo.svg)

### The Marketplace for UF Students! 🏫🎒📦

Welcome to **GatorMarket** – a student marketplace built _by_ Gators, _for_ Gators! 🐊 Whether you're buying or selling textbooks, furniture, or even a scooter to cruise around campus, GatorMarket makes it easy and secure to trade with fellow UF students.

## 🚀 Features

- **UF Student-Only Access** 🎓 – Verified students only! No randoms from outside UF.
- **Modern UI** 🎨 – Built with **SvelteKit**, making it blazing fast and smooth. (WIP)
- **Secure Authentication** 🔐 – Session-based auth with enhanced security.
- **Easy Listings** 📸 – Post your items in just a few taps! (WIP)
- **Chat System** 💬 – Message buyers & sellers directly. (WIP)
- **Optimized for Mobile & Web** 📱💻 – Trade on the go! (WIP)

## 🛠️ Tech Stack

- **Framework**: [SvelteKit](https://kit.svelte.dev/) ⚡
- **Package Manager**: [pnpm](https://pnpm.io/) 🚀
- **Database**: PostgreSQL 🐘 + [Prisma](https://www.prisma.io/) ORM
- **Auth**: Secured with Better-Auth 🔐

## 📦 Setup & Installation

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/GatorMarket.git
   cd GatorMarket
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start a postgres server (I use docker locally and the docker compose works btw)
   Save DATABASE_URL and DIRECT_URL as seen in `example.env` (BOTH WILL BE THE SAME URL IF DOING LOCAL DOCKER POSTGRES), also generate a random secure token!

4. Migrate all changes using Prisma Migrate

   ```bash
   pnpm exec prisma migrate deploy
   ```

5. Start the development server:

   ```bash
   pnpm dev
   ```

6. Open your browser and go to [localhost:5173](http://localhost:5173) 🌍

## 🎭 Contributing

We’d love for you to contribute! Feel free to open issues, submit PRs, or suggest features.

## 📜 License

MIT License. See `LICENSE` for details.

---

🚀 **Join the GatorMarket Revolution – Buy, Sell, and Connect with UF Students Today!** 🐊
