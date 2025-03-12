# ArmorX Mobile

ArmorX Mobile is a **security officer app** designed to help security personnel manage patrols, incidents, alerts, and other essential tasks. The app provides real-time situational awareness, communication tools, and access to critical resources, all optimized for mobile devices.

---

## Features

### 1. **Real-Time Map**
- Displays a live map with the officer's current location.
- Includes a **patrolling officer marker** to represent the officer's movement.
- Supports GPS tracking and dynamic updates.

### 2. **Incident Management**
- Officers can report incidents with details like location, type, and severity.
- View a log of all reported incidents.
- Receive real-time alerts for new incidents.

### 3. **Communication Tools**
- **Push-to-Talk**: Instant voice communication for quick coordination.
- **Panic Button**: Send an emergency distress signal with the officer's location.

### 4. **Access Control**
- Track and log access to restricted areas.
- View access logs with details like user, action, and timestamp.

### 5. **Surveillance Integration**
- View live camera feeds from security cameras.
- Control cameras remotely (pan, tilt, zoom).

### 6. **Reporting and Analytics**
- Generate daily activity reports.
- Analyze incident trends and response times.

### 7. **Profile Management**
- Officers can view and update their profiles.
- Includes personal information, contact details, and preferences.

### 8. **Settings**
- Customize app settings (e.g., notifications, themes).
- Manage user roles and permissions.

### 9. **Support**
- Access FAQs and support resources.
- Contact support for assistance.

---

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm (v8 or higher)
- React Native CLI (if running locally)

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/armorx-mobile.git
   cd armorx-mobile
   ```
2. Install dependencies:
   ```sh
   npm install  # or yarn install
   ```
3. Start the development server:
   ```sh
   npm run dev  # or yarn dev
   ```
4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

## Configuration
ArmorX uses environment variables for configuration. Create a `.env` file in the root directory and specify necessary credentials:
```env
REACT_APP_API_BASE_URL=https://api.yoursecurityplatform.com
REACT_APP_FIREBASE_CONFIG={"apiKey":"your-key","authDomain":"your-domain"}
```

## Usage
1. **Map View**
Displays the officer's current location and patrol route.

Use the Push-to-Talk and Panic Button for quick actions.

2. **Incidents**
Report new incidents with details and evidence.

View a log of all reported incidents.

3. **Alerts**
Receive real-time notifications for security alerts.

View details of each alert (e.g., type, location, time).

4. **Profile**
Update personal information and preferences.

View activity history and performance metrics.

5. **Settings**
Customize app settings (e.g., notifications, themes).

Manage user roles and permissions.

## Deployment
To deploy the application:
```sh
npm run build
```
Then deploy the `build/` folder to your preferred hosting service (e.g., Vercel, Netlify, AWS S3).

## Tech Stack
- **Frontend**: NEXT.js, TailwindCSS
- **Backend**: Node.js, Express.js (optional)
- **Database**: Firebase / MongoDB / PostgreSQL (Configurable)
- **Authentication**: Firebase Auth / JWT
- **Hosting**: Vercel / AWS / DigitalOcean

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository
2. Create a new branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Open a Pull Request

## License
This project is licensed under the MIT License. See `LICENSE` for details.

## Contact
For support or inquiries, contact:
- 📧 Email: mabunda.wealth@gmail.com
- 🌐 Website: [ArmorX Security](https://armorx.com)