# GroupBio

> The missing toolbox for WhatsApp groups

Turn those 87 random phone numbers into an actual community. GroupBio adds profiles, maps, and wikis to any WhatsApp group in 60 seconds.

## 🚀 What is GroupBio?

GroupBio solves the "Which Sarah?" problem that plagues every WhatsApp group. While WhatsApp is perfect for messaging, it's terrible for knowing who's who. GroupBio adds the missing context - profiles, location maps, and shared documents - so your group actually feels like a community, not just random phone numbers.

### Key Features

- **👥 Individual Bios** - See who's in the group at a glance with names, photos, and key details
- **🗺️ Maps** - Optional location sharing for carpools, meetups, and finding nearby members
- **📚 Documents** - Shared wiki for group rules, schedules, links, and resources
- **🔐 Privacy First** - Members control exactly what they share with each group
- **⚡ 60 Second Setup** - Create group, share link, done
- **📱 No App Required** - Works on any device through web browser

## 💰 Pricing

- **Free**: Up to 10 members per group
- **Unlimited**: £10/year per group for unlimited members

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Language**: TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Database**: [Vercel KV](https://vercel.com/storage/kv) (Redis)
- **Deployment**: [Vercel](https://vercel.com)
- **Icons**: [Lucide React](https://lucide.dev)

## 🏃‍♂️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/eddowding/groupbio.git
cd groupbio
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin interface for group management
│   ├── auth/              # Authentication pages
│   ├── groups/            # Group-specific pages
│   │   └── [id]/          # Dynamic group pages
│   │       ├── map/       # Location map view
│   │       ├── wiki/      # Document wiki
│   │       └── sharing/   # Privacy settings
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (shadcn)
│   └── layout/           # Layout components (navbar, headers)
└── lib/                  # Utilities and data
    └── dummy-data.ts     # Demo data for development
```

## 🎯 Key Pages

- **Home** (`/`) - Landing page with features and pricing
- **Join Group** (`/join`) - Enter group codes to join existing groups
- **Auth** (`/auth`) - Authentication with magic links and social login
- **Group View** (`/groups/[id]`) - Main group interface with member profiles
- **Group Map** (`/groups/[id]/map`) - Location-based member map
- **Group Wiki** (`/groups/[id]/wiki`) - Shared documents and resources
- **Admin** (`/admin`) - Group creation and management

## 🔧 Environment Variables

```bash
# Required for production
KV_REST_API_URL=your_vercel_kv_url
KV_REST_API_TOKEN=your_vercel_kv_token

# Optional - for enhanced features
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🎨 Design System

GroupBio uses a cohesive design system with:

- **Colors**: Primary green theme with semantic color tokens
- **Typography**: Modern, readable font hierarchy
- **Components**: Consistent UI patterns across all pages
- **Responsive**: Mobile-first design that works on all devices

## 🚀 Deployment

GroupBio is designed to deploy seamlessly on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on every push to main

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

For questions or support, please open an issue on GitHub or contact us through the app.

---

**GroupBio** - The toolbox WhatsApp groups should have come with.
