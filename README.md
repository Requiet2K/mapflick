# MapFlick - CS:GO Map Trading Platform

## Overview

MapFlick is a web platform designed for trading custom CS:GO maps, developed during my early days of learning React. The platform facilitates seamless communication between users and mappers, providing a space to discuss and create personalized CS:GO maps.

## Features

- **React Components:**
  I crafted the site using fundamental React elements, avoiding reliance on UI libraries. All CSS styles were meticulously developed from scratch.

- **Form Validation:**
  YUP was integrated for comprehensive form validation, ensuring a smooth and error-free experience for users interacting with various forms.

- **Email Communication:**
  Integrated the EmailJS API to streamline communication between users and sellers via email. This feature enables users to reach out to sellers directly through the platform.

- **Responsiveness:**
  The site supports full responsiveness, offering an optimal viewing and interaction experience across diverse devices and screen sizes.

## Usage

Using MapFlick is straightforward:

1. **Browse Mappers:**
   Explore a list of available CS:GO mappers and review their portfolios.

2. **Initiate Contact:**
   Easily initiate contact with a preferred mapper using the provided communication form.

3. **Email Communication:**
   Leverage the integrated EmailJS functionality to communicate efficiently with the selected mapper via email.

## How to Run Locally with Vite and React

To run MapFlick locally and explore its functionalities using Vite and React:

```bash
# Clone the repository
git clone https://github.com/Requiet2K/mapflick.git

# Change into the project directory
cd mapflick

# Install dependencies
npm install
npm i axios yup react-router-dom@6 emailjs-com

# Install Vite
npm install -g create-vite

# Install additional dependencies
npm install formik

# Run the Vite development server
npm run dev
