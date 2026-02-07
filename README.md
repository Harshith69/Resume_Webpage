# Harshith Narasimhamurthy - Data Scientist Portfolio

A modern, responsive portfolio website showcasing my work as a Data Scientist specializing in geospatial intelligence, machine learning, and cloud-native analytics.


## 🌟 Features

- **Modern Design**: Dark theme with cyan accents and data-driven aesthetic
- **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- **Interactive Animations**: Smooth scroll effects, typing animation, and parallax backgrounds
- **Performance Optimized**: Fast loading with clean, semantic HTML
- **SEO Ready**: Meta tags and Open Graph support
- **Accessible**: ARIA labels and proper heading hierarchy

## 🚀 Live Demo

Visit the live site: `https://[your-username].github.io/Resume_Webpage/`

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styling
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with CSS Grid, Flexbox, animations
- **JavaScript (Vanilla)**: No frameworks, pure JS for best performance
- **Google Fonts**: Space Mono & Work Sans
- **Font Awesome**: Icon library

## 📦 Installation & Setup

### Method 1: Direct Download

1. Download all files (index.html, styles.css, script.js)
2. Place them in a folder
3. Open `index.html` in your browser

### Method 2: GitHub Pages Deployment

#### Step 1: Create GitHub Repository

1. **Go to GitHub** and log in to your account
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Repository Settings**:
   - Repository name: `portfolio` or `your-name-portfolio`
   - Description: "Personal portfolio website showcasing my data science projects"
   - Make it **Public** (required for free GitHub Pages)
   - ✅ Check "Add a README file" (optional, we'll replace it)
   - Click **"Create repository"**

#### Step 2: Upload Files to Repository

**Option A: Using GitHub Web Interface (Easiest)**

1. In your repository, click **"Add file"** → **"Upload files"**
2. Drag and drop these files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `README.md` (this file)
3. Add commit message: "Initial portfolio upload"
4. Click **"Commit changes"**

**Option B: Using Git Command Line**

```bash
# Clone your repository
git clone https://github.com/[your-username]/[repository-name].git

# Navigate to the folder
cd [repository-name]

# Copy all files to this folder
# (index.html, styles.css, script.js, README.md)

# Add all files
git add .

# Commit changes
git commit -m "Initial portfolio upload"

# Push to GitHub
git push origin main
```

#### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab (⚙️ icon)
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**:
   - Branch: Select `main` (or `master`)
   - Folder: Select `/ (root)`
5. Click **"Save"**
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://[your-username].github.io/[repository-name]/`

## ✏️ Customization Guide

### 1. Update Personal Information

**In `index.html`**, replace placeholder content:

```html
<!-- Update navigation logo -->
<div class="nav-logo">
    <a href="#home">YOUR_INITIALS<span class="accent-dot">.</span></a>
</div>

<!-- Update hero section -->
<h1 class="hero-name">
    <span class="name-part">Your First Name</span>
    <span class="name-part">Your Last Name</span>
</h1>

<!-- Update contact information -->
<a href="mailto:your.email@example.com">your.email@example.com</a>
<a href="tel:+1234567890">+1 234 567 890</a>

<!-- Update social links -->
<a href="https://linkedin.com/in/your-profile">LinkedIn</a>
<a href="https://github.com/your-username">GitHub</a>
```

### 2. Add Your Photo

Replace the placeholder in the About section:

```html
<!-- Find this in index.html -->
<div class="image-placeholder">
    <i class="fas fa-user-tie"></i>
    <p>Your Photo Here</p>
</div>

<!-- Replace with -->
<img src="your-photo.jpg" alt="Your Name" style="width: 100%; height: 100%; object-fit: cover; border-radius: var(--radius-lg);">
```

Then add your photo to the repository.

### 3. Customize Projects

Update project cards with your actual projects:

```html
<div class="project-card" data-aos="fade-up">
    <!-- Update project image/icon -->
    <!-- Update project title -->
    <!-- Update project description -->
    <!-- Update metrics -->
    <!-- Update highlights -->
</div>
```

### 4. Modify Color Scheme

**In `styles.css`**, update CSS variables:

```css
:root {
    --color-accent: #00d9ff;  /* Change to your preferred color */
    --color-bg-primary: #0a0e17;
    /* ... other colors */
}
```

Popular color schemes:
- **Purple**: `#8B5CF6`
- **Green**: `#10B981`
- **Orange**: `#F97316`
- **Pink**: `#EC4899`

### 5. Setup Contact Form (Email Integration)

The form currently shows an alert. To actually send emails:

**Option 1: EmailJS (Recommended - Free)**

1. Go to [EmailJS](https://www.emailjs.com/)
2. Create account and get Service ID, Template ID, User ID
3. Add EmailJS script to `index.html`:

```html
<!-- Add before closing </body> tag -->
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
    (function(){
        emailjs.init("YOUR_USER_ID");
    })();
</script>
```

4. Update form handler in `script.js`:

```javascript
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', contactForm)
        .then(() => {
            alert('Message sent successfully!');
            contactForm.reset();
        }, (error) => {
            alert('Failed to send message. Please try again.');
        });
});
```

**Option 2: Formspree (Alternative - Free)**

1. Go to [Formspree](https://formspree.io/)
2. Create account and get form endpoint
3. Update form in `index.html`:

```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- Keep existing form fields -->
</form>
```

## 🎨 Adding Custom Domain (Optional)

If you own a domain (e.g., `www.yourname.com`):

1. In your repository, create a file named `CNAME` (no extension)
2. Add your domain name:
```
www.yourname.com
```
3. In your domain registrar (Namecheap, GoDaddy, etc.):
   - Add a CNAME record pointing to `[your-username].github.io`
4. Wait for DNS propagation (can take up to 24 hours)

## 📱 Testing Responsiveness

Test your site on different devices:

1. **Desktop**: Open in Chrome, Firefox, Safari
2. **Mobile**: 
   - Use Chrome DevTools (F12 → Device Toolbar)
   - Test on actual mobile devices
3. **Tablet**: Test on iPad or Android tablet

## 🔧 Troubleshooting

### Site Not Loading After Deployment

- Wait 2-3 minutes after enabling GitHub Pages
- Check that files are in the root directory (not in a subfolder)
- Verify branch is set to `main` in GitHub Pages settings
- Check browser console (F12) for errors

### Images Not Showing

- Ensure image paths are correct (case-sensitive)
- Use relative paths: `./image.jpg` not `/image.jpg`
- Check file extensions match (JPG vs jpg)

### Animations Not Working

- Clear browser cache (Ctrl + Shift + R)
- Check JavaScript console for errors (F12)
- Ensure script.js is loaded

## 📈 Analytics (Optional)

Add Google Analytics to track visitors:

1. Create Google Analytics account
2. Get tracking ID
3. Add to `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## 🚀 Performance Optimization

The site is already optimized, but you can further improve:

1. **Compress Images**: Use TinyPNG or ImageOptim
2. **Lazy Loading**: Add `loading="lazy"` to images
3. **Minify CSS/JS**: Use online minifiers before deployment
4. **Enable Caching**: GitHub Pages handles this automatically

## 📄 License

This portfolio template is open source. Feel free to use it for your own portfolio!

## 🤝 Contributing

Found a bug or want to improve the template?

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Contact

**Harshith Narasimhamurthy**
- Email: harshithnchandan@gmail.com
- LinkedIn: [linkedin.com/in/harshith-narasimhamurthy-497578155](https://www.linkedin.com/in/harshith-narasimhamurthy-497578155/)
- GitHub: [github.com/Harshith69](https://github.com/Harshith69)

---

⭐ **Star this repository** if you found it helpful!

Built with ❤️ by Harshith Narasimhamurthy
