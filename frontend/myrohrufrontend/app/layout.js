import { UserProvider } from "./context/UserContext.js";
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>My Rohru</title>
        description="A community platform for Rohru, Himachal Pradesh"
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
