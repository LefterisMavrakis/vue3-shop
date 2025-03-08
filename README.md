# E-commerce Application Documentation

## Overview

This e-commerce application has been developed using **Vue 3** and **TypeScript**. The app simulates an online store where users can search for products, add them to a shopping basket, and perform other operations like filtering, sorting, and pagination. The focus is on building a clean, functional, and intuitive interface with performance optimization and user-friendly features.

---

## Sections

### 1. **Project Setup**

- **Dependencies**:

  - **Vue 3**: Core framework.
  - **Vue Router**: To synchronize filters with query params.
  - **TypeScript**: For static typing and enhanced development experience.
  - **JSON Server**: Mock server to simulate API data.
  - **Pinia**: State management for handling the shopping cart, products and filters.
  - **Vitest**: Unit testing framework for testing components and logic.
  - **CSS and SCSS**: For styling components.

- **Installation Instructions**:
  1. Clone the repository:
     ```bash
     git clone https://github.com/LefterisMavrakis/vue3-shop.git
     cd <project_directory>
     ```
  2. Install dependencies:
     ```bash
     npm install
     ```
  3. Run the project:
     ```bash
     npm run dev
     ```
  4. Run the mock server in a different console tab:
     ```bash
     npx json-server src/api/db/db.json
     ```
  5. Run unit tests:
     ```bash
     npx vitest
     ```

---

### 2. **Application Features**

#### 2.1 **Pagination with Infinite Loading**

- Implemented using **Vue's `IntersectionObserver`** to detect when the user has scrolled to the bottom of the page. When this happens, new products are fetched from the mock server and appended to the list.

#### 2.2 **Search and Filters**

- Users can search for products by name or category (clothing and electronics).
- The **search functionality** is implemented client-side with a debounce to minimize performance hits.
- Filter synchronization with the **URL** ensures that filters are persistent, allowing users to share filtered results via a URL.

#### 2.3 **Shopping Cart (Minicart)**

- The minicart allows users to view products added to the shopping basket.
- Users can:
  - Remove products from the cart.
  - Adjust quantities of products.
  - View the total price of items in the cart.

#### 2.4 **Checkout Page**

- As per minicart component, the checkout page allows users to view products added to the shopping basket.
- Users can:
  - Remove products from the cart.
  - Adjust quantities of products.
  - View the total price of items in the cart.

#### 2.5 **UI and Responsiveness**

- Focused on building a simple and responsive UI.
- The application layout adjusts based on the device's screen size, providing a smooth experience on both mobile and desktop devices.

#### 2.6 **Sorting Options**

- Products can be sorted by **price** or **name** using a dropdown.

#### 2.7 **Custom Shared Components**

- Developed shared components like **TextField** and **SelectField** to maintain consistency across the app.
- These components can be reused throughout the project, reducing duplication and enhancing maintainability.
- While they can benefit from future updates, they are currently in a good state for the project's specific needs.

---

### 3. **Bonus Features**

#### 3.1 **Pagination with Infinite Loading**

- The app fetches products incrementally as the user scrolls.

#### 3.2 **URL with Filter Synchronization**

- Filters (search query, sort and page) are synchronized in the URL using Vue Router's query parameters. This enables users to share URLs with the exact filters applied and ensures filters persist on page reloads.

#### 3.3 **Intuitive UI and Responsiveness**

- The app adapts to both mobile and desktop screens. The layout is designed to be clean and user-friendly, making it easy to navigate through products, search, and interact with the cart.

#### 3.4 **Custom Shared Components**

- Instead of relying on third-party libraries, custom **TextField** and **SelectField** components were created. These components are tailored to the specific needs of the project and ensure flexibility for future changes and improvements.

#### 3.5 **Sorted Options Filtering**

- Users can sort products by **price** or **name**, allowing for a more refined shopping experience. The sorting options are easily accessible and provide dynamic updates to the product list.

#### 3.6 **Search Functionality with Client-Side Filtering**

- Users can search products either by **name** or **category** (clothing or electronics). The search operates on the client side, ensuring a fast and seamless experience.

---

### 4. **Testing**

- **Unit Tests**:
  - **Vitest** was used to ensure components and stores work correctly.

---

### 5. **Challenges and Solutions**

- **Challenge 1**: Implementing infinite loading with efficient data fetching.

  - **Solution**: Utilized the `IntersectionObserver` API to detect when the user reaches the bottom of the list, ensuring that new data is loaded only when necessary. Product list virtualization would also be a must in the case of a large dataset.

- **Challenge 2**: Synchronizing filters in the URL to allow sharing.

  - **Solution**: Used Vue Router's query parameters to encode filter states (like sort options, page and search term), making sure the app maintains the filter state even when the page is reloaded.

---

### 6. **Conclusion**

This application demonstrates proficiency in **TypeScript**, **Vue 3**, and modern front-end development practices. The implementation focuses on core e-commerce functionalities, with additional features such as pagination, sorting, search and cart management.

---
