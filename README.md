# TestTradingChart

TestTradingChart is a simple project designed to visualize trading data using interactive charts. It aims to help users analyze market trends and make informed trading decisions.

## Project Structure

```
TestTradingChart/
├── src/
│   ├── assets/           # font, icons, images
│   ├── components/       # Reusable UI components
│   ├── constants/        # App-wide constants (e.g., colors, styles)
│   ├── data/
│   ├── utils/            # contain util file
│   ├── screens/          # Screens for the app (e.g., Home, TradingDetail)
│   ├── type/             # define typing, class, interface
│   └── App.js
├── public/
│   └── index.html
├── tests/                # Unit and integration tests
├── android/              # Android-specific files
├── ios/                  # iOS-specific files
├── package.json          # Project dependencies and scripts
├── jest.config.js        # Jest configuration for testing
├── tsconfig.json         # TypeScript configuration
└── README.md             # Project documentation
└── .gitignore
```

## Features

- Interactive trading charts
- Data visualization
- Modular component structure

## Libraries Used

### Core Libraries

- **React**: `19.1.0` - Core library for building the UI.
- **React Native**: `0.80.1` - Framework for building native apps using React.
- **React Native WebView**: `13.15.0` - Show trading chart on web.

---

## Steps to Run the App

1. Clone the repository:

   ```bash
   git clone https://github.com/HarveyNgo/TradingChart
   cd TradingChart
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install pods for iOS (if running on macOS):

```bash
    cd ios
    pod install
    cd ..
```

4. start ios app

   ```bash
   npx react-native run-ios
   ```

5. start android app:

   ```bash
   npx react-native run-android
   ```

## License

MIT
